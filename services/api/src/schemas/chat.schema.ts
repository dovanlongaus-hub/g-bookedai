import { z } from 'zod';

export const chatMessageSchema = z.object({
  message: z.string().min(1).max(2000),
  sessionId: z.string().uuid().optional(),
  language: z.enum(['en', 'vi', 'zh']).default('en'),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
