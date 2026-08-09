/**
 * The CV, as data rather than a binary.
 *
 * The PDF used to be a committed file. It carried a phone number, which meant
 * the only way to change it was to regenerate from LaTeX and commit a new blob
 * into a public repo. This is the source of truth now: /resume renders it on
 * request, so editing the CV is editing this file.
 *
 * Rule for this file: nothing here that I would not put on a billboard. No
 * phone number, no street address. Email, GitHub and LinkedIn only.
 */

export const RESUME_CONTACT = {
  name: "Kshitij Jha",
  email: "kshitij.j615@gmail.com",
  github: "github.com/kshitij406",
  linkedin: "linkedin.com/in/kshitij-jha2006",
  location: "Canterbury, UK",
  relocating: "Available for a 12-month placement from July 2027",
};

export const RESUME_SUMMARY =
  "Computer Science student at the University of Kent seeking a 12-month industry placement for 2027-28. Two software development internships delivering REST APIs in C#/.NET 8 and Node.js, Next.js frontends, and MSSQL data layers. Student visa holder from September 2026, eligible for full-time employment during the assessed placement year.";

export const RESUME_EXPERIENCE = [
  {
    org: "Imatic Technologies Limited (ITL)",
    role: "Software Developer Intern (Dar es Salaam, Tanzania)",
    period: "June 2026 - Present",
    points: [
      "Built 9 REST endpoints across 6 resources in C#/.NET 8, then rebuilt the same API in Node.js so the team could compare stacks when evaluating a migration off ASP.NET MVC",
      "Developed the Next.js prototype consuming these services, including a proxy layer and role-conditional routing",
      "Wrote MSSQL stored procedures handling multi-mode read and write paths against a 7-table schema, working in SSMS with SQL Server running in Docker",
      "Delivered a Stimulsoft Reports.JS proof of concept by reverse-engineering undocumented integration patterns, informing a stakeholder decision affecting 300+ Crystal Reports",
    ],
  },
  {
    org: "CubeStone Consulting",
    role: "Software Developer Intern",
    period: "January 2026 - March 2026",
    points: [
      "Built a Fleet Management REST API solo in C#/.NET 8, using Dapper for data access against a SAP HANA database and authoring the supporting table schema",
      "Developed a React Native client consuming the API end to end",
    ],
  },
];

export const RESUME_EDUCATION = [
  {
    org: "University of Kent, Canterbury",
    role: "BSc Computer Science (Hons) with a Year in Industry",
    period: "September 2026 - 2029",
    points: [
      "Entering at stage 2 on direct second-year entry. Placement year 2027-28, available for a 12-month contract from July 2027",
      "Kent International Scholarship holder",
    ],
  },
  {
    org: "Middlesex University Mauritius",
    role: "Certificate of Higher Education",
    period: "2025 - 2026",
    points: [
      "The qualification carrying the direct second-year entry to Kent",
    ],
  },
];

export const RESUME_PROJECTS = [
  {
    org: "Concurrent TCP Chat Server",
    role: "github.com/kshitij406/TCP",
    period: "Go",
    points: [
      "Built a multi-client chat server implementing per-client goroutines, mutex-guarded shared state, and coordinated shutdown",
      "Diagnosed and fixed deadlocks, concurrent map access races, and WaitGroup misuse by reasoning through the synchronisation model",
    ],
  },
  {
    org: "VendingMachine",
    role: "github.com/kshitij406/VendingMachine",
    period: "Python",
    points: [
      "Built a full-stack simulation with a Tkinter GUI and a multithreaded TCP socket server over SQLite persistence",
      "Implemented live four-currency conversion (USD, GBP, INR, MUR) and sales analytics visualised with matplotlib",
    ],
  },
  {
    org: "Metals CFD Trading Bot",
    role: "github.com/kshitij406/capital-bot",
    period: "Python",
    points: [
      "Automated a live trading system on the Capital.com API, scheduled on GitHub Actions at a 15-minute cadence with encrypted secrets, failure alerting, and Discord monitoring",
      "Ran a pre-registered strategy investigation across EMA, ATR and RSI mechanisms on three instruments, applying stopping criteria fixed in advance to avoid overfitting",
    ],
  },
];

export const RESUME_SKILLS = [
  { group: "Languages", items: "C#, Go, Python, JavaScript, TypeScript, SQL" },
  { group: "Frameworks", items: ".NET 8, ASP.NET MVC, React, Next.js, React Native, Dapper" },
  { group: "Databases", items: "MSSQL (SSMS), SAP HANA, SQLite" },
  { group: "Tools", items: "Git, GitHub Actions (CI/CD), Docker, Vercel, Linux (Fedora)" },
];

export const RESUME_AWARDS = [
  "MDX Speed Coding Competition 2026: 1st Runner-Up, 50+ competitors from multiple universities",
  "Oracle Academy Database Foundations Certificate",
];
