import { NextResponse } from "next/server";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory cache for sliding-window rate tracking
const rateLimitCache = new Map<string, RateLimitRecord>();

// Clean expired records every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, record] of rateLimitCache.entries()) {
        if (now > record.resetAt) {
          rateLimitCache.delete(key);
        }
      }
    },
    5 * 60 * 1000
  );
}

export interface RateLimitOptions {
  key: string;
  limit: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfter: number;
}

/**
 * High-performance sliding-window in-memory rate limiter.
 * Protects critical endpoints from DDoS and token draining attacks.
 */
export function rateLimit({ key, limit, windowSeconds }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const existing = rateLimitCache.get(key);

  if (!existing || now > existing.resetAt) {
    const resetAt = now + windowMs;
    rateLimitCache.set(key, { count: 1, resetAt });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetAt,
      retryAfter: 0,
    };
  }

  if (existing.count < limit) {
    existing.count += 1;
    return {
      success: true,
      limit,
      remaining: limit - existing.count,
      resetAt: existing.resetAt,
      retryAfter: 0,
    };
  }

  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  return {
    success: false,
    limit,
    remaining: 0,
    resetAt: existing.resetAt,
    retryAfter,
  };
}

/**
 * Standard RFC headers for rate-limited endpoints
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };

  if (!result.success) {
    headers["Retry-After"] = String(result.retryAfter);
  }

  return headers;
}

/**
 * Returns a standard HTTP 429 Too Many Requests response with RFC headers
 */
export function rateLimitExceededResponse(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    {
      error: {
        code: "rate_limit_exceeded",
        message: `Too many requests. Please wait ${result.retryAfter} seconds before trying again.`,
      },
    },
    {
      status: 429,
      headers: getRateLimitHeaders(result),
    }
  );
}

/**
 * Extract client IP from incoming Next.js Request
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}
