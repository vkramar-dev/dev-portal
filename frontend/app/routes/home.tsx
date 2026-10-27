import { Link } from "react-router";
import {
  articlesCopy,
  eventsCopy,
  guidelinesCopy,
  notesCopy,
  pitfallsCopy,
  publicationCopy,
  quizCopy,
  videosCopy,
} from "../content";

interface NoteLine {
  key: string;
  value: string;
}

interface BandModel {
  coord: string;
  side: "left" | "right";
  title: string;
  href?:
    | "/articles"
    | "/notes"
    | "/common-pitfalls"
    | "/guidelines"
    | "/quiz"
    | "/videos"
    | "/events";
  copy: string;
  notes: readonly NoteLine[];
}

const bands: readonly BandModel[] = [
  {
    coord: "A1",
    side: "left",
    title: "Programming in Depth",
    copy: publicationCopy,
    notes: [
      { key: "SUBJECT", value: ".NET and architecture" },
      { key: "READER", value: "Practitioners" },
      { key: "FORM", value: "Publication" },
    ],
  },
  {
    coord: "B1",
    side: "right",
    title: "Articles",
    href: "/articles",
    copy: articlesCopy,
    notes: [
      { key: "LENGTH", value: "Long form" },
      { key: "UNIT", value: "One mechanism" },
      { key: "STATUS", value: "One essay live" },
    ],
  },
  {
    coord: "A2",
    side: "left",
    title: "Notes",
    href: "/notes",
    copy: notesCopy,
    notes: [
      { key: "LENGTH", value: "Short" },
      { key: "UNIT", value: "One detail" },
      { key: "STATUS", value: "None published" },
    ],
  },
  {
    coord: "B2",
    side: "right",
    title: "Common Pitfalls",
    href: "/common-pitfalls",
    copy: pitfallsCopy,
    notes: [
      { key: "SUBJECT", value: "Failure modes" },
      { key: "TEST", value: "Review misses them" },
      { key: "STATUS", value: "None published" },
    ],
  },
  {
    coord: "A3",
    side: "left",
    title: "Guidelines",
    href: "/guidelines",
    copy: guidelinesCopy,
    notes: [
      { key: "FORM", value: "Preference plus exception" },
      { key: "USE", value: "Codebase decisions" },
      { key: "STATUS", value: "None published" },
    ],
  },
  {
    coord: "B3",
    side: "right",
    title: "Quiz",
    href: "/quiz",
    copy: quizCopy,
    notes: [
      { key: "ACCESS", value: "Public" },
      { key: "ACCOUNT", value: "Not required" },
      { key: "STATUS", value: "One preview question" },
    ],
  },
  {
    coord: "A4",
    side: "left",
    title: "Videos",
    href: "/videos",
    copy: videosCopy,
    notes: [
      { key: "FORM", value: "Walkthrough" },
      { key: "TIE", value: "Written piece when one exists" },
      { key: "STATUS", value: "None published" },
    ],
  },
  {
    coord: "B4",
    side: "right",
    title: "Events",
    href: "/events",
    copy: eventsCopy,
    notes: [
      { key: "FORM", value: "Live session" },
      { key: "WHEN", value: "Only with a date" },
      { key: "STATUS", value: "Nothing scheduled" },
    ],
  },
];

function Band({ band }: { band: BandModel }) {
  return (
    <section className={`band band-${band.side}`} aria-labelledby={`band-${band.coord}`}>
      <span className="reg-plus" aria-hidden="true" />
      <p className="coord">{band.coord}</p>
      <div className="band-copy">
        {band.href ? (
          <h2 id={`band-${band.coord}`}>
            <Link to={band.href}>{band.title}</Link>
          </h2>
        ) : (
          <h1 id={`band-${band.coord}`}>{band.title}</h1>
        )}
        <p>{band.copy}</p>
      </div>
      <dl className="anno">
        {band.notes.map((note) => (
          <div key={note.key}>
            <dt>{note.key}</dt>
            <span className="slash" aria-hidden="true">
              /
            </span>
            <dd>{note.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function meta() {
  return [{ title: "Programming in Depth" }];
}

export default function Home() {
  return (
    <>
      {bands.map((band) => (
        <Band key={band.coord} band={band} />
      ))}
    </>
  );
}
