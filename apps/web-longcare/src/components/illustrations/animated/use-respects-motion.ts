'use client';
import { useReducedMotion } from 'motion/react';

/**
 * Returns `staticValue` when the user prefers reduced motion,
 * otherwise returns `animatedValue`. Convenience wrapper around
 * `useReducedMotion()` that keeps animated/static branches symmetric.
 */
export function useRespectsMotion<T>(animatedValue: T, staticValue: T): T {
  const reduced = useReducedMotion();
  return reduced ? staticValue : animatedValue;
}

/**
 * Helper exposing the raw boolean too, for cases where callers want
 * to switch on the preference without picking a value.
 */
export function usePrefersReducedMotion(): boolean {
  return Boolean(useReducedMotion());
}
