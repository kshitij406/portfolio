/**
 * Everything here comes off the CV or is something I actually did.
 * No ratings, no reviews, no invented numbers.
 */

export const EXPERIENCE = [
  {
    company: "Imatic Technologies Limited",
    role: "Software Developer Intern",
    location: "Dar es Salaam, Tanzania (on site)",
    period: "Jun 2026 to now",
    current: true,
    // The thing that actually mattered about the job.
    lede:
      "I was hired to build one API. I ended up building it twice, in two different stacks, so the team could argue about a migration using numbers instead of opinions.",
    points: [
      "Built 9 REST endpoints across 6 resources in C#/.NET 8, then rebuilt the same API in Node.js so the team could compare the two while deciding whether to move off ASP.NET MVC.",
      "Developed the Next.js prototype that consumes both services, including a proxy layer and role conditional routing.",
      "Wrote MSSQL stored procedures handling multi mode read and write paths against a 7 table schema, working in SSMS with SQL Server running in Docker.",
      "Delivered a Stimulsoft Reports.JS proof of concept by reverse engineering integration patterns nobody had documented. The write up fed a stakeholder decision affecting 300+ Crystal Reports.",
    ],
    stack: ["C#/.NET 8", "Node.js", "Next.js", "MSSQL", "Stimulsoft", "Docker"],
  },
  {
    company: "CubeStone Consulting",
    role: "Software Developer Intern",
    location: "Dar es Salaam, Tanzania",
    period: "Jan 2026 to Mar 2026",
    current: false,
    lede:
      "My first real codebase with someone else's money on it. Solo build, front to back, and I wrote the schema too.",
    points: [
      "Built a Fleet Management REST API on my own in C#/.NET 8, using Dapper for data access against SAP HANA, and authored the supporting table schema.",
      "Developed a React Native client that consumes the API end to end.",
    ],
    stack: ["C#/.NET 8", "SAP HANA", "Dapper", "React Native"],
  },
];

export const EDUCATION = [
  {
    school: "University of Kent, Canterbury",
    qualification: "BSc Computer Science (Hons) with a Year in Industry",
    period: "Sept 2026 to 2029",
    note: "Starting at stage 2 on direct second-year entry, off the Mauritius certificate. Kent International Scholarship holder. Placement year runs 2027 to 28, so I am free for a 12 month contract from July 2027.",
  },
  {
    school: "Middlesex University Mauritius",
    qualification: "Certificate of Higher Education",
    period: "2025 to 2026",
    note: "The qualification that carried the direct second-year entry to Kent.",
  },
];

/**
 * Ordered by depth of ownership, not by how impressive the README sounds.
 * Whatever sits at the top is what gets asked about in an interview, so the
 * top of this list is the code I can defend line by line. The weekend and
 * team builds are further down and described as what they are.
 */
