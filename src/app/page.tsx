"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import SplashScreen from "./components/SplashScreen";
import JokeCard from "./components/JokeCard";

interface Joke {
  id: string;
  setup: string;
  punchline: string;
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [jokeKey, setJokeKey] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jokes")
      .then((r) => r.json())
      .then(({ jokes }) => {
        setJokes(jokes);
        if (jokes.length > 0) {
          setCurrentJoke(jokes[Math.floor(Math.random() * jokes.length)]);
        }
        setLoading(false);
      });
  }, []);

  const pickRandom = useCallback(() => {
    if (jokes.length === 0) return;
    const next = jokes[Math.floor(Math.random() * jokes.length)];
    setCurrentJoke(next);
    setJokeKey((k) => k + 1);
  }, [jokes]);

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
                src="/ilf-logo.svg"
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

          {/* Joke card */}
          {loading ? (
            <div
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "1rem",
                padding: "3rem",
              }}
            >
              Loading...
            </div>
          ) : jokes.length === 0 ? (
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "3rem",
                textAlign: "center",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <p style={{ fontSize: "1.2rem", margin: "0 0 0.5rem" }}>No jokes yet!</p>
              <p style={{ fontSize: "0.9rem", margin: 0 }}>
                Add JSON files to the <code style={{ color: "#80d4be" }}>jokes/</code> folder to get started.
              </p>
            </div>
          ) : (
            currentJoke && (
              <div key={jokeKey} style={{ width: "100%", animation: "slideIn 0.4s ease" }}>
                <JokeCard
                  joke={currentJoke}
                  jokeNumber={parseInt(currentJoke.id)}
                  totalJokes={jokes.length}
                />
              </div>
            )
          )}

          {/* Random button */}
          {!loading && jokes.length > 0 && (
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
