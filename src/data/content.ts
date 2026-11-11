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
  { label: "Black Reef", href: "https://www.teamblackreef.com", handle: "teamblackreef.com" },
  { label: "GitHub", href: "https://github.com/kshitij406", handle: "kshitij406" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kshitij-jha2006/", handle: "kshitij-jha2006" },
  { label: "Letterboxd", href: "https://letterboxd.com/Kxitiz_/", handle: "Kxitiz_" },
  { label: "Instagram", href: "https://www.instagram.com/kxitiz_", handle: "kxitiz_" },
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

/**
 * Roles, newest first. Points come from the CV; `project` links each role
 * to the case study it produced. `tile` is the background each logo was made
 * for: ITL's is white type, so it needs a dark tile.
 */
export const EXPERIENCE = [
  {
    company: "Black Reef",
    role: "CEO and Co-founder",
    href: "https://www.teamblackreef.com", logo: "/logos/blackreef.svg", tile: "dark",
    place: "Mauritius",
    period: "Oct 2026 to now",
    project: "blackreef",
    lede: "After FraudLens won Finnovate, the five of us kept going and started a software studio. Black Reef builds websites, mobile apps and custom software for businesses, at a price agreed before any work starts.",
    points: [
      "Five co-founders, the same team that built FraudLens. The people on a client's first call are the people who build the product.",
      "Fixed-scope written proposals. The client owns the code, designs, domains and accounts from day one.",
      "Built the company site: Next.js 16, statically prerendered, with one public endpoint for the contact form, validated server-side, rate limited and origin-checked, behind strict security headers.",
    ],
    stack: ["Next.js", "TypeScript", "GSAP", "Vercel"],
  },
  {
    company: "Imatic Technologies",
    role: "Software Developer Intern",
    href: "https://www.itl.co.tz/", logo: "/logos/itl.png", tile: "dark",
    place: "Dar es Salaam",
    period: "Jun to Sep 2026",
    project: "smarterp",
    lede: "I built the attendance module for SmartERP, ITL's ERP product, from the schema up. Next.js on the front, MSSQL stored procedures underneath, deployed under IIS. It's in user acceptance testing now, and ships to ITL's customer companies after that.",
    points: [
      "Multi-company from the session down: every login carries a company ID, every route passes it to the procedures, so one deployment serves several companies.",
      "Attendance processing runs each employee in their own transaction. A full month, 49 people and 13,487 punches, processes in about 1.5 seconds with no failures.",
      "Found why the import was quietly losing about one punch in six: two doors in the same minute looked identical to the unique index. The fix was one column.",
      "Built the same 9-endpoint API twice, in .NET 8 and in Node.js, so the team could decide on leaving ASP.NET MVC with numbers instead of opinions.",
      "Redesigned the MUA portal's landing page and components, now in production. Also got the team using Claude Code, which turned days of UI work into hours.",
    ],
    stack: ["Next.js", "MSSQL", "C# / .NET 8", "Node.js", "IIS", "Stimulsoft"],
  },
  {
    company: "CubeStone Consulting",
    role: "Software Developer Intern",
    href: "https://cubestoneconsulting.com/index.html", logo: "/logos/cubestone.png", tile: "light",
    place: "Dar es Salaam",
    period: "Jan to Mar 2026",
    project: "fleet",
    lede: "My first codebase with somebody else's money on it. I built a fleet management system on my own: around 40 endpoints in C# with Dapper against SAP HANA, the schema behind them, and the React Native app on top.",
    points: [
      "Assets, drivers, fuel logs, service schedules, work orders, reports.",
      "Bearer-token login plus a per-employee permission table that decides which tabs and report cards each person sees.",
      "Expo app with dashboard analytics, preventative maintenance scheduling and PDF export.",
    ],
    stack: ["C#", "Dapper", "SAP HANA", "React Native", "Expo"],
  },
];