export const PROJECTS = [
  {
    name: "Concurrent TCP Chat Server",
    lang: "Go",
    year: "2026",
    href: "https://github.com/kshitij406/TCP",
    live: null,
    slug: null,
    // No shot: this has no interface. It carries ConcurrencyDiagram instead.
    // See the PROJECT_DIAGRAM note in Built.tsx.
    shot: null,
    badge: null,
    tier: "deep",
    why: "I wanted to actually understand concurrency instead of trusting the runtime to sort it out for me.",
    what: "Raw TCP, no framework. A listener hands each connection to its own goroutine, a shared register maps connections to users, and a mutex guards that register because several goroutines write to it at once. I got failures out of it: deadlocks, a concurrent map access race, WaitGroup misuse. I found each one by reasoning through the synchronisation model instead of adding sleeps until the crashing stopped. It's the smallest project on this list and the one that taught me the most.",
    stack: ["Go", "net", "goroutines", "sync.Mutex", "WaitGroup"],
  },
  {
    name: "Metals CFD Trading Bot",
    lang: "Python",
    year: "2026",
    href: "https://github.com/kshitij406/capital.com-metal-trading-bot",
    live: null,
    slug: null,
    shot: null,
    badge: null,
    tier: "deep",
    why: "I wanted to know whether the strategies people post online survive contact with live data. Mostly they do not, and I wanted that answer from my own logs rather than somebody's screenshot.",
    what: "Gold, silver and copper CFDs on the Capital.com API. EMA 9/21 crossover with RSI(14) confirmation, ATR(14) for stop sizing, a 1.5x ATR stop against a 3x ATR target, 1% account risk per trade, one open position per instrument. I fixed the stopping criteria in advance so I could not move them once it started losing. The lesson that stuck was infrastructural: GitHub Actions' built in cron was unreliable across a two hour test window, so the schedule now comes from an external trigger and the workflow listens.",
    stack: ["Python", "Capital.com API", "SQLite", "GitHub Actions", "Discord"],
  },
  {
    name: "VendingMachine",
    lang: "Python",
    year: "2025",
    href: "https://github.com/kshitij406/VendingMachine",
    live: null,
    slug: null,
    shot: null,
    badge: null,
    tier: "deep",
    why: "A university brief I refused to keep small.",
    what: "A Tkinter GUI talking to a multithreaded TCP socket server over SQLite. The brief asked for none of that. I added live currency conversion across USD, GBP, INR and MUR, plus sales analytics in matplotlib. It was the first time I had two processes that needed to agree with each other, which is a specific and annoying kind of problem.",
    stack: ["Python", "Tkinter", "SQLite", "sockets", "matplotlib"],
  },
  {
    name: "Seraphim Records",
    lang: "JS / XSLT",
    year: "2025",
    href: "https://github.com/kshitij406/RecordStore",
    live: "https://recordstore-nine.vercel.app",
    slug: "seraphim-records",
    shot: "/resources/proj-seraphim.jpg",
    badge: null,
    tier: "deep",
    why: "An excuse to use XML and XSLT instead of treating them as legacy trivia, and to find out how messy real music metadata is. It is messy.",
    what: "A record store front end where the album data gets scraped in Python from music APIs, structured as XML, then transformed into HTML with XSLT. The transformation layer does the job frameworks hide from you, which was the whole reason I built it that way.",
    stack: ["HTML/CSS", "JavaScript", "Python", "XML", "XSLT"],
  },
  {
    name: "NitiLens",
    lang: "TypeScript / Python",
    year: "2026",
    href: "https://github.com/kshitij406/NItiLens",
    live: "https://niti-lens.vercel.app",
    slug: "niti-lens",
    shot: "/resources/proj-nitilens.jpg",
    badge: "DayZero 2.0, CodeNex SRMIST",
    tier: "sprint",
    why: "Hackathon, team of four, built against the clock. The idea was to push a policy through the perspectives of the people it lands on instead of the people who debate it.",
    what: "A four stage pipeline sitting on top of an LLM. A classifier, then four specialist agents reading risk through a fiscal, labour, equity and regional lens, then up to 50 synthetic personas grounded in NSSO and Census 2011 demographics, then a coordinator that pulls the disagreements into one briefing. Most of the engineering is orchestration and prompt design rather than novel modelling. The hard part was batching the persona calls so the thing returned inside a demo slot. We sanity checked it against MGNREGA, which has twenty years of published outcomes to check against.",
    stack: ["Next.js", "FastAPI", "LLM agents", "Vercel", "Render"],
  },
  {
    name: "Polymarket Weather Bot",
    lang: "Python",
    year: "2026",
    href: "https://github.com/kshitij406/polymarket-weather-bot",
    live: null,
    slug: null,
    shot: null,
    badge: null,
    tier: "sprint",
    why: "An experiment in whether a prediction market prices weather badly, and an excuse to read about forecast verification, which I knew nothing about going in.",
    what: "It blends ECMWF, GFS and UKMO ensembles with two deterministic providers into a single distribution, adds a climatological prior weighted by how far out the forecast is, and only logs a prediction when its edge over the market clears ten points. Everything resolves against historical records and scores itself on win rate, ROI and calibration. It is still running. The honest verdict is that the sample is nowhere near big enough to claim an edge.",
    stack: ["Python", "Open-Meteo", "SQLite", "GitHub Actions", "Polymarket API"],
  },
  {
    name: "Halo Student Drives",
    lang: "TypeScript",
    year: "2025",
    href: "https://github.com/kshitij406/Halo_student_drives",
    live: "https://halo-student-drives.vercel.app",
    slug: "halo-student-drives",
    shot: "/resources/proj-halo.jpg",
    badge: null,
    tier: "sprint",
    why: "Campus transport was expensive and students were already driving the same routes anyway. The hard part was trust, not the software.",
    what: "A ride sharing platform pairing verified student drivers with riders. Driver verification, a dashboard with listings and analytics, route filtering, ratings, all on Firebase Auth, Firestore and Storage. Built with Harshil Patel and shipped to a live campus audience.",
    stack: ["Next.js", "TypeScript", "Firebase", "Tailwind", "Vercel"],
  },
  {
    name: "Platformer",
    lang: "GDScript",
    year: "2026",
    href: null,
    live: "/games/platformer/Platformer.html",
    slug: "platformer",
    shot: null,
    badge: null,
    tier: "sprint",
    // TODO: replace with your own line, this is a placeholder rather than
    // an invented motivation.
    why: "An excuse to learn Godot outside a browser tab, in an engine built for exactly this.",
    what: "A small 2D platformer in Godot 4.7: a player controller, an enemy, collectible coins, killzones, and a game manager tying the run together. Exported to WebAssembly, so it runs in the browser with no engine install.",
    stack: ["Godot 4.7", "GDScript", "WebAssembly"],
  },
];

