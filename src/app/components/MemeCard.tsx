"use client";

import Image from "next/image";

interface MemeCardProps {
  src: string;
  id: string;
  totalMemes: number;
}

export default function MemeCard({ src, id, totalMemes }: MemeCardProps) {
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
          background: "linear-gradient(to right, #ff9852, #68c180, #ff7a7f, #56b7b5, #6500d8)",
        }}
      />

      {/* Meme count badge */}
      <div
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          background: "rgba(255,152,82,0.2)",
          border: "1px solid rgba(255,152,82,0.4)",
          borderRadius: "999px",
          padding: "0.2rem 0.75rem",
          fontSize: "0.75rem",
          color: "#ffb87a",
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}
      >
        #{id} / {String(totalMemes).padStart(3, "0")}
      </div>

      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          marginTop: "0.5rem",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Image
          src={src}
          alt="Community meme"
          fill
          style={{ objectFit: "contain" }}
          sizes="600px"
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
