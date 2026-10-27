import { Link } from "react-router";
import { publishedArticles, siteSections } from "../content/siteSections";
import type { SiteSection } from "../content/siteSections";

interface Props { slug: SiteSection["slug"] }

export default function SectionLanding({ slug }: Props) {
  const section = siteSections.find((item) => item.slug === slug);
  if (!section) return null;
  return (
    <div className="site-shell section-landing">
      <div className="section-landing-header">
        <div className="section-landing-kicker">Programming in Depth / {section.kicker}</div>
        <h1>{section.title}</h1>
        <p>{section.description}</p>
      </div>
      {slug === "articles" ? (
        <section aria-label="Published articles" className="section-landing-content">
          <h2>Published research</h2>
          {publishedArticles.map((item) => (
            <article key={item.url} className="article-list-item">
              <span>{item.category}</span>
              <h3><Link to={item.url}>{item.title}</Link></h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </section>
      ) : slug === "about" ? (
        <section className="section-landing-content">
          <h2>Our approach</h2>
          <p>Programming in Depth is an independent engineering publication with a focus on .NET and related technologies. We value evidence, reproducible experiments and careful evaluation of trade-offs over oversimplified rules.</p>
        </section>
      ) : (
        <section className="section-landing-content">
          <h2>Coming soon</h2>
          <p>Materials in this section are in preparation. Explore our <Link to="/articles">published research</Link> in the meantime.</p>
          {slug === "quiz" && <p>When quizzes become available, they will be accessible without registration.</p>}
        </section>
      )}
    </div>
  );
}