export const STACK = [
  {
    group: "Languages",
    items: ["C#", "Go", "Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    group: "Frameworks",
    items: [".NET 8", "ASP.NET MVC", "React", "Next.js", "React Native", "FastAPI", "Dapper"],
  },
  {
    group: "Data",
    items: ["MSSQL / SSMS", "SAP HANA", "SQLite", "Stimulsoft", "Crystal Reports"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub Actions", "Docker", "Vercel", "Linux (Fedora)"],
  },
];

export const AWARDS = [
  {
    title: "MDX Speed Coding Competition 2026",
    place: "1st Runner-Up",
    detail: "50+ competitors across several universities.",
  },
  {
    title: "Kent International Scholarship",
    place: "Holder",
    detail: "Awarded for entry to the University of Kent.",
  },
  {
    title: "Oracle Academy",
    place: "Certificate",
    detail: "Database Foundations.",
  },
];

/**
 * The personal section. The rule I set myself: only things that are true and
 * specific. A generic interest is worse than no interest at all.
 */
export const OFF_CLOCK = [
  {
    heading: "Underwater",
    body: "I dive. Growing up on the Tanzanian coast and then living in Mauritius will do that to you. It is the only hobby I have where the entire skill is staying calm and breathing slowly, which turns out to be useful counter programming for a job spent staring at a screen.",
    effect: "flood",
  },
  {
    heading: "Souls-likes, and building them",
    body: "I play a lot of FromSoftware games, and I have spent a fair amount of time in Unity trying to work out why their combat feels the way it does. Mostly it comes down to animation cancel windows and having the confidence to let the player lose.",
    effect: "bonfire",
  },
  {
    heading: "Fedora, KDE Plasma",
    body: "Daily driver. I have reinstalled it more times than necessary. The tinkering is the point. I learn systems by taking them apart, which is the same instinct that makes me want to read the stored procedure instead of the ORM.",
    effect: "reinstall",
  },
  {
    heading: "Robots that don't exist yet",
    body: "Poking at ROS2, MoveIt and Gazebo. Nothing shipped. Simulation is a forgiving place to be bad at something.",
    effect: "estop",
  },
  {
    heading: "Films",
    body: "I log what I watch, as a memory aid. I forget films otherwise, and I would rather point at the list than claim a taste I cannot back up.",
    link: { label: "Letterboxd", href: "https://boxd.it/4m4al" },
    effect: "letterbox",
  },
  {
    heading: "Philosophy and music",
    body: "Reading, mostly ethics and philosophy of mind, mostly badly. Music constantly. It is the one thing I never put in the background of nothing.",
    link: { label: "Spotify", href: "https://open.spotify.com/user/hsx31s71xqu746xsvlsefz42a?si=H46zkSoqQaKD7otF-15QQA&utm_source=copy-link" },
    effect: "waveform",
  },
];

export type TileEffectKind = "flood" | "bonfire" | "reinstall" | "estop" | "letterbox" | "waveform";

/**
 * The facts strip. This replaced a band of counted numbers, because a number
 * set large invites an interviewer to test it, and endpoint counts are a task
 * list rather than an achievement. What sits here instead is the information a
 * recruiter actually needs and cannot get anywhere else on the page. Availability
 * itself lives only in the Status section, not here.
 */
export const FACTS = [
  {
    label: "Based",
    value: "Canterbury, UK",
    sub: "",
  },
  {
    label: "Currently",
    value: "Software Developer Intern",
    sub: "Imatic Technologies Limited",
  },
  {
    label: "Reading",
    value: "BSc Computer Science with a Year in Industry",
    sub: "University of Kent, stage 2",
  },
];
