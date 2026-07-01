import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

export async function GET() {
  const memesDir = path.join(process.cwd(), "public", "memes");

  try {
    const files = fs
      .readdirSync(memesDir)
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort();

    const memes = files.map((filename) => ({
      filename,
      src: `/memes/${filename}`,
      id: path.parse(filename).name,
    }));

    return NextResponse.json({ memes, total: memes.length });
  } catch {
    return NextResponse.json({ memes: [], total: 0 });
  }
}
