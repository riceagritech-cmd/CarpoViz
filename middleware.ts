import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  if (pathname.startsWith('/driver')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    try {
      const { payload } = await jwtVerify(token, secret)
      if (payload.userType !== 'driver') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
    matcher: ['/driver/:path*', '/dashboard'],
};
