// This middleware sets a strong Content Security Policy (CSP) header for all responses
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self';",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
      "style-src 'self' 'unsafe-inline';",
      "img-src 'self' data: https:;",
      "font-src 'self' https: data:;",
      "connect-src 'self' https:;",
      "object-src 'none';",
      "frame-ancestors 'self';",
      "base-uri 'self';"
    ].join(' ')
  );
  return response;
}

export const config = {
  matcher: '/:path*',
};
