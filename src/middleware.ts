import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./lib/service/getUserMeLoader";

// Define an array of protected routes
const protectedRoutes = [
  "/dashboard",
  // Add more protected routes here
];

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();

  const currentPath = request.nextUrl.pathname;

  if (isProtectedRoute(currentPath) && user.ok === false) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  return NextResponse.next();
}

