/**
 * Small static diagrams for the case-study blocks whose projects have no
 * interface to screenshot. They replace GitHub repo-page captures, which
 * showed a file listing rather than anything about the project.
 *
 * Unlike ConcurrencyDiagram, which is drawn in ink/paper tones and only
 * reads correctly on a `paper` block, these inherit `currentColor` from the
 * block's own body colour, so the same markup works on paper, vermilion,
 * black and teal. The one highlight colour comes in as `accent` because it
 * cannot be derived: on paper it is var(--signal), on a saturated block it
 * has to be a literal white, since var(--paper) flips to black in dark mode.
 */

type DiagramProps = { accent?: string };

const MONO = 'var(--font-mono)';

/** Shared frame: transparent box, hairline border, mono label and optional sub. */
function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.5}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={11}
        fill="currentColor"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize={8.5}
          fill="currentColor"
          fillOpacity={0.75}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mono text-[0.6875rem] mt-2" style={{ opacity: 0.75 }}>
      {children}
    </figcaption>
  );
}

/**
 * Metals bot: the trade bracket. The point of the picture is that the stop
 * and target are fixed multiples of ATR(14) set before the run, and that the
 * distances are deliberately 2:1, so the geometry is drawn to scale.
 */
export function AtrDiagram({ accent = 'currentColor' }: DiagramProps) {
  const yTarget = 30;
  const yEntry = 120;
  const yStop = 165;
  const x0 = 104;
  const x1 = 470;

  const rows = [
    { y: yTarget, label: 'TARGET', note: '3.0x ATR(14) above', strong: true, dash: undefined },
    { y: yEntry, label: 'ENTRY', note: 'EMA 9/21 cross, RSI(14) confirm', strong: false, dash: '4 3' },
    { y: yStop, label: 'STOP', note: '1.5x ATR(14) below', strong: true, dash: undefined },
  ];

  return (
    <figure className="m-0 mt-6">
      <svg
        viewBox="0 0 700 200"
        className="w-full h-auto"
        role="img"
        aria-label="Diagram: a trade bracket drawn to scale. Entry sits on an EMA 9/21 crossover confirmed by RSI 14. The target is three times ATR(14) above entry and the stop is one and a half times ATR(14) below, so the reward leg is twice the risk leg."
      >
        {rows.map((r) => (
          <g key={r.label}>
            <text
              x={0}
              y={r.y + 4}
              fontFamily={MONO}
              fontSize={11}
              fill={r.strong ? accent : 'currentColor'}
            >
              {r.label}
            </text>
            <line
              x1={x0}
              y1={r.y}
              x2={x1}
              y2={r.y}
              stroke={r.strong ? accent : 'currentColor'}
              strokeOpacity={r.strong ? 1 : 0.5}
              strokeWidth={1}
              strokeDasharray={r.dash}
            />
            <text
              x={x1 + 14}
              y={r.y + 4}
              fontFamily={MONO}
              fontSize={9.5}
              fill="currentColor"
              fillOpacity={0.85}
            >
              {r.note}
            </text>
          </g>
        ))}

        {/* Risk and reward legs, measured off the same entry line. */}
        {[
          { from: yTarget, to: yEntry, text: '2R' },
          { from: yEntry, to: yStop, text: '1R' },
        ].map((leg) => (
          <g key={leg.text}>
            <line
              x1={86}
              y1={leg.from}
              x2={86}
              y2={leg.to}
              stroke="currentColor"
              strokeOpacity={0.45}
              strokeWidth={1}
            />
            <text
              x={80}
              y={(leg.from + leg.to) / 2 + 3}
              textAnchor="end"
              fontFamily={MONO}
              fontSize={9}
              fill="currentColor"
              fillOpacity={0.85}
            >
              {leg.text}
            </text>
          </g>
        ))}
      </svg>
      <Caption>
        1% account risk per trade, one open position per instrument. The stopping criteria were
        fixed in advance, so they could not be moved once it started losing.
      </Caption>
    </figure>
  );
}

/**
 * Polymarket bot: the pipeline from raw forecasts to a logged prediction.
 * The edge check is drawn as a gate rather than a step, because most runs
 * stop there and log nothing.
 */
