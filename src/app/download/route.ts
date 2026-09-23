import { NextResponse } from "next/server";
import { GOOGLE_PLAY_URL } from "@/lib/site";

export function GET() {
  return NextResponse.redirect(GOOGLE_PLAY_URL, 301);
}
