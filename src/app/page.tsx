import fs from "fs";
import path from "path";
import HomeClient from "./components/HomeClient";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

interface Joke {
  id: string;
  setup: string;
  punchline: string;
}

interface Meme {
  filename: string;
  src: string;
  id: string;
}

function getJokes(): Joke[] {
  const jokesDir = path.join(process.cwd(), "jokes");
  try {
    const files = fs
      .readdirSync(jokesDir)
      .filter((f) => f.endsWith(".json"))
      .sort();
    return files.map((file) =>
      JSON.parse(fs.readFileSync(path.join(jokesDir, file), "utf-8"))
    );
  } catch {
    return [];
  }
}

function getMemes(): Meme[] {
  const memesDir = path.join(process.cwd(), "public", "memes");
  try {
    const files = fs
      .readdirSync(memesDir)
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort();
    return files.map((filename) => ({
      filename,
      src: `/memes/${filename}`,
      id: path.parse(filename).name,
    }));
  } catch {
    return [];
  }
}

export default function Page() {
  const jokes = getJokes();
  const memes = getMemes();
  return <HomeClient jokes={jokes} memes={memes} />;
}
