// This middleware sets a strong Content Security Policy (CSP) header for all responses
// and provides admin route protection
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_EXACT_ROUTES = new Set([
  "/",
  "/Shop",
  "/About",
  "/Contact",
  "/login",
  "/Signup",
  "/privacy",
  "/terms",
  "/return",
  "/faq",
  "/shipping",
  "/size-guide",
]);

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_EXACT_ROUTES.has(pathname)) return true;

  return (
    pathname.startsWith("/Shop/") ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/auth/")
  );
}

function isUserProtectedRoute(pathname: string): boolean {
  return pathname === "/checkout" || pathname.startsWith("/dashboard/");
}

function withRedirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/login", request.url);
  const redirectTarget = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  loginUrl.searchParams.set("redirectTo", redirectTarget);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const needsAdminAuth = pathname.startsWith("/Admin/");
  const needsUserAuth = isUserProtectedRoute(pathname);
  const isPublic = isPublicRoute(pathname);

  if (!isPublic && (needsAdminAuth || needsUserAuth)) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return withRedirectToLogin(request);
    }

    if (needsAdminAuth) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("uid", user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        return withRedirectToLogin(request);
      }
    }
  }

  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self';",
      "base-uri 'self';",
      "form-action 'self';",
      "frame-ancestors 'self';",
      "object-src 'none';",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://connect.facebook.net;",
      "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net;",
      "style-src 'self' 'unsafe-inline';",
      "img-src 'self' data: https: blob:;",
      "font-src 'self' https: data:;",
      "connect-src 'self' https: wss: ws:;",
      "worker-src 'self' blob:;",
      "frame-src 'self' https://www.google.com https://www.facebook.com;",
    ].join(" ")
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
