import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

function isPrivateRoute(pathname: string) {
  return (
    pathname === "/" ||
    pathname.startsWith("/diplomas") ||
    pathname.startsWith("/account")
  );
}

function isAuthRoute(pathname: string) {
  return (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password")
  );
}

export default async function proxy(request: NextRequest) {
  const jwt = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  // 🔒 Private routes
  if (isPrivateRoute(pathname)) {
    if (jwt) return NextResponse.next();

    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(redirectUrl);
  }

  // 🚫 Auth routes (login/register)
  if (isAuthRoute(pathname)) {
    if (!jwt) return NextResponse.next();

    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico, sitemap.xml, robots.txt (metadata files)
 */
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
}