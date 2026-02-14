// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['ko', 'en']
const DEFAULT_LOCALE = 'ko'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl // 1. search(쿼리 스트링)를 가져옵니다.

  // 이미 locale 경로가 있는 경우
  const pathnameHasLocale = LOCALES.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // static files, api routes 등은 건너뛰기
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // root path면 /ko로 리다이렉트 (쿼리가 있을 수 있으니 search 추가)
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${search}`, request.url))
  }

  // 2. 다른 경로들 리다이렉트 시 ${search}를 반드시 붙여줍니다.
  return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}${search}`, request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
