"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import SplashScreen from "./SplashScreen";
import JokeCard from "./JokeCard";
import MemeCard from "./MemeCard";

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

interface HomeClientProps {
  jokes: Joke[];
  memes: Meme[];
}

export default function HomeClient({ jokes, memes }: HomeClientProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [mode, setMode] = useState<"joke" | "meme">("joke");
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [jokeKey, setJokeKey] = useState(0);
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  const [memeKey, setMemeKey] = useState(0);

  useEffect(() => {
    if (jokes.length > 0) {
      setCurrentJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    }
  }, [jokes]);

  const pickRandom = useCallback(() => {
    if (jokes.length === 0) return;
    setMode("joke");
    setCurrentJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    setJokeKey((k) => k + 1);
  }, [jokes]);

  const pickRandomMeme = useCallback(() => {
    if (memes.length === 0) return;
    setMode("meme");
    setCurrentMeme(memes[Math.floor(Math.random() * memes.length)]);
    setMemeKey((k) => k + 1);
  }, [memes]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          fontFamily: "'Titillium Web', sans-serif",
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.5s ease 0.2s",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(101,0,216,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(86,183,181,0.1) 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            width: "100%",
            maxWidth: "640px",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/ilf-logo.svg`}
                alt="ILF Logo"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
              <h1
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  margin: 0,
                  color: "#fff",
                  letterSpacing: "0.02em",
                }}
              >
                ILF Community Jokes
              </h1>
            </div>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {jokes.length} joke{jokes.length !== 1 ? "s" : ""} in the ledger
            </p>
          </div>

          {/* Active card */}
          {mode === "joke" && currentJoke && (
            <div key={jokeKey} style={{ width: "100%", animation: "slideIn 0.4s ease" }}>
              <JokeCard
                joke={currentJoke}
                jokeNumber={parseInt(currentJoke.id)}
                totalJokes={jokes.length}
              />
            </div>
          )}

          {mode === "meme" && currentMeme && (
            <div key={memeKey} style={{ width: "100%", animation: "slideIn 0.4s ease" }}>
              <MemeCard
                src={currentMeme.src}
                id={currentMeme.id}
                totalMemes={memes.length}
              />
            </div>
          )}

          {/* Buttons */}
          {(jokes.length > 0 || memes.length > 0) && (
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              {jokes.length > 0 && (
                <button
                  onClick={pickRandom}
                  style={{
                    background: "linear-gradient(135deg, #6500d8, #56b7b5)",
                    border: "none",
                    borderRadius: "999px",
                    padding: "0.85rem 2.5rem",
                    color: "#fff",
                    fontSize: "1rem",
                    fontFamily: "'Titillium Web', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "transform 0.15s ease, opacity 0.15s ease",
                    boxShadow: "0 4px 24px rgba(101,0,216,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
                    (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  }}
                >
                  🎲 Random Joke
                </button>
              )}
              {memes.length > 0 && (
                <button
                  onClick={pickRandomMeme}
                  style={{
                    background: "linear-gradient(135deg, #ff7a7f, #ff9852)",
                    border: "none",
                    borderRadius: "999px",
                    padding: "0.85rem 2.5rem",
                    color: "#fff",
                    fontSize: "1rem",
                    fontFamily: "'Titillium Web', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "transform 0.15s ease, opacity 0.15s ease",
                    boxShadow: "0 4px 24px rgba(255,122,127,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
                    (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  }}
                >
                  🖼️ Random Meme
                </button>
              )}
            </div>
          )}

          {/* Footer */}
          <p
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.75rem",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            Interledger Foundation · Community Edition
          </p>
        </div>

        <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </main>
    </>
  );
}
