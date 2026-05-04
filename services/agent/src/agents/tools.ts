/**
 * Tools that the AI agent can invoke to perform actions.
 */

export interface ToolResult {
  success: boolean;
  data: any;
  message: string;
}

const API_URL = process.env.API_URL || 'http://localhost:8090';

export const tools = {
  async searchServices(query?: string): Promise<ToolResult> {
    try {
      const res = await fetch(`${API_URL}/services`);
      const data = await res.json();
      const services = data.data || [];

      if (query) {
        const filtered = services.filter((s: any) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.description?.toLowerCase().includes(query.toLowerCase())
        );
        return { success: true, data: filtered, message: `Found ${filtered.length} matching services` };
      }

      return { success: true, data: services, message: `${services.length} services available` };
    } catch {
      return { success: false, data: null, message: 'Could not fetch services' };
    }
  },

  async getServiceDetails(serviceId: string): Promise<ToolResult> {
    try {
      const res = await fetch(`${API_URL}/services`);
      const data = await res.json();
      const service = (data.data || []).find((s: any) => s.id === serviceId);
      return service
        ? { success: true, data: service, message: service.name }
        : { success: false, data: null, message: 'Service not found' };
    } catch {
      return { success: false, data: null, message: 'Could not fetch service' };
    }
  },

  async checkHealth(): Promise<ToolResult> {
    try {
      const res = await fetch(`${API_URL}/health`);
      const data = await res.json();
      return { success: true, data, message: `System: ${data.status}` };
    } catch {
      return { success: false, data: null, message: 'System unavailable' };
    }
  },

  formatServicesForChat(services: any[]): string {
    return services.map((s: any) =>
      `• ${s.name} — $${(s.price_cents / 100).toFixed(0)} AUD\n  ${s.description || ''}`
    ).join('\n\n');
  },

  generateBookingLink(service?: string): string {
    const base = 'https://book.longcare.au';
    return service ? `${base}?service=${service}` : base;
  },

  generateWhatsAppLink(message: string): string {
    return `https://wa.me/61455301335?text=${encodeURIComponent(message)}`;
  },

  generateMeetLink(ref: string): string {
    return `https://meet.longcare.au/${ref}`;
  },
};
