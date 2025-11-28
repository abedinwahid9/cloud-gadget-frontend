import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookie = request.cookies.get("access_token")?.value;
  const user = request.cookies.get("user_role")?.value;

  // Route categories
  const publicRoutes = ["/login", "/signup"];
  const privateRoutes = [
    "/my-account",
    "/profile",
    "/wishlist",
    "/orders",
    "/cart/checkout",
    "/checkout",
  ];
  const adminRoutes = ["/admin"];

  // PUBLIC → Logged users cannot visit login/register
  if (publicRoutes.includes(path) && cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // PRIVATE → Block if no token
  if (privateRoutes.some((r) => path.startsWith(r))) {
    if (!cookie) {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }
  // admin protect route
  // Admin-only route check
  if (adminRoutes.some((r) => path.startsWith(r))) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!user || user !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/profile/:path*",
    "/my-account/:path*",
    "/wishlist/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/cart/checkout/:path*",
    "/admin/:path*",
  ],
};