export function EnsembleDiagram({ accent = 'currentColor' }: DiagramProps) {
  const sources = ['ECMWF', 'GFS', 'UKMO', 'deterministic x2'];
  // Martian Mono runs wide: 'deterministic x2' needs ~120px at 11px, so the
  // source column is 150 rather than the 116 the shorter labels would want.
  const srcW = 150;
  const srcH = 30;
  const srcYs = [10, 48, 86, 124];
  const midY = 86;

  const stages: { x: number; w: number; label: string; sub?: string }[] = [
    { x: 196, w: 84, label: 'blend' },
    { x: 300, w: 104, label: 'prior', sub: 'by lead time' },
    { x: 424, w: 110, label: 'distribution' },
  ];
  const gate = { x: 554, w: 146, label: 'edge >= 10 pts', sub: 'else log nothing' };

  return (
    <figure className="m-0 mt-6">
      <svg
        viewBox="0 0 700 200"
        className="w-full h-auto"
        role="img"
        aria-label="Diagram: three ensemble forecast providers and two deterministic providers are blended into one distribution, weighted by a climatological prior that depends on how far out the forecast is. A prediction is only logged when its edge over the market price clears ten points."
      >
        {srcYs.map((y, i) => (
          <g key={sources[i]}>
            <Box x={0} y={y} w={srcW} h={srcH} label={sources[i]} />
            <line
              x1={srcW}
              y1={y + srcH / 2}
              x2={stages[0].x}
              y2={midY}
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
          </g>
        ))}

        {stages.map((s, i) => {
          const next = i < stages.length - 1 ? stages[i + 1].x : gate.x;
          return (
            <g key={s.label}>
              <Box x={s.x} y={midY - 22} w={s.w} h={44} label={s.label} sub={s.sub} />
              <line
                x1={s.x + s.w}
                y1={midY}
                x2={next}
                y2={midY}
                stroke="currentColor"
                strokeOpacity={0.4}
                strokeWidth={1}
              />
            </g>
          );
        })}

        <rect
          x={gate.x}
          y={midY - 22}
          width={gate.w}
          height={44}
          fill="none"
          stroke={accent}
          strokeWidth={1.5}
        />
        <text
          x={gate.x + gate.w / 2}
          y={midY - 3}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize={11}
          fill={accent}
        >
          {gate.label}
        </text>
        <text
          x={gate.x + gate.w / 2}
          y={midY + 12}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize={8.5}
          fill="currentColor"
          fillOpacity={0.75}
        >
          {gate.sub}
        </text>
      </svg>
      <Caption>
        Every logged prediction resolves against the historical record and scores itself on win
        rate, ROI and calibration. The sample is nowhere near big enough to claim an edge.
      </Caption>
    </figure>
  );
}

/**
 * VendingMachine: the bit that actually taught something. Two OS processes
 * either side of a socket, which is the first place state can disagree.
 */
export function TwoProcessDiagram({ accent = 'currentColor' }: DiagramProps) {
  const boundaryX = 250;

  return (
    <figure className="m-0 mt-6">
      <svg
        viewBox="0 0 700 190"
        className="w-full h-auto"
        role="img"
        aria-label="Diagram: a Tkinter GUI in one process talks over a TCP socket to a multithreaded socket server in another process, which owns the SQLite database. A dashed line marks the process boundary, the point where the two sides can disagree about state."
      >
        <line
          x1={boundaryX}
          y1={18}
          x2={boundaryX}
          y2={150}
          stroke={accent}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <text
          x={boundaryX}
          y={12}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize={9}
          fill={accent}
          letterSpacing={0.5}
        >
          PROCESS BOUNDARY
        </text>

        <Box x={0} y={58} w={186} h={56} label="Tkinter GUI" sub="currency conversion, charts" />
        <Box x={314} y={58} w={186} h={56} label="socket server" sub="multithreaded" />
        <Box x={556} y={58} w={144} h={56} label="SQLite" sub="single writer" />

        {/* Request out, state back: the two directions are the whole problem. */}
        <line x1={186} y1={76} x2={314} y2={76} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
        <line x1={314} y1={98} x2={186} y2={98} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
        <text x={250} y={70} textAnchor="middle" fontFamily={MONO} fontSize={8.5} fill="currentColor" fillOpacity={0.85}>
          request
        </text>
        <text x={250} y={112} textAnchor="middle" fontFamily={MONO} fontSize={8.5} fill="currentColor" fillOpacity={0.85}>
          state
        </text>

        <line x1={500} y1={86} x2={556} y2={86} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
      </svg>
      <Caption>
        The brief asked for one process. Two of them having to agree with each other is a specific
        and annoying kind of problem, and the reason this one was worth over-building.
      </Caption>
    </figure>
  );
}
