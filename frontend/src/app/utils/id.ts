/**
 * Generates a predictable unique id for client-side entities.
 */
export const createId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  const now = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 10);
  return `id-${now}-${rand}`;
};
