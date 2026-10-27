import { Typography } from "@mui/material";
import ArticleLayout from "../../components/ArticleLayout";

export function meta() {
  return [
    {
      title: "How .NET Stores Strings | Programming in Depth",
    },
    {
      name: "description",
      content:
        "Explore how .NET strings use UTF-16, how Length works, and why strings are immutable.",
    },
  ];
}

const references = [
  {
    title: "Microsoft Learn — System.String",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.string",
  },
  {
    title: "Microsoft Learn — String.Length",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.string.length",
  },
];

export default function DotNetStrings() {
  return (
    <ArticleLayout
      title="How .NET Stores Strings"
      category=".NET"
      publishedAt="2026-10-23"
      summary="A closer look at UTF-16 encoding, string length, and immutability in .NET."
      references={references}
    >
      <Typography component="h2" variant="h5" gutterBottom>
        Introduction
      </Typography>

      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        In .NET, the System.String type represents an immutable sequence of UTF-16 code units.
        Understanding this representation is important when working with Unicode, memory allocation,
        and text-processing performance.
      </Typography>

      <Typography component="h2" variant="h5" sx={{ mt: 4, mb: 2 }}>
        UTF-16 Representation
      </Typography>

      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        Each char in a .NET string represents one UTF-16 code unit. Some Unicode characters require
        two code units, known as a surrogate pair.
      </Typography>

      <pre>
        <code>{`string text = "😀";

Console.WriteLine(text.Length); // 2`}</code>
      </pre>

      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        Although the string contains one Unicode scalar value, its Length property returns 2 because
        the emoji requires a UTF-16 surrogate pair.
      </Typography>

      <Typography component="h2" variant="h5" sx={{ mt: 4, mb: 2 }}>
        String Immutability
      </Typography>

      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        Strings in .NET are immutable. Once a string instance has been created, its contents cannot
        be changed using the public String API.
      </Typography>

      <pre>
        <code>{`string original = "Hello";
string updated = original + " World";

Console.WriteLine(original); // Hello
Console.WriteLine(updated);  // Hello World`}</code>
      </pre>

      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        The concatenation creates a new string. The original string remains unchanged.
      </Typography>

      <Typography component="h2" variant="h5" sx={{ mt: 4, mb: 2 }}>
        Conclusion
      </Typography>

      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        The UTF-16 representation and immutability of strings are fundamental characteristics of
        .NET. These details become particularly relevant when processing large amounts of text or
        optimizing memory allocations.
      </Typography>
    </ArticleLayout>
  );
}
