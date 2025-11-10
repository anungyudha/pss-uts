import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const userData = request.cookies.get('user_data')?.value;

  // Jika tidak ada token, redirect ke login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Parse user data untuk cek role
  if (userData) {
    try {
      const user = JSON.parse(userData);
      
      // Jika bukan admin, redirect ke homepage
      if (user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // Jika gagal parse, redirect ke login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    // Jika tidak ada user data, redirect ke login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Specify which routes to protect
export const config = {
  matcher: '/admin/:path*',
};