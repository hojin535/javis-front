import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken');
  const {pathname} = request.nextUrl;

  // Allow access to '/' and '/signup' paths without checking refreshToken
  if (pathname === '/' || pathname === '/signup') {
    return NextResponse.next();
  }
  const protectedPaths = ['/main', '/info', '/statement', '/recruits-page'];
  // If refreshToken does not exist, redirect to the login page
  if (protectedPaths.includes(pathname) && !refreshToken) {
    // You might want to change '/login' to your actual login page path
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If refreshToken exists, continue to the requested page
  return NextResponse.next();
}

// Configure the paths where the middleware should run
export const config = {
  matcher: ['/main', '/info', '/statement', '/recruits-page/:path*']
};