"use client";

import { useState } from "react";

interface Joke {
  id: string;
  setup: string;
  punchline: string;
}

interface JokeCardProps {
  joke: Joke;
  jokeNumber: number;
  totalJokes: number;
}

export default function JokeCard({ joke, jokeNumber, totalJokes }: JokeCardProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "2.5rem",
        maxWidth: "600px",
        width: "100%",
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative top gradient line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(to right, #6500d8, #56b7b5, #ff7a7f, #68c180, #ff9852)",
        }}
      />

      {/* Joke count badge */}
      <div
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          background: "rgba(101,0,216,0.2)",
          border: "1px solid rgba(101,0,216,0.4)",
          borderRadius: "999px",
          padding: "0.2rem 0.75rem",
          fontSize: "0.75rem",
          color: "#a78bff",
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}
      >
        #{joke.id} / {String(totalJokes).padStart(3, "0")}
      </div>

      {/* Setup */}
      <p
        style={{
          fontSize: "1.3rem",
          fontWeight: 600,
          color: "#fff",
          margin: "0 0 1.5rem 0",
          lineHeight: 1.5,
          paddingRight: "4rem",
        }}
      >
        {joke.setup}
      </p>

      {/* Reveal button or punchline */}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          style={{
            background: "rgba(101,0,216,0.15)",
            border: "1px dashed rgba(101,0,216,0.5)",
            borderRadius: "10px",
            padding: "1rem 1.5rem",
            width: "100%",
            color: "rgba(167,139,255,0.7)",
            fontSize: "0.9rem",
            fontFamily: "'Titillium Web', sans-serif",
            cursor: "pointer",
            fontWeight: 600,
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(101,0,216,0.25)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(101,0,216,0.8)";
            (e.currentTarget as HTMLButtonElement).style.color = "#a78bff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(101,0,216,0.15)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(101,0,216,0.5)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(167,139,255,0.7)";
          }}
        >
          🎉 Tap to reveal the punchline
        </button>
      ) : (
        <div
          style={{
            background: "rgba(86,183,181,0.1)",
            border: "1px solid rgba(86,183,181,0.3)",
            borderRadius: "10px",
            padding: "1rem 1.5rem",
            animation: "fadeIn 0.4s ease",
          }}
        >
          <p
            style={{
              fontSize: "1.15rem",
              fontWeight: 600,
              color: "#80d4be",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {joke.punchline}
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
