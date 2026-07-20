export const AREAS = ['family', 'personal', 'work'] as const;
export const VISIBILITIES = ['public', 'private'] as const;
export const MAX_PHOTOS = 20;

// Routes here run with `export const runtime = 'nodejs'`, which on Vercel
// means requests go through the Node.js Serverless Function body-size limit
// (4.5MB, not configurable on Hobby/Pro). Kept comfortably under that,
// leaving headroom for multipart boundaries + the JSON metadata field. A
// single modern phone photo can already be close to this on its own, and
// any real video clip will exceed it — if that turns out to be too tight in
// practice, the fix is a direct-to-Drive upload from the browser (bypassing
// this limit entirely), not raising this constant.
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

export type MemoryRow = {
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
  memory_photos: { id: string; position: number; mime_type: string }[];
};

export type MemoryMetaInput = {
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

export function toClientShape(row: MemoryRow) {
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
      .map((p) => ({ id: p.id, url: `/api/memories/photo/${p.id}`, mimeType: p.mime_type })),
  };
}

export function normalizeArea(value: string | undefined): (typeof AREAS)[number] {
  return AREAS.includes(value as (typeof AREAS)[number]) ? (value as (typeof AREAS)[number]) : 'family';
}

export function normalizeVisibility(value: string | undefined): (typeof VISIBILITIES)[number] {
  return VISIBILITIES.includes(value as (typeof VISIBILITIES)[number])
    ? (value as (typeof VISIBILITIES)[number])
    : 'public';
}

/** Returns a user-facing error message, or null if the files are fine. */
export function validatePhotoFiles(photos: File[]): string | null {
  if (photos.length > MAX_PHOTOS) return `You can add up to ${MAX_PHOTOS} photos per memory.`;
  const bad = photos.find((f) => !f.type.startsWith('image/') && !f.type.startsWith('video/'));
  if (bad) return `"${bad.name}" isn't a supported photo or video type.`;
  const totalBytes = photos.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return `Keep the total under ${Math.floor(MAX_TOTAL_BYTES / (1024 * 1024))}MB — try fewer or smaller files.`;
  }
  return null;
}
