// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['ko', 'en']
const DEFAULT_LOCALE = 'ko'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 이미 locale 경로가 있는 경우 (예: /ko/..., /en/...)
  const pathnameHasLocale = LOCALES.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // static files, api routes 등은 건너뛰기
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // root path면 /ko로 리다이렉트
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url))
  }

  // 다른 경로들은 /ko를 앞에 붙여서 리다이렉트
  return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url))
}

export const config = {
  matcher: [
    // 다음 경로들을 제외한 모든 경로에 middleware 적용
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
