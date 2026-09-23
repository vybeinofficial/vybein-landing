import { NextResponse } from "next/server";

const PRESS_NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Not Found</title>
</head>
<body>
  <h1>Not Found</h1>
  <p>This page is not available.</p>
</body>
</html>`;

export function GET() {
  return new NextResponse(PRESS_NOT_FOUND_HTML, {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
