/**
 * All copy on the site. Every number traces back to the CV.
 * House rules: no em dashes, no invented metrics, plain sentences.
 */

export const PROFILE = {
  name: "Kshitij Jha",
  email: "kshitij.j615@gmail.com",
  based: "Canterbury, UK",
  availability: "Looking for a 12-month placement from summer 2027",
};

export const LINKS = [
  { label: "GitHub", href: "https://github.com/kshitij406", handle: "kshitij406" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kshitij-jha2006/", handle: "kshitij-jha2006" },
  { label: "Letterboxd", href: "https://boxd.it/4m4al", handle: "Kxitiz_" },
  { label: "Instagram", href: "https://www.instagram.com/kxitiz_", handle: "kxitiz_" },
];

export const WORK = [
  {
    id: "itl",
    company: "Imatic Technologies",
    role: "Software Developer Intern",
    place: "Dar es Salaam",
    period: "Jun to Sep 2026",
    lede:
      "I built the attendance module for SmartERP, ITL's ERP product, from the schema up. Next.js on the front, MSSQL stored procedures underneath, deployed under IIS. It's in user acceptance testing now, and ships to ITL's customer companies after that.",
    points: [
      "Multi-company from the session down: every login carries a company ID, every route passes it to the procedures, so one deployment serves several companies.",
      "An 8-table schema with one read and one write procedure per table. JSON in, JSON out, errors to an audit table.",
      "Attendance processing runs each employee in their own transaction. A full month, 49 people and 13,487 punches, processes in about 1.5 seconds with no failures.",
      "Signed HttpOnly sessions with a sliding 30-minute timeout, one live session per user, per-IP rate limiting and a nonce-based CSP.",
      "Built the same 9-endpoint API twice, in .NET 8 and in Node.js, so the team could decide on leaving ASP.NET MVC with numbers instead of opinions.",
      "Built the dashboard: daily KPIs, a filterable roster with CSV export, an exceptions panel and a weekly calendar, with unit and integration tests against SQL Server.",
      "Redesigned the MUA portal's landing page and components, now in production. Also got the team using Claude Code, which turned days of UI work into hours.",
    ],
    stack: ["Next.js", "MSSQL", "C# / .NET 8", "Node.js", "IIS", "Stimulsoft"],
  },
  {
    id: "cubestone",
    company: "CubeStone Consulting",
    role: "Software Developer Intern",
    place: "Dar es Salaam",
    period: "Jan to Mar 2026",
    lede:
      "My first codebase with somebody else's money on it. I built a fleet management system on my own: around 40 endpoints in C# with Dapper against SAP HANA, the schema behind them, and the React Native app on top.",
    points: [
      "Assets, drivers, fuel logs, service schedules, work orders, reports.",
      "Bearer-token login plus a per-employee permission table that decides which tabs and report cards each person sees.",
      "Expo app with dashboard analytics, preventative maintenance scheduling and PDF export.",
    ],
    stack: ["C#", "Dapper", "SAP HANA", "React Native", "Expo"],
    href: "https://github.com/kshitij406/FleetManagementApp",
  },
];

export const CLIENTS = [
  {
    name: "Sultan Mauritius",
    what: "Bilingual e-commerce site. Next.js, Prisma, Sanity CMS. Live.",
    href: "https://sultanmauritius.com",
    status: "Shipped",
  },
  {
    name: "Country Materials Limited",
    what: "Corporate site for a Tanzanian construction materials and recycling company. Next.js and Sanity, with an ERP catalogue sync endpoint and the legal pages.",
    href: "https://countrymaterial.com",
    status: "Shipped",
  },
];

export const SMALLER = [
  {
    name: "VendingMachine",
    what: "Tkinter GUI, multithreaded socket server, SQLite, live USD/GBP/INR/MUR conversion.",
    lang: "Python",
    href: "https://github.com/kshitij406/VendingMachine",
  },
  {
    name: "RecordStore",
    what: "Album data scraped in Python, stored as XML, rendered to HTML with XSLT.",
    lang: "XSLT",
    href: "https://github.com/kshitij406/RecordStore",
  },
  {
    name: "Fleet Management API",
    what: "The layered ASP.NET Core API behind the CubeStone app.",
    lang: "C#",
    href: "https://github.com/kshitij406/FleetManagementApi",
  },
  {
    name: "Polymarket weather bot",
    what: "Blends forecast ensembles and only logs a call when it beats the market by ten points.",
    lang: "Python",
    href: "https://github.com/kshitij406/polymarket-weather-bot",
  },
  {
    name: "Platformer",
    what: "A small 2D platformer in Godot, exported to WebAssembly. Plays in the browser.",
    lang: "Godot",
    href: "/games/platformer/Platformer.html",
  },
];

export const RECOGNITION = [
  {
    title: "Finnovate Hackathon 2026",
    result: "Winner",
    detail: "September 2026. 72 hours, FinTech and AI. Team lead of five. Built FraudLens.",
  },
  {
    title: "Build with Gemma",
    result: "Judge's Choice",
    detail: "August 2026. Team lead of five. Built BlueNet: Ocean Watch.",
  },
  {
    title: "Middlesex Speed Coding",
    result: "1st Runner-Up",
    detail: "April 2026. 13 locked problems in Python, each answer opening the next. Nobody got past 6. We got 6.",
  },
  {
    title: "Oracle Academy",
    result: "Certificate",
    detail: "Database Foundations.",
  },
];

export const OFF_CLOCK = [
  {
    title: "Underwater",
    body: "I dive. Growing up on the Tanzanian coast and then living in Mauritius does that. The whole skill is staying calm and breathing slowly.",
  },
  {
    title: "Souls-likes",
    body: "A lot of FromSoftware, and a lot of time in game engines trying to work out why their combat feels the way it does.",
  },
  {
    title: "Fedora, KDE",
    body: "Daily driver, reinstalled more often than necessary. I learn systems by taking them apart.",
  },
  {
    title: "Films",
    body: "Everything I watch gets logged on Letterboxd, because otherwise I forget it.",
  },
];

export const LANGUAGES = "English and Hindi natively. Maithili is my mother tongue.";

export const EDUCATION = [
  {
    school: "University of Kent",
    course: "BSc Computer Science with a Year in Industry",
    period: "2026 to 2029",
    note: "Stage 2 now. Algorithms and Database Systems this autumn, AI and Cyber Security in spring, Web and Software Development in summer. Placement year from July 2027.",
  },
  {
    school: "Middlesex University Mauritius",
    course: "BSc Computer Science (Systems Engineering), Year 1",
    period: "2025 to 2026",
    note: "120 of 120 credits. Grade 1, a First, in every graded module: systems architecture and operating systems, networking, and information in organisations.",
  },
  {
    school: "Middlesex University Mauritius",
    course: "BSc Psychology",
    period: "one year",
    note: "A year studying psychology, also at Middlesex.",
  },
];

export const SKILLS = [
  { group: "Languages", items: ["C#", "TypeScript", "JavaScript", "SQL", "Python", "Go", "Java"] },
  { group: "Backend and data", items: [".NET 8", "ASP.NET MVC", "Node.js", "REST APIs", "SQL Server", "SAP HANA", "Dapper", "Prisma", "SQLite"] },
  { group: "Frontend", items: ["Next.js", "React", "React Native"] },
  { group: "Infrastructure", items: ["Docker", "Azure", "IIS", "Linux", "GitHub Actions", "Tailscale"] },
];

/**
 * The deck. One card per thing worth collecting. Rarity follows real
 * results, not taste: the hackathon winner is the only legendary.
 */
export type Rarity = "legendary" | "epic" | "rare" | "common";

export const CARDS: {
  id: string;
  name: string;
  kind: string;
  rarity: Rarity;
  badge: string;
  year: string;
  art: string;
  line: string;
  stats: [string, string][];
  back: string;
  links?: { label: string; href: string }[];
}[] = [
  {
    id: "fraudlens",
    name: "FraudLens AI",
    kind: "Hackathon build, team lead",
    rarity: "legendary",
    badge: "Winner, Finnovate 2026",
    year: "2026",
    art: "fraudlens",
    line: "Reads a scam in English, French or Kreol and shows you the exact words that gave it away.",
    stats: [["Tests", "631"], ["Precision", "100%"], ["Team", "5"]],
    back: "Led five people over 72 hours. I owned the backend and the Chrome extension. The rules decide the verdict, the AI only reads language, and it still works when the AI is down.",
    links: [
      { label: "fraudlens.site", href: "https://fraudlens.site" },
      { label: "Chrome extension", href: "https://chromewebstore.google.com/detail/ijoefckhnkajhegfegkifedkahdiebdj" },
    ],
  },
  {
    id: "bluenet",
    name: "BlueNet",
    kind: "Hackathon build, team lead",
    rarity: "epic",
    badge: "Judge's Choice, Build with Gemma",
    year: "2026",
    art: "bluenet",
    line: "Spots fishing boats that switch off their trackers, and tells three patrol boats where to look first.",
    stats: [["Sea", "2.3M km²"], ["Patrols", "3"], ["Team", "5"]],
    back: "Code flags suspicious vessel behaviour, then a Gemma agent investigates each one and ranks the cases for the coast guard. I led the team and built the backend.",
  },
  {
    id: "smarterp",
    name: "SmartERP Attendance",
    kind: "Internship, ITL",
    rarity: "epic",
    badge: "In user testing",
    year: "2026",
    art: "smarterp",
    line: "Clock-in data for a whole company, processed for the month before you can blink.",
    stats: [["Punches", "13,487"], ["Run time", "1.5s"], ["Tables", "8"]],
    back: "Built from the schema up in Next.js and SQL Server, in a team of four. Found and fixed an import that was quietly losing one punch in six.",
  },
  {
    id: "sultan",
    name: "Sultan Mauritius",
    kind: "Client work",
    rarity: "rare",
    badge: "Live",
    year: "2026",
    art: "sultan",
    line: "A bilingual online shop for a Mauritian brand, built and launched for a paying client.",
    stats: [["Languages", "2"], ["CMS", "Sanity"], ["Status", "Live"]],
    back: "Next.js, Prisma and Sanity CMS, so the client edits their own products without calling me.",
    links: [{ label: "sultanmauritius.com", href: "https://sultanmauritius.com" }],
  },
  {
    id: "country",
    name: "Country Materials",
    kind: "Client work",
    rarity: "rare",
    badge: "Live",
    year: "2026",
    art: "country",
    line: "The website for a Tanzanian construction materials and recycling company.",
    stats: [["Built in", "Next.js"], ["ERP sync", "Yes"], ["Status", "Live"]],
    back: "Includes an endpoint that keeps the product catalogue in step with the company's ERP, and the legal compliance pages.",
    links: [{ label: "countrymaterial.com", href: "https://countrymaterial.com" }],
  },
  {
    id: "fleet",
    name: "Fleet Manager",
    kind: "Internship, CubeStone",
    rarity: "rare",
    badge: "Solo build",
    year: "2026",
    art: "fleet",
    line: "Every truck, driver, fuel log and repair job for a fleet, on a phone.",
    stats: [["Endpoints", "~40"], ["Built by", "Me"], ["Apps", "2"]],
    back: "A C# API against SAP HANA and the React Native app on top. Bearer-token login and per-person permissions.",
    links: [{ label: "App code", href: "https://github.com/kshitij406/FleetManagementApp" }],
  },
  {
    id: "speed",
    name: "Speed Coding",
    kind: "Competition, pair",
    rarity: "epic",
    badge: "1st Runner-Up",
    year: "2026",
    art: "speed",
    line: "13 locked problems, each answer opening the next. Nobody got past six. We got six.",
    stats: [["Solved", "6 of 13"], ["Best any team", "6"], ["Prize", "Cash"]],
    back: "Middlesex University's speed coding competition, Python, in a team of two.",
  },
  {
    id: "tcp",
    name: "TCP Chat Server",
    kind: "Personal project",
    rarity: "common",
    badge: "Go",
    year: "2026",
    art: "tcp",
    line: "A chat server built from raw sockets to learn how many things can talk at once without tripping over each other.",
    stats: [["Language", "Go"], ["Clients", "Many"], ["Deadlocks", "0 now"]],
    back: "One goroutine per client, shared state behind a mutex, and a clean shutdown across every connection.",
    links: [{ label: "Code", href: "https://github.com/kshitij406/TCP" }],
  },
  {
    id: "platformer",
    name: "Platformer",
    kind: "Personal project, game",
    rarity: "rare",
    badge: "Playable",
    year: "2026",
    art: "platformer",
    line: "A 2D platformer built in Godot and exported to the web. You can play it further down the page.",
    stats: [["Engine", "Godot 4"], ["Runs in", "Browser"], ["Lives", "Few"]],
    back: "Player controller, an enemy, coins, killzones and a game manager tying the run together, exported to WebAssembly so it needs no install.",
    links: [{ label: "Play it", href: "/games/platformer/Platformer.html" }],
  },
  {
    id: "oracle",
    name: "Database Foundations",
    kind: "Certificate",
    rarity: "common",
    badge: "Oracle Academy",
    year: "2026",
    art: "oracle",
    line: "The certificate. The stored procedures came later, and there were a lot of them.",
    stats: [["Issued", "Feb 2026"], ["By", "Oracle"], ["Topic", "SQL"]],
    back: "Oracle Academy Database Foundations.",
  },
];

export const JOURNEY = [
  {
    place: "Dar es Salaam",
    country: "Tanzania",
    title: "Where it started",
    body: "I grew up on the Tanzanian coast, which is where the diving started. Years later I came back for both internships: a fleet system at CubeStone, then the attendance module at ITL.",
  },
  {
    place: "Mauritius",
    country: "Indian Ocean",
    title: "Where it got serious",
    body: "First year of Computer Science at Middlesex, with a First in every graded module. Two hackathon teams, two awards, and my first paying clients.",
  },
  {
    place: "Canterbury",
    country: "United Kingdom",
    title: "Where I am now",
    body: "Second year at the University of Kent. Looking for a 12-month placement from summer 2027.",
  },
];

/**
 * Things you can actually try. `embed` is false where the site sends
 * X-Frame-Options: DENY (checked October 2026); those open a full-page
 * capture instead, with a link to the real thing.
 */
export const DEMOS = [
  {
    id: "fraudlens",
    name: "FraudLens AI",
    what: "Paste a suspicious message and watch it explain itself.",
    url: "https://fraudlens.site",
    shot: "/demos/fraudlens.jpg",
    embed: true,
    tag: "Hackathon winner",
  },
  {
    id: "sultan",
    name: "Sultan Mauritius",
    what: "The bilingual shop I built and launched for a Mauritian drinks brand.",
    url: "https://sultanmauritius.com",
    shot: "/demos/sultan.jpg",
    embed: false,
    tag: "Client site, live",
  },
  {
    id: "country",
    name: "Country Materials",
    what: "Corporate site for a Tanzanian construction materials company.",
    url: "https://countrymaterial.com",
    shot: "/demos/country.jpg",
    embed: true,
    tag: "Client site, live",
  },
];

export const GAME = {
  name: "Platformer",
  what: "A small 2D platformer I made in Godot. Coins, enemies, a knight, and a few ways to fall to your death. It runs right here in the browser.",
  src: "/games/platformer/Platformer.html",
  shot: "/demos/platformer.jpg",
};
