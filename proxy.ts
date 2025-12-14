import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const accessToken = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("user_role")?.value;

  console.log("ALL COOKIES:", request.cookies.getAll());

  const publicRoutes = ["/login", "/signup"];
  const privateRoutes = [
    "/my-account",
    "/profile",
    "/wishlist",
    "/orders",
    "/checkout",
    "/cart/checkout",
  ];
  const adminRoutes = ["/admin"];

  // 🚫 Logged-in user can’t access login/signup
  if (publicRoutes.includes(path) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔐 Private routes
  if (privateRoutes.some((route) => path.startsWith(route))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 👑 Admin routes
  if (adminRoutes.some((route) => path.startsWith(route))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/my-account/:path*",
    "/profile/:path*",
    "/wishlist/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/cart/checkout/:path*",
    "/admin/:path*",
  ],
};
