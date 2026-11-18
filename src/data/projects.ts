/**
 * Every project, in ring order. Copy follows the house rules in content.ts:
 * every number traces back to the CV, no invented metrics.
 * `illustration` marks images drawn for the site rather than captured.
 */

export const CATEGORIES = ["Client", "Internship", "Hackathon", "Personal", "Company"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Project = {
  slug: string;
  name: string;
  kind: string;
  category: Category;
  role: string;
  year: string;
  award?: string;
  stack?: string[];
  image: string;
  illustration?: boolean;
  /** App icon, shown large beside the title. */
  icon?: string;
  /** Phone screenshots, shown big under the cover. */
  gallery?: { src: string; alt: string }[];
  story: string[];
  points?: string[];
  links?: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "travelio",
    name: "Travelio",
    kind: "Hackathon build, mobile app",
    category: "Hackathon",
    role: "Team lead, the whole backend",
    year: "2026",
    award: "Winner, Life Powered by Tech 2026",
    stack: ["Firebase Realtime Database", "Firebase Auth", "Security rules", "Jest", "Flutter"],
    image: "/work/travelio.jpg",
    icon: "/work/travelio/icon.png",
    story: [
      "A live bus tracker for Mauritius, built in 24 hours and the winner of the Life Powered by Tech hackathon. Riders already on a bus share their position anonymously, and anyone waiting at a stop sees when it will arrive. I led the team of five and built the whole backend.",
      "The hard part is trust: anyone can open the app and claim to be a bus. The database rules only accept a position inside Mauritius, at a speed a bus can actually reach, from the rider who owns that slot. Positions older than two minutes are ignored and anyone can clear them, so a dead phone never leaves a ghost bus on the map.",
      "It covers 282 bus lines and the Metro Express. When nobody on a route is sharing, the app falls back to the timetable and says so.",
    ],
    points: [
      "Firebase Realtime Database with anonymous sign-in: sharing a bus needs no name, number or account.",
      "Every write is validated in the rules: coordinates inside Mauritius, speed under 120 km/h, no unknown fields, and crowding reports at most once every 30 seconds.",
      "Only the latest position is stored, never a trip history. Sharing stops at the end of the route or after 90 minutes.",
      "The optional leaderboard lives in a separate Firebase app, so a rider's points can never be linked back to where they went.",
      "The rules are tested against the Firebase emulators with Jest, under a demo project id that never touches the real database.",
    ],
    gallery: [
      { src: "/work/travelio/home.jpg", alt: "Travelio home screen: nearby stops and their next buses" },
      { src: "/work/travelio/stop.jpg", alt: "A stop, with its next bus and a button to report a bus that passed without stopping" },
      { src: "/work/travelio/onbus.jpg", alt: "I'm on the bus: picking the route before sharing" },
      { src: "/work/travelio/map.jpg", alt: "Map with route 2 drawn from Port Louis to Curepipe" },
      { src: "/work/travelio/plan.jpg", alt: "Journey planner" },
      { src: "/work/travelio/places-beach.jpg", alt: "Places: beaches with their nearest stops" },
    ],
  },
  {
    slug: "fraudlens",
    name: "FraudLens AI",
    kind: "Hackathon build",
    category: "Hackathon",
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
    category: "Hackathon",
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
    category: "Company",
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
    category: "Internship",
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
    category: "Client",
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
    category: "Personal",
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
    category: "Client",
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
    category: "Internship",
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
    category: "Personal",
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
