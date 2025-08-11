// This middleware sets a strong Content Security Policy (CSP) header for all responses
// and provides admin route protection
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  
  // Create Supabase client for server-side authentication
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  );

  // Check if this is an admin route
  if (request.nextUrl.pathname.startsWith('/Admin')) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        // Redirect to login with return URL
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
        loginUrl.searchParams.set('error', 'unauthorized');
        return NextResponse.redirect(loginUrl);
      }

      // Check if user has admin role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('uid', user.id)
        .single();

      if (profileError || !profile || profile.role !== 'admin') {
        // Redirect non-admin users to dashboard
        const dashboardUrl = new URL('/dashboard', request.url);
        dashboardUrl.searchParams.set('error', 'access_denied');
        return NextResponse.redirect(dashboardUrl);
      }
    } catch (error) {
      console.error('Admin middleware error:', error);
      // Redirect to login on any error
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('error', 'auth_error');
      return NextResponse.redirect(loginUrl);
    }
  }

  // Set CSP headers (relaxed to support Next.js/webpack runtime and external services)
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self';",
      "base-uri 'self';",
      "form-action 'self';",
      "frame-ancestors 'self';",
      "object-src 'none';",
      // Allow webpack/Next runtime, workers and dev websockets + external scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://connect.facebook.net;",
      "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net;",
      "style-src 'self' 'unsafe-inline';",
      "img-src 'self' data: https: blob:;",
      "font-src 'self' https: data:;",
      "connect-src 'self' https: wss: ws:;",
      "worker-src 'self' blob:;",
      "frame-src 'self' https://www.google.com https://www.facebook.com;",
    ].join(' ')
  );

  return response;
}

export const config = {
  matcher: [
    // Exclude Next static assets and common binary assets from middleware to avoid breaking chunk loading
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
