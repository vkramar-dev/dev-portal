import { Link } from "react-router";
import { visiblePublications } from "../content/publications";

const topics = [
  ".NET Runtime",
  "C#",
  "ASP.NET Core",
  "Entity Framework",
  "SQL Server",
  "Performance",
  "Concurrency",
  "Security",
  "Architecture",
  "ADO.NET",
  "Scalability",
  "Debugging",
  "JS",
  "React",
] as const;

export function meta() {
  return [
    { title: "Programming in Depth | .NET Engineering in Detail" },
    {
      name: "description",
      content:
        "Engineering behind real-world .NET applications: CLR, ASP.NET Core, EF Core, SQL Server, software architecture, performance and security.",
    },
  ];
}

function ResearchIcon() {
  return (
    <span className="home-research-art" aria-hidden="true">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 18 10 32l14 14" />
        <path d="m40 18 14 14-14 14" />
        <path d="m37 14-10 36" />
      </svg>
    </span>
  );
}

export default function Home() {
  const latestResearch = visiblePublications("article")
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 3);

  return (
    <div className="site-shell home-page">
      <section className="home-intro" aria-labelledby="home-title">
        <h1 id="home-title">.NET Engineering in Detail</h1>
        <p>DRIVEN BY CODE</p>
      </section>

      <section className="home-description" aria-label="About Programming in Depth">
        <p>
          The .NET platform offers the tools to build exceptional software. Understanding its
          internals, capabilities, and limitations is what allows us to turn that potential into
          real engineering advantages.
        </p>
        <p>
          Technical investigations, experiments, and discussions about architecture, performance,
          concurrency, security, and engineering trade-offs.
        </p>
      </section>

      <section className="home-research" aria-label="Latest research">
        <div className="home-section-heading">
          <Link to="/articles" className="home-section-all-link">
            All articles <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="home-research-list">
          {latestResearch.map((article) => (
            <article className="home-research-item" key={article.url}>
              <ResearchIcon />
              <div className="home-research-copy">
                <div className="home-research-category">{article.category}</div>
                <h3>
                  <Link to={article.url}>{article.title}</Link>
                </h3>
                <p>{article.summary}</p>
                <Link to={article.url} className="home-read-link">
                  Read article <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-topics" aria-labelledby="home-topics-title">
        <div className="home-section-heading">
          <h2 id="home-topics-title">Tags</h2>
        </div>
        <ul className="home-topic-list" aria-label="Engineering topics covered by PinD">
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
