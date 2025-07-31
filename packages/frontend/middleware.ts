import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET || "defaultsecret",
    });
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*"] };