import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET!;

const getKey = () => new TextEncoder().encode(secret);

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = pathname.startsWith("/dashboard");
  const isAdminProtected = pathname.startsWith("/admin/dashboard");

  if ((isAdminProtected || isProtected) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAdminProtected) {
    try {
      const { payload } = await jwtVerify(token, getKey());

      if (payload?.role !== "admin") {
        return NextResponse.redirect(new URL("/not-authorized", req.url));
      }
    } catch{
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
};
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/dashboard/:path*",
    "/editCompany/:path*",
    "/addJob/:path*",
  ],
};
