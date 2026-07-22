import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/** Contour lines on bone paper, the chart motif at 32px. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#efebe2',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <div style={{ width: 20, height: 2, background: '#1d5c52', borderRadius: 2 }} />
        <div style={{ width: 14, height: 2, background: '#1d5c52', borderRadius: 2 }} />
        <div style={{ width: 8, height: 2, background: '#c2402a', borderRadius: 2 }} />
      </div>
    ),
    { ...size }
  );
}
