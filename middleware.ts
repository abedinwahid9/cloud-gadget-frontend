import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookiesStore = await cookies();

  const accessToken = await request.cookies.get("access_token")?.value;
  const role = await request.cookies.get("user_role")?.value;

  console.log("cookies-----", accessToken);
  console.log("cookies-----*------", cookiesStore.get("access_token"));

  // Route groups
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

  /**Prevent logged user entering login/signup */
  if (publicRoutes.includes(path) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /** 🔐 Private protected routes */
  if (privateRoutes.some((route) => path.startsWith(route))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  /** 🔐 Admin-only routes */
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
  cookies: ["access_token", "user_role"],
};
