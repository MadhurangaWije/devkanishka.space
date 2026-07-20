// One-time setup: mints a Google Drive OAuth refresh token for the memories
// app and creates the Drive folder photos will be uploaded into. Run once
// via `npm run drive-auth`, then copy the printed values into .env.
//
// Requires GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET already in
// .env — create an OAuth client (type "Desktop app") at Google Cloud Console
// → APIs & Services → Credentials, with the Drive API enabled on the project.
import http from 'http';
import { URL } from 'url';
import { google } from 'googleapis';

const PORT = 53682;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/oauth2callback`;
// drive.file (not the full "drive" scope) — this grant can only ever touch
// files/folders this app itself creates, never the rest of the Drive.
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const FOLDER_NAME = process.argv[2] || 'Memories app photos';

async function main() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error(
      'Set GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET in .env first ' +
        '(Google Cloud Console → APIs & Services → Credentials → Create OAuth client ID → Desktop app).'
    );
    process.exit(1);
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);

  const state = Math.random().toString(36).slice(2);
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // force a refresh_token even if this account already granted access before
    scope: SCOPES,
    state,
  });

  console.log('\nOpen this URL in a browser and sign in with the Google account that should own the memory photos:\n');
  console.log(authUrl);
  console.log(`\nWaiting for you to approve access on http://127.0.0.1:${PORT} ...\n`);

  const code = await new Promise<string>((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url || '', `http://127.0.0.1:${PORT}`);
      if (url.pathname !== '/oauth2callback') {
        res.writeHead(404);
        res.end();
        return;
      }

      const returnedState = url.searchParams.get('state');
      const returnedCode = url.searchParams.get('code');
      const err = url.searchParams.get('error');

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<p>You can close this tab and go back to the terminal.</p>');
      server.close();

      if (err) return reject(new Error(`Google returned an error: ${err}`));
      if (returnedState !== state) return reject(new Error('State mismatch — possible CSRF, aborting.'));
      if (!returnedCode) return reject(new Error('No authorization code returned.'));
      resolve(returnedCode);
    });
    server.listen(PORT);
  });

  const { tokens } = await oauth2Client.getToken(code);
  if (!tokens.refresh_token) {
    console.error(
      "\nNo refresh_token came back. If you've run this script before with the same Google " +
        'account, revoke the existing grant at https://myaccount.google.com/permissions and try again.'
    );
    process.exit(1);
  }
  oauth2Client.setCredentials(tokens);

  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  const folder = await drive.files.create({
    requestBody: { name: FOLDER_NAME, mimeType: 'application/vnd.google-apps.folder' },
    fields: 'id, name, webViewLink',
  });

  console.log('\nDone! Add these to your .env:\n');
  console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}`);
  console.log(`GOOGLE_DRIVE_FOLDER_ID=${folder.data.id}`);
  console.log(`\nCreated Drive folder "${folder.data.name}": ${folder.data.webViewLink}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
