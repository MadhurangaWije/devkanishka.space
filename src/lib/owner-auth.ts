import { createHmac, timingSafeEqual } from 'crypto';

export const OWNER_COOKIE_NAME = 'memories_owner_session';

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
export const OWNER_COOKIE_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;

function getSecret(): string {
  const secret = process.env.OWNER_SESSION_SECRET;
  if (!secret) throw new Error('OWNER_SESSION_SECRET is not configured');
  return secret;
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

/**
 * Checks a submitted password against OWNER_PASSWORD. Both sides are hashed
 * first so timingSafeEqual always compares equal-length buffers regardless
 * of what the candidate string's length is.
 */
export function checkOwnerPassword(candidate: string): boolean {
  const expected = process.env.OWNER_PASSWORD;
  if (!expected) throw new Error('OWNER_PASSWORD is not configured');

  const a = createHmac('sha256', getSecret()).update(candidate).digest();
  const b = createHmac('sha256', getSecret()).update(expected).digest();
  return timingSafeEqual(a, b);
}

/**
 * A signed, expiring cookie value — not a JWT, just enough to avoid a DB
 * round-trip on every request for a single shared "owner" role.
 */
export function createOwnerSessionToken(): string {
  const payload = String(Date.now() + SESSION_TTL_MS);
  return `${payload}.${sign(payload)}`;
}

export function verifyOwnerSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expectedSig = Buffer.from(sign(payload));
  const actualSig = Buffer.from(signature);
  if (expectedSig.length !== actualSig.length || !timingSafeEqual(expectedSig, actualSig)) {
    return false;
  }

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}
