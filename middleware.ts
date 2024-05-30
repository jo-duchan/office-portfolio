import { type NextRequest, NextResponse } from "next/server";
import PATH from "@/constants/path";
import { SESSION_COOKIE_NAME } from "@/constants/cookies";

function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  // user session 체크
  if (!session) {
    // 미인증 시 login page로
    const absoluteURL = new URL(PATH.AUTH, request.nextUrl.origin);

    return NextResponse.redirect(absoluteURL.toString());
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
};

export default middleware;
