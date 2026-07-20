import { google } from 'googleapis';
import type { drive_v3 } from 'googleapis';
import { Readable } from 'stream';

let cached: drive_v3.Drive | null = null;

/**
 * Server-only Google Drive client, authenticated as the owner's Google
 * account via a long-lived OAuth refresh token (see scripts/google-drive-auth.ts
 * for how to mint one). Files uploaded through this client are never made
 * public or link-shared — only this OAuth identity can read them, which is
 * what makes the /api/memories/photo proxy a genuine privacy boundary.
 * Never import this from a client component.
 */
function getDriveClient(): drive_v3.Drive {
  if (cached) return cached;

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  const missing = [
    !clientId && 'GOOGLE_OAUTH_CLIENT_ID',
    !clientSecret && 'GOOGLE_OAUTH_CLIENT_SECRET',
    !refreshToken && 'GOOGLE_OAUTH_REFRESH_TOKEN',
  ].filter(Boolean);
  if (missing.length) {
    throw new Error(`${missing.join(', ')} not configured (empty or missing at runtime)`);
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);
  auth.setCredentials({ refresh_token: refreshToken });

  cached = google.drive({ version: 'v3', auth });
  return cached;
}

function getFolderId(): string {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId) throw new Error('GOOGLE_DRIVE_FOLDER_ID is not configured');
  return folderId;
}

export async function uploadPhotoToDrive(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<{ id: string }> {
  const drive = getDriveClient();
  const res = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [getFolderId()],
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: 'id',
  });

  if (!res.data.id) throw new Error('Drive upload succeeded but returned no file id');
  return { id: res.data.id };
}

/** Streams a photo's raw bytes straight from Drive as a Node Readable. */
export async function streamPhotoFromDrive(fileId: string): Promise<Readable> {
  const drive = getDriveClient();
  const res = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
  return res.data as unknown as Readable;
}

/** Permanently deletes a photo from Drive — used when a photo is removed from a memory during editing. */
export async function deletePhotoFromDrive(fileId: string): Promise<void> {
  const drive = getDriveClient();
  await drive.files.delete({ fileId });
}
