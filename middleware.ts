import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middleware/withAuth";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [ "/profile", "/login", "/register"]);
