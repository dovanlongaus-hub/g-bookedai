const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.g.bookedai.au';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function fetchMyBookings() {
  const res = await fetch(`${API}/booking/my`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch bookings: ${res.status}`);
  return res.json();
}

export async function fetchMyNotifications(limit = 50) {
  const res = await fetch(`${API}/notifications?limit=${limit}`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch notifications: ${res.status}`);
  return res.json();
}

export async function fetchUnreadCount() {
  const res = await fetch(`${API}/notifications/unread-count`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch unread count: ${res.status}`);
  return res.json();
}

export async function fetchLearningHistory() {
  const res = await fetch(`${API}/learning/history`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch learning history: ${res.status}`);
  return res.json();
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
