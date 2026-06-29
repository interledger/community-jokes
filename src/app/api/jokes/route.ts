import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const jokesDir = path.join(process.cwd(), "jokes");

  try {
    const files = fs
      .readdirSync(jokesDir)
      .filter((f) => f.endsWith(".json"))
      .sort();

    const jokes = files.map((file) => {
      const content = fs.readFileSync(path.join(jokesDir, file), "utf-8");
      return JSON.parse(content);
    });

    return NextResponse.json({ jokes, total: jokes.length });
  } catch {
    return NextResponse.json({ jokes: [], total: 0 });
  }
}
