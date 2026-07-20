import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/ai/supabase';
import { uploadPhotoToDrive } from '@/lib/drive';
import { OWNER_COOKIE_NAME, verifyOwnerSessionToken } from '@/lib/owner-auth';

export const runtime = 'nodejs';

const AREAS = ['family', 'personal', 'work'] as const;
const VISIBILITIES = ['public', 'private'] as const;
const MAX_PHOTOS = 20;
const MAX_TOTAL_BYTES = 50 * 1024 * 1024;

type MemoryRow = {
  id: string;
  title: string;
  story: string;
  area: string;
  visibility: string;
  memory_date: string | null;
  location: string | null;
  mood: string | null;
  people: string[];
  added_by: string | null;
  created_at: string;
  memory_photos: { id: string; position: number }[];
};

function isOwnerRequest(request: NextRequest): boolean {
  return verifyOwnerSessionToken(request.cookies.get(OWNER_COOKIE_NAME)?.value);
}

function toClientShape(row: MemoryRow) {
  return {
    id: row.id,
    title: row.title,
    story: row.story,
    area: row.area,
    visibility: row.visibility,
    date: row.memory_date,
    location: row.location,
    mood: row.mood,
    people: row.people,
    addedBy: row.added_by,
    createdAt: row.created_at,
    photos: [...row.memory_photos]
      .sort((a, b) => a.position - b.position)
      .map((p) => ({ id: p.id, url: `/api/memories/photo/${p.id}` })),
  };
}

export async function GET(request: NextRequest) {
  const owner = isOwnerRequest(request);
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('memories')
    .select('*, memory_photos(id, position)')
    .order('memory_date', { ascending: false });

  if (!owner) {
    query = query.eq('visibility', 'public');
  }

  const { data, error } = await query;
  if (error) {
    console.error('Memories list: query failed', error);
    return NextResponse.json({ error: 'Could not load memories.' }, { status: 500 });
  }

  return NextResponse.json({ memories: (data as MemoryRow[]).map(toClientShape), isOwner: owner });
}

export async function POST(request: NextRequest) {
  if (!isOwnerRequest(request)) {
    return NextResponse.json({ error: 'Sign in as the owner to add memories.' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  let meta: {
    title?: string;
    story?: string;
    area?: string;
    visibility?: string;
    date?: string;
    location?: string;
    mood?: string;
    people?: string[];
    addedBy?: string;
  };
  try {
    meta = JSON.parse((formData.get('memory') as string | null) ?? '');
  } catch {
    return NextResponse.json({ error: 'Missing or invalid "memory" field.' }, { status: 400 });
  }

  const title = meta.title?.trim() || '';
  if (!title) {
    return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
  }

  const area = AREAS.includes(meta.area as (typeof AREAS)[number]) ? meta.area! : 'family';
  const visibility = VISIBILITIES.includes(meta.visibility as (typeof VISIBILITIES)[number])
    ? meta.visibility!
    : 'public';

  const photos = formData.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0);

  if (photos.length > MAX_PHOTOS) {
    return NextResponse.json({ error: `You can add up to ${MAX_PHOTOS} photos per memory.` }, { status: 400 });
  }
  const nonImage = photos.find((f) => !f.type.startsWith('image/'));
  if (nonImage) {
    return NextResponse.json({ error: `"${nonImage.name}" isn't an image.` }, { status: 400 });
  }
  const totalBytes = photos.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json({ error: 'Photos are too large — keep the total under 50MB.' }, { status: 400 });
  }

  // Upload to Drive before touching the DB, so a failed upload never leaves
  // a memory row with no photos (or vice versa).
  const uploaded: { id: string; mimeType: string }[] = [];
  try {
    for (const photo of photos) {
      const buffer = Buffer.from(await photo.arrayBuffer());
      const { id } = await uploadPhotoToDrive(buffer, photo.name, photo.type);
      uploaded.push({ id, mimeType: photo.type });
    }
  } catch (err) {
    console.error('Memories create: Drive upload failed', err);
    return NextResponse.json({ error: 'Could not upload photos to Drive.' }, { status: 502 });
  }

  const supabase = getSupabaseAdmin();
  const { data: memory, error: insertError } = await supabase
    .from('memories')
    .insert({
      title,
      story: meta.story?.trim() || '',
      area,
      visibility,
      memory_date: meta.date || null,
      location: meta.location?.trim() || null,
      mood: meta.mood?.trim() || null,
      people: Array.isArray(meta.people) ? meta.people : [],
      added_by: meta.addedBy?.trim() || null,
    })
    .select()
    .single();

  if (insertError || !memory) {
    console.error('Memories create: insert failed', insertError);
    return NextResponse.json({ error: 'Could not save the memory.' }, { status: 500 });
  }

  let photoRows: { id: string; position: number }[] = [];
  if (uploaded.length) {
    const { data: insertedPhotos, error: photosError } = await supabase
      .from('memory_photos')
      .insert(
        uploaded.map((u, index) => ({
          memory_id: memory.id,
          drive_file_id: u.id,
          mime_type: u.mimeType,
          position: index,
        }))
      )
      .select('id, position');
    if (photosError || !insertedPhotos) {
      console.error('Memories create: photo rows insert failed', photosError);
      return NextResponse.json({ error: 'Photos uploaded but could not be linked to the memory.' }, { status: 500 });
    }
    photoRows = insertedPhotos;
  }

  return NextResponse.json({
    memory: toClientShape({ ...memory, memory_photos: photoRows } as MemoryRow),
  });
}
