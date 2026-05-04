import { google, Auth } from 'googleapis';

let _auth: Auth.GoogleAuth | null = null;
let _impersonatedAuth: Auth.GoogleAuth | null = null;

/**
 * Standard Google Auth (service account direct)
 */
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

/**
 * Impersonated Google Auth — acts as a specific user via Domain-Wide Delegation.
 * Files created will be owned by the impersonated user (in their Drive quota).
 * Requires: Domain-Wide Delegation enabled for the service account in Google Admin.
 */
export function getImpersonatedAuth(userEmail?: string, scopes?: string[]): Auth.GoogleAuth {
  const email = userEmail || process.env.CEO_EMAIL || 'ceo@longcare.au';

  // Cache only if same email
  if (_impersonatedAuth) return _impersonatedAuth;

  _impersonatedAuth = new google.auth.GoogleAuth({
    scopes: scopes || [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/calendar',
    ],
    clientOptions: {
      subject: email,
    },
  });

  return _impersonatedAuth;
}
