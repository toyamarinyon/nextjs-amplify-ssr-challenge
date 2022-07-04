import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withSSRContext } from "aws-amplify";

export async function middleware(request: NextRequest) {
  /**
   * It failed because `withSSRContext` is not available in the edge.
   * I hope this will be available in the future.
   */
  const { Auth } = withSSRContext({ req: request });
  try {
    await Auth.currentAuthenticatedUser();
    return NextResponse.next();
  } catch (_) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: "/auth-only/:path*",
};
