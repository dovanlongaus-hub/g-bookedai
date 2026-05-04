import admin from 'firebase-admin';

let _app: admin.app.App | null = null;

function getApp(): admin.app.App {
  if (!_app) {
    _app = admin.initializeApp({
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });
  }
  return _app;
}

export const firebaseAuth = {
  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    const auth = getApp().auth();
    return auth.verifyIdToken(idToken);
  },

  async getUser(uid: string): Promise<admin.auth.UserRecord> {
    const auth = getApp().auth();
    return auth.getUser(uid);
  },

  async createCustomToken(uid: string, claims?: Record<string, unknown>): Promise<string> {
    const auth = getApp().auth();
    return auth.createCustomToken(uid, claims);
  },

  async setCustomClaims(uid: string, claims: { role: string; tenantId: string }) {
    const auth = getApp().auth();
    await auth.setCustomUserClaims(uid, claims);
  },

  async revokeRefreshTokens(uid: string) {
    const auth = getApp().auth();
    await auth.revokeRefreshTokens(uid);
  },
};
