import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface TocItem {
  id: string;
  label: string;
  /** Optional nesting for H3 subsections; existing TOCs remain valid. */
  level?: 2 | 3;
}

export function PublicationToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map(({ id }) => ({ id, element: document.getElementById(id) }))
      .filter((target): target is { id: string; element: HTMLElement } => target.element !== null);
    if (!targets.length) return;

    let frame = 0;
    const updateActive = () => {
      frame = 0;
      // Consider a heading active after it reaches the upper reading area.
      // This also works for H2/H3 headings not wrapped in <section>.
      const cutoff = Math.min(150, window.innerHeight * 0.25);
      let current = targets[0].id;
      for (const { id, element } of targets) {
        if (element.getBoundingClientRect().top > cutoff) break;
        current = id;
      }
      // The last section may not be able to scroll all the way to the top.
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        current = targets[targets.length - 1].id;
      }
      setActiveId((previous) => previous === current ? previous : current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <aside className="pub-sidebar">
      <nav className="toc" aria-label="On this page">
        <div className="toc-label">ON THIS PAGE</div>
        <div className="toc-links">
          {items.map((item) => (
            <a
              className={`toc-link${item.level === 3 ? " toc-link--subsection" : ""}${item.id === activeId ? " toc-link--active" : ""}`}
              href={`#${item.id}`}
              key={item.id}
              aria-current={item.id === activeId ? "location" : undefined}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="toc-bottom">Reading mode<br /><span>Comfortable · Focused</span></div>
      </nav>
    </aside>
  );
}

export default function PublicationBody({ children, toc }: { children: ReactNode; toc?: TocItem[] }) {
  return (
    <div className={`pub-grid${toc?.length ? "" : " pub-grid--full"}`}>
      <div className="pub-content">{children}</div>
      {toc?.length ? <PublicationToc items={toc} /> : null}
    </div>
  );
}
