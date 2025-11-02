import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // ✅ rutas públicas
  const publicPaths = ["/login", "/register"];
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  // 🚫 sin token y no está en login/register → redirige a /login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🟢 con token y está en login/register → redirige al dashboard
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ todo bien → continuar
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
