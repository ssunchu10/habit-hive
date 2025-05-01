// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware triggered:", request.nextUrl.pathname);

  const token = request.cookies.get("authToken")?.value;
  console.log(token);
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};