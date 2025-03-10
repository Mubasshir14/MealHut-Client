import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

// const roleBasedPrivateRoutes = {
//   customer: [
//     /^\/customer/,
//     // /^\/customer\/dashboard/,
//     // /^\/customer\/dashboard\/.*$/,
//   ],
//   mealProvider: [
//     /^\/mealProvider/,
//     // /^\/mealProvider\/dashboard/,
//     // /^\/mealProvider\/dashboard\/food\/.*$/,
//   ],
// };

const roleBasedPrivateRoutes = {
  customer: [/^\/customer(\/|$)/, /^\/profile/],
  mealProvider: [/^\/mealProvider(\/|$)/, /^\/profile/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `https://meal-hut-client-imvx.vercel.app/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/customer",
    "/mealProvider",
    "/customer/:path*",
    "/mealProvider/:path*",
    "/profile",
    // "/customer/dashboard",
    // "/mealProvider/dashboard",
    // "/customer/dashboard/:page*",
    // "/mealProvider/dashboard/:page*",
  ],
};
