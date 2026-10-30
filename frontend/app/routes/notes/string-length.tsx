import PublicationLayout from "../../components/publications/PublicationLayout";
import { CodeExample, PublicationCallout, PublicationSection } from "../../components/publications/PublicationElements";

export function meta() { return [
  { title: "What Does String.Length Measure? — Design Preview | PinD" },
  { name: "robots", content: "noindex, nofollow" },
]; }
export default function StringLengthNote() {
  return <PublicationLayout kind="note" title="What Does String.Length Measure?" category=".NET · Strings"
    summary="A short observation about UTF-16 code units and the meaning of string length."
    references={[{ title: "Microsoft Learn — String.Length", url: "https://learn.microsoft.com/en-us/dotnet/api/system.string.length" }]}
    related={[{ title: "How .NET Stores Strings", to: "/articles/dotnet-strings" }]}>
    <PublicationSection id="observation" title="The observation">
      <p>In .NET, <code>string.Length</code> reports the number of UTF-16 code units in a string. It does not necessarily equal the number of Unicode scalar values or the number of characters people perceive.</p>
      <CodeExample code={'string text = "😀";\nConsole.WriteLine(text.Length); // 2'} />
      <PublicationCallout title="When this matters">Text length checks, cursor movement, and slicing should be designed around the representation your task actually requires.</PublicationCallout>
    </PublicationSection>
    <PublicationSection id="summary" title="In brief">
      <p>Know whether you are counting code units, Unicode scalar values, or grapheme clusters. They answer different questions.</p>
    </PublicationSection>
  </PublicationLayout>;
}
