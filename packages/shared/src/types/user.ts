export type UserRole = 'customer' | 'mentor' | 'admin' | 'superadmin';

export interface User {
  id: string;
  tenantId: string;
  email: string;
  googleSub?: string;
  role: UserRole;
  createdAt: Date;
}

export interface Tenant {
  id: string;
  domain: string;
  name: string;
  createdAt: Date;
}
