import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Link } from "react-router";

export function PublicationSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id}><h2>{title}</h2>{children}</section>;
}

// Shared C# code highlighting for every publication. Keep it lightweight: our examples
// are small and static, so no third-party syntax-highlighting runtime is needed.
const codeTokenPattern =
  /\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:abstract|as|async|await|bool|break|byte|case|catch|char|class|const|continue|decimal|double|else|enum|extension|false|finally|float|for|foreach|get|if|in|int|interface|internal|is|long|namespace|new|null|object|out|override|private|protected|public|readonly|record|ref|return|sealed|short|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|union|unsafe|using|var|void|while)\b|\b[A-Z][A-Za-z0-9_]*\b|\b\d[\d_]*(?:\.\d[\d_]*)?\b/g;
const xmlTokenPattern = /<!--.*?-->|<\/?[A-Za-z][\w:.-]*|\/?>|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g;

function highlightCodeLine(line: string, language: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let previousEnd = 0;
  const xml = language.toLowerCase() === "xml";
  const tokenPattern = xml ? xmlTokenPattern : codeTokenPattern;

  for (const match of line.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    if (index > previousEnd) parts.push(line.slice(previousEnd, index));

    const token = match[0];
    const color = token.startsWith("//") || token.startsWith("<!--")
      ? "text.secondary"
      : token.startsWith('"') || token.startsWith("'")
        ? "success.main"
        : xml
          ? token.startsWith("<") ? "info.main" : "primary.main"
          : /^\d/.test(token)
            ? "secondary.main"
            : /^[A-Z]/.test(token)
              ? "info.main"
              : "primary.main";

    parts.push(<Box component="span" key={`${index}-${token}`} sx={{ color, fontWeight: 500 }}>{token}</Box>);
    previousEnd = index + token.length;
  }

  if (previousEnd < line.length) parts.push(line.slice(previousEnd));
  return parts;
}

export function CodeExample({ code, language = "C#", title }: { code: string; language?: string; title?: string }) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const lines = code.replace(/\n$/, "").split("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <Box
      sx={{
        my: 2.5,
        border: "1px solid",
        borderColor: "divider",
        borderLeft: "3px solid",
        borderLeftColor: "primary.main",
        borderRadius: 1.5,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.75,
          py: 0.75,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "action.hover",
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
          {title ?? language}
        </Typography>
        <Button
          size="small"
          type="button"
          onClick={() => void copy()}
          aria-label={`Copy ${language} code`}
          sx={{ minWidth: 0, py: 0, px: 0.75, textTransform: "none", fontSize: "0.72rem" }}
        >
          {copyStatus === "copied" ? "Copied" : copyStatus === "failed" ? "Copy failed" : "Copy"}
        </Button>
      </Box>
      <Box sx={{ overflowX: "auto", py: 1.25 }}>
        <Box component="pre" sx={{ "&&": { m: 0, p: 0, bgcolor: "transparent", borderRadius: 0, fontSize: "0.86rem", lineHeight: 1.85, overflow: "visible" } }}>
          <Box component="code" sx={{ display: "block", fontFamily: '"Cascadia Code", Consolas, Monaco, monospace' }}>
            {lines.map((line, index) => (
              <Box component="span" key={index} sx={{ display: "flex", width: "max-content", minWidth: "100%", whiteSpace: "pre", "&:hover": { bgcolor: "action.hover" } }}>
                <Box component="span" sx={{ px: 2 }}>{highlightCodeLine(line, language)}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function PublicationCallout({ title, tone = "note", children }: {
  title: string; tone?: "note" | "warning"; children: ReactNode;
}) {
  return <aside className={`callout ${tone}`}><div className="callout-head">{title}</div><p>{children}</p></aside>;
}

export function PublicationFigure({ caption, note, children }: {
  caption: string; note?: string; children: ReactNode;
}) {
  return <figure className="diagram"><figcaption>{caption}</figcaption>{children}{note && <p className="figure-note">{note}</p>}</figure>;
}

export function PublicationTable({ children }: { children: ReactNode }) {
  return <div className="table-scroll"><table className="pub-table">{children}</table></div>;
}

export interface PublicationLink { title: string; url: string }

export function PublicationReferences({ items }: { items: PublicationLink[] }) {
  if (!items.length) return null;
  return <section className="pub-references" id="references" aria-labelledby="references-title">
    <h2 id="references-title">References</h2>
    <ol>{items.map((item) => <li key={item.url}><a href={item.url} rel="noopener noreferrer" target="_blank">{item.title}</a></li>)}</ol>
  </section>;
}

export function PublicationRelated({ title = "Related publications", description, links }: {
  title?: string; description?: string; links: { title: string; to: string }[];
}) {
  if (!links.length) return null;
  return <section className="pub-related" aria-label="Related publications">
    <div className="related-top">KEEP EXPLORING</div>
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    <ul>{links.map((link) => <li key={link.to}><Link to={link.to}>{link.title} ↗</Link></li>)}</ul>
  </section>;
}
