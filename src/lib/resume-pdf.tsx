/**
 * The CV, rendered to PDF from `src/data/resume.ts`.
 *
 * Deliberately does not look like the website. A CV gets read by recruiters,
 * ATS parsers and print, so it stays a plain single-column document with real
 * selectable text. Only the built-in Helvetica family is used, which means no
 * font fetch at render time and no network dependency in the route.
 */

import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  RESUME_CONTACT,
  RESUME_SUMMARY,
  RESUME_EXPERIENCE,
  RESUME_EDUCATION,
  RESUME_PROJECTS,
  RESUME_SKILLS,
  RESUME_AWARDS,
} from "@/data/resume";

const INK = "#16130f";
const MUTED = "#4a453d";

const s = StyleSheet.create({
  /* Sized to land on a single page. A one page CV was the brief the original
     LaTeX version met, and a student CV spilling onto a second sheet reads as
     padding. If content grows, tighten here before adding a page. */
  page: {
    paddingTop: 32,
    paddingBottom: 30,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    fontSize: 8.8,
    lineHeight: 1.32,
    color: INK,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 17,
    textAlign: "center",
    letterSpacing: 0.4,
  },
  contact: {
    fontSize: 8,
    textAlign: "center",
    color: MUTED,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.6,
    letterSpacing: 1.1,
    marginTop: 10,
    marginBottom: 3,
  },
  rule: {
    borderBottomWidth: 0.7,
    borderBottomColor: INK,
    marginBottom: 5,
  },
  entryHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  org: { fontFamily: "Helvetica-Bold", fontSize: 9.4 },
  period: { fontSize: 8, color: MUTED },
  role: { fontSize: 8.4, fontStyle: "italic", color: MUTED, marginBottom: 2 },
  entry: { marginBottom: 6 },
  bulletRow: { flexDirection: "row", marginBottom: 1.5, paddingRight: 4 },
  bulletDot: { width: 8, fontSize: 8.8 },
  bulletText: { flex: 1, textAlign: "justify" },
  skillRow: { flexDirection: "row", marginBottom: 1.5 },
  skillGroup: { fontFamily: "Helvetica-Bold", width: 62 },
  link: { color: INK, textDecoration: "none" },
});

function Bullet({ children }: { children: string }) {
  return (
    <View style={s.bulletRow}>
      <Text style={s.bulletDot}>•</Text>
      <Text style={s.bulletText}>{children}</Text>
    </View>
  );
}

type Entry = {
  org: string;
  role: string;
  period: string;
  points: string[];
};

function Section({ title, entries }: { title: string; entries: Entry[] }) {
  return (
    <>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.rule} />
      {entries.map((e) => (
        <View key={e.org} style={s.entry} wrap={false}>
          <View style={s.entryHead}>
            <Text style={s.org}>{e.org}</Text>
            <Text style={s.period}>{e.period}</Text>
          </View>
          <Text style={s.role}>{e.role}</Text>
          {e.points.map((p) => (
            <Bullet key={p}>{p}</Bullet>
          ))}
        </View>
      ))}
    </>
  );
}

export function ResumeDocument() {
  const c = RESUME_CONTACT;

  return (
    <Document
      title={`${c.name} CV`}
      author={c.name}
      subject="Curriculum Vitae"
      creator="kshitijjha.dev"
      producer="kshitijjha.dev"
    >
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{c.name}</Text>
        <Text style={s.contact}>
          <Link src={`mailto:${c.email}`} style={s.link}>
            {c.email}
          </Link>
          {"  ·  "}
          <Link src={`https://${c.github}`} style={s.link}>
            {c.github}
          </Link>
          {"  ·  "}
          <Link src={`https://${c.linkedin}`} style={s.link}>
            {c.linkedin}
          </Link>
        </Text>
        <Text style={s.contact}>
          {c.location} · {c.relocating}
        </Text>

        <Text style={s.sectionTitle}>SUMMARY</Text>
        <View style={s.rule} />
        <Text style={{ textAlign: "justify" }}>{RESUME_SUMMARY}</Text>

        <Section title="EXPERIENCE" entries={RESUME_EXPERIENCE} />
        <Section title="EDUCATION" entries={RESUME_EDUCATION} />
        <Section title="PROJECTS" entries={RESUME_PROJECTS} />

        <Text style={s.sectionTitle}>SKILLS</Text>
        <View style={s.rule} />
        {RESUME_SKILLS.map((g) => (
          <View key={g.group} style={s.skillRow}>
            <Text style={s.skillGroup}>{g.group}:</Text>
            <Text style={{ flex: 1 }}>{g.items}</Text>
          </View>
        ))}

        <Text style={s.sectionTitle}>AWARDS</Text>
        <View style={s.rule} />
        {RESUME_AWARDS.map((a) => (
          <Bullet key={a}>{a}</Bullet>
        ))}
      </Page>
    </Document>
  );
}
