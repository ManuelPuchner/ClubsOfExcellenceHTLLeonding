import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if(req.nextUrl.pathname.startsWith("/images")) {
    return NextResponse.rewrite("/api" + req.nextUrl.pathname);
  } else {
    return NextResponse.next();
  }
}
