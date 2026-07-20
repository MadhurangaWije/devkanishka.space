import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/ai/supabase';
import { uploadPhotoToDrive } from '@/lib/drive';
import { OWNER_COOKIE_NAME, verifyOwnerSessionToken } from '@/lib/owner-auth';
import {
  MemoryMetaInput,
  MemoryRow,
  normalizeArea,
  normalizeVisibility,
  toClientShape,
  validatePhotoFiles,
} from '@/lib/memories';

export const runtime = 'nodejs';

function isOwnerRequest(request: NextRequest): boolean {
  return verifyOwnerSessionToken(request.cookies.get(OWNER_COOKIE_NAME)?.value);
}

export async function GET(request: NextRequest) {
  const owner = isOwnerRequest(request);
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('memories')
    .select('*, memory_photos(id, position, mime_type)')
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

  let meta: MemoryMetaInput;
  try {
    meta = JSON.parse((formData.get('memory') as string | null) ?? '');
  } catch {
    return NextResponse.json({ error: 'Missing or invalid "memory" field.' }, { status: 400 });
  }

  const title = meta.title?.trim() || '';
  if (!title) {
    return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
  }

  const area = normalizeArea(meta.area);
  const visibility = normalizeVisibility(meta.visibility);

  const photos = formData.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0);
  const validationError = validatePhotoFiles(photos);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
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

  let photoRows: { id: string; position: number; mime_type: string }[] = [];
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
      .select('id, position, mime_type');
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
