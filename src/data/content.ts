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
];

export const SKILLS = [
  { group: "Languages", items: ["C#", "TypeScript", "JavaScript", "SQL", "Python", "Go", "Java"] },
  { group: "Backend and data", items: [".NET 8", "ASP.NET MVC", "Node.js", "REST APIs", "SQL Server", "SAP HANA", "Dapper", "Prisma", "SQLite"] },
  { group: "Frontend", items: ["Next.js", "React", "React Native"] },
  { group: "Infrastructure", items: ["Docker", "Azure", "IIS", "Linux", "GitHub Actions", "Tailscale"] },
];
