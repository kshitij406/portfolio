type Box = { x: number; y: number; w: number; h: number; label: string; sub?: string };

const BOXES: Box[] = [
  { x: 8, y: 8, w: 92, h: 44, label: 'Client A' },
  { x: 8, y: 88, w: 92, h: 44, label: 'Client B' },
  { x: 8, y: 168, w: 92, h: 44, label: 'Client C' },
  { x: 160, y: 88, w: 116, h: 44, label: 'Listener' },
  { x: 328, y: 88, w: 130, h: 44, label: 'goroutine', sub: '× N, one per conn' },
  { x: 508, y: 88, w: 84, h: 44, label: 'Mutex' },
  { x: 612, y: 88, w: 84, h: 44, label: 'Register' },
];

const TAGS = [
  { x: 220, y: 68, text: 'WAITGROUP MISUSE' },
  { x: 393, y: 68, text: 'DEADLOCK' },
  { x: 560, y: 68, text: 'RACE' },
];

/**
 * Static diagram of the TCP chat server's concurrency model: one goroutine
 * per connection, funneled through a listener, guarded by a mutex before
 * touching the shared register map. The three trouble joints are the actual
 * failure modes described in the case study, shown struck through because
 * they were found and fixed, not because they never happened.
 */
export default function ConcurrencyDiagram() {
  const clients = BOXES.slice(0, 3);
  const listener = BOXES[3];
  const goroutine = BOXES[4];
  const mutex = BOXES[5];
  const register = BOXES[6];

  const cy = (b: Box) => b.y + b.h / 2;

  return (
    <figure className="m-0 mt-6">
      <svg
        viewBox="0 0 700 232"
        className="w-full h-auto"
        role="img"
        aria-label="Diagram: three clients, each handed to its own goroutine by a listener, funneled through a mutex before touching the shared register map. Deadlock, a data race and WaitGroup misuse are marked at the joints where they were found, each struck through and labeled fixed."
      >
        {clients.map((c) => (
          <line
            key={c.label}
            x1={c.x + c.w}
            y1={cy(c)}
            x2={listener.x}
            y2={cy(listener)}
            stroke="var(--rule)"
            strokeWidth={1}
          />
        ))}
        <line
          x1={listener.x + listener.w}
          y1={cy(listener)}
          x2={goroutine.x}
          y2={cy(goroutine)}
          stroke="var(--rule)"
          strokeWidth={1}
        />
        <line
          x1={goroutine.x + goroutine.w}
          y1={cy(goroutine)}
          x2={mutex.x}
          y2={cy(mutex)}
          stroke="var(--rule)"
          strokeWidth={1}
        />
        <line
          x1={mutex.x + mutex.w}
          y1={cy(mutex)}
          x2={register.x}
          y2={cy(register)}
          stroke="var(--rule)"
          strokeWidth={1}
        />

        {BOXES.map((b) => (
          <g key={b.label}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              fill="var(--paper-2)"
              stroke="var(--ink)"
              strokeWidth={1}
            />
            <text
              x={b.x + b.w / 2}
              y={b.sub ? b.y + b.h / 2 - 4 : b.y + b.h / 2 + 4}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={11}
              fill="var(--ink)"
            >
              {b.label}
            </text>
            {b.sub && (
              <text
                x={b.x + b.w / 2}
                y={b.y + b.h / 2 + 12}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={8.5}
                fill="var(--ink-3)"
              >
                {b.sub}
              </text>
            )}
          </g>
        ))}

        {TAGS.map((t) => (
          <text
            key={t.text}
            x={t.x}
            y={t.y}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize={9}
            letterSpacing={0.5}
          >
            <tspan fill="var(--signal)" style={{ textDecoration: 'line-through' }}>
              {t.text}
            </tspan>
            <tspan fill="var(--deep)" dx={5}>
              FIXED
            </tspan>
          </text>
        ))}
      </svg>
      <figcaption
        className="mono text-[0.6875rem] mt-2"
        style={{ color: 'var(--ink-4)' }}
      >
        found by reasoning through the model, not by adding sleeps until the crashing stopped.
      </figcaption>
    </figure>
  );
}
