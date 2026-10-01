import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} | ${siteConfig.tagline}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0917 0%, #191533 55%, #2a2154 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            fontWeight: 700,
            color: "#e7e4f7",
          }}
        >
          <div
            style={{
              width: 22,
              height: 34,
              borderRadius: 10,
              background:
                "linear-gradient(180deg, #ff8f88, #ff0a45 45%, #533a9c 70%, #39b8fd)",
            }}
          />
          Chopra Creative
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.08,
            maxWidth: 980,
            letterSpacing: -1,
          }}
        >
          Packaging that communicates, sells and is ready for production.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            color: "#a7a1c9",
          }}
        >
          Product packaging & ecommerce design studio
        </div>
      </div>
    ),
    { ...size },
  );
}
