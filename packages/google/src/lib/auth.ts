import { google, Auth } from 'googleapis';

let _auth: Auth.GoogleAuth | null = null;

export function getGoogleAuth(scopes?: string[]): Auth.GoogleAuth {
  if (!_auth) {
    _auth = new google.auth.GoogleAuth({
      scopes: scopes || [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });
  }
  return _auth;
}
