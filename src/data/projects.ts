/**
 * Every project, in ring order. Copy follows the house rules in content.ts:
 * every number traces back to the CV, no invented metrics.
 * `illustration` marks images drawn for the site rather than captured.
 */

export type Project = {
  slug: string;
  name: string;
  kind: string;
  role: string;
  year: string;
  award?: string;
  stack?: string[];
  image: string;
  illustration?: boolean;
  story: string[];
  points?: string[];
  links?: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "fraudlens",
    name: "FraudLens AI",
    kind: "Hackathon build",
    role: "Team lead, backend and Chrome extension",
    year: "2026",
    award: "Winner, Finnovate Hackathon 2026",
    image: "/work/fraudlens.jpg",
    story: [
      "A scam checker for messages, links and emails, built for Mauritius in English, French and Kreol Morisien. I led the team of five over 72 hours and owned the backend and the extension.",
      "The decision I'd defend in any interview: the language model never decides the verdict. A deterministic engine with about 70 signal codes owns the score. The model only reads language, and it has to quote words that are actually in the message, or its output is thrown away. When the model is down, the rules still return a full answer.",
      "With the model switched off it scores 73% recall and 100% precision on 84 test messages.",
    ],
    links: [
      { label: "fraudlens.site", href: "https://fraudlens.site" },
      { label: "Chrome extension", href: "https://chromewebstore.google.com/detail/ijoefckhnkajhegfegkifedkahdiebdj" },
    ],
  },
  {
    slug: "bluenet",
    name: "BlueNet: Ocean Watch",
    kind: "Hackathon build",
    role: "Team lead, backend",
    year: "2026",
    award: "Judge's Choice, Build with Gemma",
    image: "/work/bluenet.jpg",
    story: [
      "Mauritius has 2.3 million square kilometres of sea and three patrol boats. BlueNet helps decide where they go.",
      "Plain code flags the patterns that matter in vessel tracking data: ships going dark in protected zones, two vessels meeting at sea, trawling patterns. Then a Gemma agent investigates each flagged vessel with function calling and writes a ranked case file for the coast guard. I led the team of five and built the backend.",
    ],
  },
  {
    slug: "blackreef",
    name: "Black Reef",
    kind: "Company",
    role: "CEO and co-founder",
    year: "2026 to now",
    stack: ["Next.js", "TypeScript", "GSAP", "Vercel"],
    image: "/work/blackreef.jpg",
    story: [
      "After FraudLens won Finnovate, the five of us kept going and started a software studio. Black Reef builds websites, mobile apps and custom software for businesses, at a price agreed before any work starts.",
    ],
    points: [
      "Five co-founders, the same team that built FraudLens. The people on a client's first call are the people who build the product.",
      "Fixed-scope written proposals. The client owns the code, designs, domains and accounts from day one.",
      "Built the company site: Next.js 16, statically prerendered, with one public endpoint for the contact form, validated server-side, rate limited and origin-checked, behind strict security headers.",
    ],
    links: [{ label: "teamblackreef.com", href: "https://www.teamblackreef.com" }],
  },
  {
    slug: "smarterp",
    name: "SmartERP Attendance",
    kind: "Internship, Imatic Technologies",
    role: "Software developer intern",
    year: "2026",
    stack: ["Next.js", "MSSQL", "C# / .NET 8", "Node.js", "IIS", "Stimulsoft"],
    image: "/work/smarterp.jpg",
    story: [
      "I built the attendance module for SmartERP, ITL's ERP product, from the schema up. Next.js on the front, MSSQL stored procedures underneath, deployed under IIS. It's in user acceptance testing now, and ships to ITL's customer companies after that.",
      "The bug I'm proudest of finding: the import ran clean, no errors, no warnings, and about one punch in six was quietly missing. Two doors recording the same employee in the same minute looked identical to the unique index, so it kept one and threw the other away. The fix was one column.",
    ],
    points: [
      "Multi-company from the session down: every login carries a company ID, every route passes it to the procedures, so one deployment serves several companies.",
      "An 8-table schema with one read and one write procedure per table. JSON in, JSON out, errors to an audit table.",
      "Attendance processing runs each employee in their own transaction. A full month, 49 people and 13,487 punches, processes in about 1.5 seconds with no failures.",
      "Signed HttpOnly sessions with a sliding 30-minute timeout, one live session per user, per-IP rate limiting and a nonce-based CSP.",
      "Built the same 9-endpoint API twice, in .NET 8 and in Node.js, so the team could decide on leaving ASP.NET MVC with numbers instead of opinions.",
      "Built the dashboard: daily KPIs, a filterable roster with CSV export, an exceptions panel and a weekly calendar, with unit and integration tests against SQL Server.",
    ],
  },
  {
    slug: "sultan",
    name: "Sultan Mauritius",
    kind: "Client work",
    role: "Built and launched",
    year: "2026",
    stack: ["Next.js", "Prisma", "Sanity"],
    image: "/work/sultan.jpg",
    story: [
      "A bilingual online shop for a Mauritian drinks brand, built and launched for a paying client.",
      "Sanity sits behind it, so the client edits their own products without calling me.",
    ],
    links: [{ label: "sultanmauritius.com", href: "https://sultanmauritius.com" }],
  },
  {
    slug: "tcp",
    name: "TCP chat server",
    kind: "Personal project",
    role: "Solo",
    year: "2026",
    stack: ["Go"],
    image: "/work/tcp.jpg",
    illustration: true,
    story: [
      "Raw TCP in Go, one goroutine per client, mutex-guarded shared state, and a clean shutdown across every connection.",
      "I wanted to understand concurrency rather than trust the runtime with it. It deadlocked, raced on a map and misused a WaitGroup, and I fixed each one by tracing it through the synchronisation model instead of adding sleeps until it stopped.",
    ],
    links: [{ label: "Read the Go code", href: "https://github.com/kshitij406/TCP" }],
  },
  {
    slug: "country",
    name: "Country Materials",
    kind: "Client work",
    role: "Built and launched",
    year: "2026",
    stack: ["Next.js", "Sanity"],
    image: "/work/country.jpg",
    story: [
      "Corporate site for a Tanzanian construction materials and recycling company.",
      "It includes an endpoint that keeps the product catalogue in step with the company's ERP, and the legal compliance pages.",
    ],
    links: [{ label: "countrymaterial.com", href: "https://countrymaterial.com" }],
  },
  {
    slug: "fleet",
    name: "Fleet Manager",
    kind: "Internship, CubeStone Consulting",
    role: "Software developer intern, solo build",
    year: "2026",
    stack: ["C#", "Dapper", "SAP HANA", "React Native", "Expo"],
    image: "/work/fleet.jpg",
    illustration: true,
    story: [
      "My first codebase with somebody else's money on it. I built a fleet management system on my own: around 40 endpoints in C# with Dapper against SAP HANA, the schema behind them, and the React Native app on top.",
    ],
    points: [
      "Assets, drivers, fuel logs, service schedules, work orders, reports.",
      "Bearer-token login plus a per-employee permission table that decides which tabs and report cards each person sees.",
      "Expo app with dashboard analytics, preventative maintenance scheduling and PDF export.",
    ],
    links: [
      { label: "App code", href: "https://github.com/kshitij406/FleetManagementApp" },
      { label: "API code", href: "https://github.com/kshitij406/FleetManagementApi" },
    ],
  },
  {
    slug: "platformer",
    name: "Platformer",
    kind: "Personal project, game",
    role: "Solo",
    year: "2026",
    stack: ["Godot 4", "WebAssembly"],
    image: "/work/platformer.jpg",
    story: [
      "A small 2D platformer I made in Godot. Coins, enemies, a knight, and a few ways to fall to your death.",
      "Player controller, an enemy, coins, killzones and a game manager tying the run together, exported to WebAssembly so it needs no install. It runs right here in the browser.",
    ],
  },
];

export const project = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const nextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
