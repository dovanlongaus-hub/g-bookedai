import { describe, it, expect } from 'vitest';
import { chatMessageSchema } from './chat.schema.js';

describe('Chat Schema', () => {
  it('accepts valid message', () => {
    const input = { message: 'Hello, I want to book a session' };
    const result = chatMessageSchema.parse(input);
    expect(result.message).toBe(input.message);
    expect(result.language).toBe('en'); // default
  });

  it('accepts message with language', () => {
    const input = { message: 'Xin chào', language: 'vi' as const };
    expect(chatMessageSchema.parse(input)).toEqual(input);
  });

  it('rejects empty message', () => {
    expect(() => chatMessageSchema.parse({ message: '' })).toThrow();
  });

  it('rejects message over 2000 chars', () => {
    expect(() => chatMessageSchema.parse({ message: 'a'.repeat(2001) })).toThrow();
  });

  it('rejects invalid language', () => {
    expect(() => chatMessageSchema.parse({ message: 'hello', language: 'fr' })).toThrow();
  });
});
