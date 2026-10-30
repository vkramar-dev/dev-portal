import PublicationLayout from "../../components/publications/PublicationLayout";
import { CodeExample, PublicationSection, PublicationCallout, PublicationFigure, PublicationTable } from "../../components/publications/PublicationElements";
import { Utf16Diagram } from "../../components/publications/PublicationDiagrams";

export function meta() {
  return [
    { title: "How .NET Stores Strings | Programming in Depth" },
    { name: "description", content: "Explore how .NET strings use UTF-16, how Length works, and why strings are immutable." },
  ];
}

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "utf16", label: "UTF-16 representation" },
  { id: "examples", label: "Comparing examples" },
  { id: "immutability", label: "String immutability" },
  { id: "conclusion", label: "Conclusion" },
  { id: "references", label: "References" },
];
const references = [
  { title: "Microsoft Learn — System.String", url: "https://learn.microsoft.com/en-us/dotnet/api/system.string" },
  { title: "Microsoft Learn — String.Length", url: "https://learn.microsoft.com/en-us/dotnet/api/system.string.length" },
];

export default function DotNetStrings() {
  return <PublicationLayout kind="article" title="How .NET Stores Strings"
    category=".NET" publishedAt="2026-10-23"
    summary="A closer look at UTF-16 encoding, string length, and immutability in .NET."
    toc={toc} references={references}
    related={[{ title: "What Does String.Length Measure? (design preview)", to: "/notes/string-length" }]}>
    <PublicationSection id="introduction" title="Introduction">
      <p>In .NET, <code>System.String</code> represents an immutable sequence of UTF-16 code units. This seemingly simple detail affects indexing, memory allocation, Unicode handling, and the performance of text-processing code.</p>
      <p>Does one visible character always mean one element in a string?</p>
    </PublicationSection>
    <PublicationSection id="utf16" title="UTF-16 representation">
      <p>A <code>char</code> is one UTF-16 code unit. Some Unicode scalar values are represented by a <em>surrogate pair</em>, so one scalar value may require two <code>char</code> values.</p>
      <CodeExample code={'string text = "😀";\nConsole.WriteLine(text.Length); // 2'} />
      <PublicationFigure caption="FIGURE 01 · One emoji represented by two UTF-16 code units"
        note="Illustrative representation of U+1F600; values shown in hexadecimal.">
        <Utf16Diagram />
      </PublicationFigure>
      <PublicationCallout title="What does Length measure?">String.Length counts UTF-16 code units — not user-perceived characters. A grapheme cluster can contain multiple scalar values and code units.</PublicationCallout>
    </PublicationSection>
    <PublicationSection id="examples" title="Comparing examples">
      <p>Even short inputs demonstrate why code-unit count and scalar-value count are not interchangeable.</p>
      <PublicationTable>
        <thead><tr><th scope="col">Text</th><th scope="col">UTF-16 code units</th><th scope="col">Unicode scalar values</th></tr></thead>
        <tbody>
          <tr><td><code>"A"</code></td><td>1</td><td>1</td></tr>
          <tr><td><code>"😀"</code></td><td>2</td><td>1</td></tr>
          <tr><td><code>"A😀"</code></td><td>3</td><td>2</td></tr>
        </tbody>
      </PublicationTable>
    </PublicationSection>
    <PublicationSection id="immutability" title="String immutability">
      <p>Strings cannot be modified through their public API after creation. Operations such as concatenation produce a new string value rather than changing the original instance.</p>
      <CodeExample code={'string original = "Hello";\nstring updated = original + " World";\n\nConsole.WriteLine(original); // Hello\nConsole.WriteLine(updated);  // Hello World'} />
    </PublicationSection>
    <PublicationSection id="conclusion" title="Conclusion">
      <p>Understanding UTF-16 code units and immutability helps avoid subtle errors when manipulating Unicode text and provides a foundation for reasoning about allocations and string-heavy workloads.</p>
    </PublicationSection>
  </PublicationLayout>;
}
