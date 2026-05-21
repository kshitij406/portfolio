import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#14181d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          border: "1.5px solid #00c26f",
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 13,
          color: "#00c26f",
          letterSpacing: -0.5,
        }}
      >
        KJ
      </div>
    ),
    { ...size }
  );
}
