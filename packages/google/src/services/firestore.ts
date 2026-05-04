import { Firestore, FieldValue } from '@google-cloud/firestore';

let _firestore: Firestore | null = null;

function getFirestore(): Firestore {
  if (!_firestore) {
    _firestore = new Firestore({
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
      databaseId: process.env.FIRESTORE_DATABASE || '(default)',
    });
  }
  return _firestore;
}

export const firestoreService = {
  // Chat sessions
  async saveChatMessage(sessionId: string, role: 'user' | 'assistant', content: string) {
    const db = getFirestore();
    await db.collection('chat_sessions').doc(sessionId).collection('messages').add({
      role,
      content,
      createdAt: FieldValue.serverTimestamp(),
    });
  },

  async getChatHistory(sessionId: string, limit = 20) {
    const db = getFirestore();
    const snap = await db.collection('chat_sessions').doc(sessionId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse();
  },

  // Booking hold state
  async setBookingHold(bookingId: string, expiresAt: Date) {
    const db = getFirestore();
    await db.collection('booking_holds').doc(bookingId).set({
      status: 'HELD',
      expiresAt,
      createdAt: FieldValue.serverTimestamp(),
    });
  },

  async removeBookingHold(bookingId: string) {
    const db = getFirestore();
    await db.collection('booking_holds').doc(bookingId).delete();
  },

  async getExpiredHolds(): Promise<string[]> {
    const db = getFirestore();
    const snap = await db.collection('booking_holds')
      .where('expiresAt', '<=', new Date())
      .get();
    return snap.docs.map((doc) => doc.id);
  },

  // Agent run state
  async setAgentRunState(runId: string, state: Record<string, unknown>) {
    const db = getFirestore();
    await db.collection('agent_runs').doc(runId).set({
      ...state,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  },

  // Dashboard cache
  async cacheDashboardData(userId: string, data: Record<string, unknown>, ttlMinutes = 5) {
    const db = getFirestore();
    await db.collection('dashboard_cache').doc(userId).set({
      data,
      expiresAt: new Date(Date.now() + ttlMinutes * 60 * 1000),
      updatedAt: FieldValue.serverTimestamp(),
    });
  },

  async getDashboardCache(userId: string) {
    const db = getFirestore();
    const doc = await db.collection('dashboard_cache').doc(userId).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    if (data.expiresAt.toDate() < new Date()) return null;
    return data.data;
  },

  // Real-time notification storage for in-app notifications
  async addNotification(userId: string, notification: { type: string; title: string; body: string; link?: string }) {
    const db = getFirestore();
    await db.collection('users').doc(userId).collection('notifications').add({
      ...notification,
      read: false,
      createdAt: FieldValue.serverTimestamp(),
    });
  },

  async markNotificationRead(userId: string, notificationId: string) {
    const db = getFirestore();
    await db.collection('users').doc(userId).collection('notifications').doc(notificationId).update({
      read: true,
    });
  },
};
