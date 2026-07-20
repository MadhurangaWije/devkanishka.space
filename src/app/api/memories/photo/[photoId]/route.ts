import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';
import { getSupabaseAdmin } from '@/lib/ai/supabase';
import { streamPhotoFromDrive } from '@/lib/drive';
import { OWNER_COOKIE_NAME, verifyOwnerSessionToken } from '@/lib/owner-auth';

export const runtime = 'nodejs';

type PhotoRow = {
  drive_file_id: string;
  mime_type: string;
  memories: { visibility: string } | { visibility: string }[];
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ photoId: string }> }) {
  const { photoId } = await params;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('memory_photos')
    .select('drive_file_id, mime_type, memories(visibility)')
    .eq('id', photoId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  const photo = data as PhotoRow;
  const memory = Array.isArray(photo.memories) ? photo.memories[0] : photo.memories;

  // Same 404 whether the photo doesn't exist or is private and the
  // requester isn't the owner — never reveal that a private photo exists.
  if (memory?.visibility === 'private') {
    const isOwner = verifyOwnerSessionToken(request.cookies.get(OWNER_COOKIE_NAME)?.value);
    if (!isOwner) {
      return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    }
  }

  let stream: Readable;
  try {
    stream = await streamPhotoFromDrive(photo.drive_file_id);
  } catch (err) {
    console.error('Memories photo proxy: Drive fetch failed', err);
    return NextResponse.json({ error: 'Could not load photo.' }, { status: 502 });
  }

  return new NextResponse(Readable.toWeb(stream) as unknown as ReadableStream, {
    headers: {
      'Content-Type': photo.mime_type,
      'Cache-Control': memory?.visibility === 'private' ? 'private, max-age=3600' : 'public, max-age=86400',
    },
  });
}
