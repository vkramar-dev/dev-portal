import type { ReactNode } from "react";
import { Box, Chip, Container, Divider, Link as MuiLink, Stack, Typography } from "@mui/material";
import { Link } from "react-router";

interface ArticleLink {
  title: string;
  url: string;
}

interface ArticleLayoutProps {
  title: string;
  category: string;
  publishedAt: string;
  summary?: string;
  references?: ArticleLink[];
  children: ReactNode;
}

export default function ArticleLayout({
  title,
  category,
  publishedAt,
  summary,
  references,
  children,
}: ArticleLayoutProps) {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${publishedAt}T00:00:00Z`));

  return (
    <Container component="article" maxWidth="md" sx={{ py: 5 }}>
      <Box component="header" sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
          <Chip label={category} size="small" color="primary" />

          <Typography component="span" variant="body2" color="text.secondary">
            Published: <time dateTime={publishedAt}>{formattedDate}</time>
          </Typography>
        </Stack>

        <Typography component="h1" variant="h3" gutterBottom>
          {title}
        </Typography>

        {summary && (
          <Typography component="p" variant="subtitle1" color="text.secondary">
            {summary}
          </Typography>
        )}
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box
        component="section"
        aria-label="Article content"
        sx={{
          "& p": {
            lineHeight: 1.8,
          },
          "& pre": {
            overflowX: "auto",
            p: 2,
            borderRadius: 1,
            bgcolor: "action.hover",
            lineHeight: 1.6,
          },
          "& code": {
            fontFamily: "monospace",
          },
        }}
      >
        {children}
      </Box>

      {references && references.length > 0 && (
        <Box component="section" aria-label="References" sx={{ mt: 5 }}>
          <Divider sx={{ mb: 3 }} />

          <Typography component="h2" variant="h6" gutterBottom>
            References
          </Typography>

          <Box component="ul">
            {references.map((reference) => (
              <li key={reference.url}>
                <MuiLink href={reference.url}>{reference.title}</MuiLink>
              </li>
            ))}
          </Box>
        </Box>
      )}

      <Box component="footer" sx={{ mt: 5 }}>
        <MuiLink component={Link} to="/">
          Back to Home
        </MuiLink>
      </Box>
    </Container>
  );
}
