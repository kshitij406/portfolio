import Stickers from "./Stickers";

/**
 * Every section opens the same way: an index tag, the heading, a note
 * scribbled in the margin, and a few stickers of its own to the right.
 */
export default function SecHead({
  id,
  n,
  tag,
  note,
  children,
}: {
  id: string;
  n: number;
  tag: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sec-top">
      <p className="kicker" aria-hidden>
        <span className="kicker-n">{String(n).padStart(2, "0")}</span>
        {tag}
      </p>
      <h2 className="sec-h" id={`${id}-h`}>
        {children}
      </h2>
      {note && (
        <p className="scribble" aria-hidden>
          <svg viewBox="0 0 60 40" className="scribble-arrow">
            <path d="M56 6 C40 4 18 10 10 32 M10 32 L6 20 M10 32 L21 26" />
          </svg>
          {note}
        </p>
      )}
      <Stickers section={id} className="sec-stickers" />
    </div>
  );
}
