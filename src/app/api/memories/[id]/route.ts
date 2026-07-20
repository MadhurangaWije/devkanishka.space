import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/ai/supabase';
import { deletePhotoFromDrive, uploadPhotoToDrive } from '@/lib/drive';
import { OWNER_COOKIE_NAME, verifyOwnerSessionToken } from '@/lib/owner-auth';
import { MemoryMetaInput, MemoryRow, normalizeArea, normalizeVisibility, toClientShape, validatePhotoFiles } from '@/lib/memories';

export const runtime = 'nodejs';

function isOwnerRequest(request: NextRequest): boolean {
  return verifyOwnerSessionToken(request.cookies.get(OWNER_COOKIE_NAME)?.value);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isOwnerRequest(request)) {
    return NextResponse.json({ error: 'Sign in as the owner to edit memories.' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { data: existingPhotos, error: existingError } = await supabase
    .from('memory_photos')
    .select('id, position, drive_file_id')
    .eq('memory_id', id);
  if (existingError) {
    console.error('Memories edit: could not load existing photos', existingError);
    return NextResponse.json({ error: 'Could not load this memory.' }, { status: 500 });
  }
  if (!existingPhotos) {
    return NextResponse.json({ error: 'Memory not found.' }, { status: 404 });
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

  // Only IDs that actually belong to this memory's photos can be removed —
  // never trust a client-supplied id blindly.
  let removeIds: string[] = [];
  try {
    const requested = JSON.parse((formData.get('removePhotoIds') as string | null) ?? '[]');
    if (Array.isArray(requested)) {
      const existingIds = new Set(existingPhotos.map((p) => p.id));
      removeIds = requested.filter((rid): rid is string => typeof rid === 'string' && existingIds.has(rid));
    }
  } catch {
    return NextResponse.json({ error: 'Invalid "removePhotoIds" field.' }, { status: 400 });
  }

  const newPhotos = formData.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0);
  const validationError = validatePhotoFiles(newPhotos);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // Upload before any DB mutation, same reasoning as create: a failed
  // upload should never leave the memory in a half-edited state.
  const uploaded: { id: string; mimeType: string }[] = [];
  try {
    for (const photo of newPhotos) {
      const buffer = Buffer.from(await photo.arrayBuffer());
      const { id: fileId } = await uploadPhotoToDrive(buffer, photo.name, photo.type);
      uploaded.push({ id: fileId, mimeType: photo.type });
    }
  } catch (err) {
    console.error('Memories edit: Drive upload failed', err);
    return NextResponse.json({ error: 'Could not upload photos to Drive.' }, { status: 502 });
  }

  const { error: updateError } = await supabase
    .from('memories')
    .update({
      title,
      story: meta.story?.trim() || '',
      area: normalizeArea(meta.area),
      visibility: normalizeVisibility(meta.visibility),
      memory_date: meta.date || null,
      location: meta.location?.trim() || null,
      mood: meta.mood?.trim() || null,
      people: Array.isArray(meta.people) ? meta.people : [],
      added_by: meta.addedBy?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
  if (updateError) {
    console.error('Memories edit: update failed', updateError);
    return NextResponse.json({ error: 'Could not save changes.' }, { status: 500 });
  }

  if (removeIds.length) {
    // Delete the DB rows first — that's what the app actually shows, so it
    // must always reflect the removal. Drive cleanup is best-effort after.
    const { error: deleteError } = await supabase.from('memory_photos').delete().in('id', removeIds);
    if (deleteError) {
      console.error('Memories edit: photo row deletion failed', deleteError);
    } else {
      const toDelete = existingPhotos.filter((p) => removeIds.includes(p.id));
      await Promise.all(
        toDelete.map((p) =>
          deletePhotoFromDrive(p.drive_file_id).catch((err) =>
            console.error('Memories edit: Drive cleanup failed for', p.drive_file_id, err)
          )
        )
      );
    }
  }

  if (uploaded.length) {
    const remaining = existingPhotos.filter((p) => !removeIds.includes(p.id));
    const nextPosition = remaining.reduce((max, p) => Math.max(max, p.position), -1) + 1;
    const { error: insertError } = await supabase.from('memory_photos').insert(
      uploaded.map((u, index) => ({
        memory_id: id,
        drive_file_id: u.id,
        mime_type: u.mimeType,
        position: nextPosition + index,
      }))
    );
    if (insertError) {
      console.error('Memories edit: new photo rows insert failed', insertError);
      return NextResponse.json({ error: 'New photos uploaded but could not be linked to the memory.' }, { status: 500 });
    }
  }

  const { data: updated, error: refetchError } = await supabase
    .from('memories')
    .select('*, memory_photos(id, position, mime_type)')
    .eq('id', id)
    .single();
  if (refetchError || !updated) {
    console.error('Memories edit: refetch after save failed', refetchError);
    return NextResponse.json({ error: 'Saved, but could not reload the memory.' }, { status: 500 });
  }

  return NextResponse.json({ memory: toClientShape(updated as MemoryRow) });
}
