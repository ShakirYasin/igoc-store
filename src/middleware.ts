import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale } from "@/constants/locales";
import { i18n } from "i18n-config";




export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname,search } = request.nextUrl;

  if (
    pathname.startsWith(`/${defaultLocale}/`) ||
    pathname === `/${defaultLocale}`
  ) {
    return NextResponse.redirect(
      new URL(
       `${ pathname.replace(
          `/${defaultLocale}`,
          pathname === `/${defaultLocale}` ? "/" : ""
        )}${search}`,
        request.url
      )
    );
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    
    // Now for EITHER /en or /nl (for example) we're going to tell Next.js that the request is for /en/whatever
    // or /nl/whatever, and then reWRITE the request to that it is handled properly.
    return NextResponse.rewrite(
      new URL(
        `/${defaultLocale}${pathname}${search}`,
        request.nextUrl.href
      )
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next/static and its subdirectories), and other specific files/directories
    "/((?!api|_next/static|favicon.ico|robots.txt|public|images).*)",
  ],
};