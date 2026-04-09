interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  max = 5,
  size = "md",
  showLabel = false,
  className = "",
}: StarRatingProps) {
  const sizeClass = { sm: "text-xs", md: "text-sm", lg: "text-base" }[size];

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className={`inline-flex gap-px leading-none ${sizeClass}`}>
        {Array.from({ length: max }).map((_, i) => {
          const full = rating >= i + 1;
          const half = !full && rating >= i + 0.5;
          return (
            <span
              key={i}
              className="relative inline-block"
              style={{ color: "var(--border)", width: "1ch" }}
            >
              ★
              {(full || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    color: "var(--rating)",
                    width: full ? "100%" : "50%",
                  }}
                >
                  ★
                </span>
              )}
            </span>
          );
        })}
      </span>
      {showLabel && (
        <span
          className="text-xs tabular-nums"
          style={{
            color: "var(--muted-dim)",
            fontFamily: "var(--font-dm-mono), monospace",
          }}
        >
          {rating % 1 === 0 ? `${rating}.0` : rating}
        </span>
      )}
    </div>
  );
}
