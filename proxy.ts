import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt, { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let userRole: string | null = null;
  let isTokenExpired = false;

  if (accessToken) {
    try {
      const decoded = jwt.decode(accessToken) as JwtPayload;
      userRole = decoded?.role || null;

      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        isTokenExpired = true;
      }
    } catch {
      isTokenExpired = true;
    }
  } else {
    isTokenExpired = true;
  }

  let response = NextResponse.next();


  if (isTokenExpired && refreshToken) {
    try {
      const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      });

      const result = await res.json();

      if (result.success && result.data?.accessToken) {
        accessToken = result.data.accessToken;

        const decodedNew = jwt.decode(accessToken as string) as JwtPayload;
        userRole = decodedNew?.role || null;
        isTokenExpired = false;

        response.cookies.set("accessToken", accessToken!, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          sameSite: "lax",
          path: "/",
        });

        if (result.data?.refreshToken) {
          response.cookies.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
            path: "/",
          });
        }
      }
    } catch (error) {
      isTokenExpired = true;
    }
  }


  const isAuthenticated = !!accessToken && !isTokenExpired;

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  if (isAuthenticated && isAuthRoute) {
    if (userRole === 'ADMIN') return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    if (userRole === 'LANDLORD') return NextResponse.redirect(new URL('/dashboard/landlord', request.url));
    return NextResponse.redirect(new URL('/dashboard/tenant', request.url));
  }

  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/rentals') ||
    pathname.startsWith('/payments');

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname); 
    
    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.cookies.delete('accessToken');
    redirectResponse.cookies.delete('refreshToken');
    return redirectResponse;
  }

  if (pathname.startsWith('/dashboard/tenant') && userRole !== 'TENANT') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (pathname.startsWith('/dashboard/landlord') && userRole !== 'LANDLORD') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (pathname.startsWith('/dashboard/admin') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};