import { Amplify } from "@aws-amplify/core";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withSSRContext } from "./lib/amplify/withSSRContext";
import awsconfig from "./src/aws-exports";

export async function middleware(request: NextRequest) {
  /**
   * It failed because `withSSRContext` is not available in the edge.
   * I hope this will be available in the future.
   */

  const cookies: string[] = [];
  request.cookies.forEach((cookie) => {
    cookies.push(`${cookie.replace(/ Path=\//g, "")}`);
  });
  const req = {
    headers: {
      cookie  : cookies.join(" "),
    },
  };
  Amplify.configure({ ...awsconfig, ssr: true });
  const { Auth } = withSSRContext({ req });
  try {
    await Auth.currentAuthenticatedUser();
    return NextResponse.next();
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: "/auth-only/:path*",
};
