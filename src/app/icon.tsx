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
          borderRadius: 6,
          gap: 2,
        }}
      >
        {/* > prompt character */}
        <span
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 17,
            color: "#00c26f",
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          &gt;
        </span>
        {/* cursor block */}
        <span
          style={{
            display: "block",
            width: 7,
            height: 14,
            background: "#00c26f",
            borderRadius: 1,
            opacity: 0.9,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
