import { z } from 'zod';

export const searchServicesSchema = z.object({
  query: z.string().min(1).max(500),
  tenantId: z.string().uuid().optional(),
  language: z.enum(['en', 'vi', 'zh']).default('en'),
});

export type SearchServicesInput = z.infer<typeof searchServicesSchema>;
