export interface Service {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  priceCents: number;
  currency: string;
  active: boolean;
}
