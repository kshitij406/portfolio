import Sticker, { type Tone } from "@/components/Sticker";

/** Big uppercase page title with a tag stuck to its corner, then a lede. */
export default function PageHead({
  tag,
  tone,
  title,
  children,
}: {
  tag: string;
  tone: Tone;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="phead" data-sticker-bounds>
      <h1 className="display phead-h">
        <Sticker tone={tone} tilt={-9} className="phead-tag">
          {tag}
        </Sticker>
        {title}
      </h1>
      {children && <div className="phead-lede">{children}</div>}
    </header>
  );
}
