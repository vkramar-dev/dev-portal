import { Link } from "react-router";
import { siteSections } from "../content/siteSections";

export function meta() {
  return [
    { title: "Programming in Depth | .NET Engineering in Detail" },
    { name: "description", content: "Programming in Depth: in-depth .NET research, engineering notes, common pitfalls, guidelines, quizzes and technical discussions." },
  ];
}

export default function Home() {
  return (
    <div className="site-shell home-page">
      <section className="home-intro" aria-labelledby="home-title">
        <h1 id="home-title">.NET Engineering in Detail</h1>
        <p>driven by code</p>
      </section>
      <div className="home-sections" aria-label="Explore Programming in Depth">
        {siteSections.map((section, index) => (
          <section key={section.slug} className={`home-section ${index % 2 ? "right" : "left"}`} aria-labelledby={`home-section-${section.slug}`}>
            <div className="home-section-copy">
              <div className="home-section-kicker">{String(index + 1).padStart(2, "0")} / {section.kicker}</div>
              <h2 id={`home-section-${section.slug}`}><Link to={`/${section.slug}`}>{section.title}</Link></h2>
              <div className="home-section-subtitle">{section.kicker}</div>
              <p>{section.description}</p>
            </div>
            <Link className="home-section-art" to={`/${section.slug}`} tabIndex={-1} aria-hidden="true">
              <span className="home-section-index">{String(index + 1).padStart(2, "0")} / 08</span>
              <span className="home-section-art-symbol">{section.symbol}</span>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
