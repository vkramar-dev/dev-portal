import { useTheme } from "@mui/material/styles";
import { Link } from "react-router";
import PublicationLayout from "../../components/publications/PublicationLayout";
import {
  CodeExample,
  PublicationCallout,
  PublicationFigure,
  PublicationSection,
  PublicationTable,
} from "../../components/publications/PublicationElements";
import { getPublication, publicationMeta } from "../../content/publications";
import type { TocItem } from "../../components/publications/PublicationBody";

const publication = getPublication("dotnet-strings");

export function meta() {
  return publicationMeta(publication);
}

const toc: TocItem[] = [
  { id: "introduction", label: "Introduction" },
  { id: "memory-layout", label: "How .NET Stores a String" },
  { id: "two-byte-tax", label: "The Two-Byte Tax" },
  { id: "utf16-tradeoff", label: "Is UTF-16 Always Wasteful?" },
  { id: "other-runtimes", label: "How Other Runtimes Store Strings" },
  { id: "avoiding-tax", label: "Can We Avoid the Two-Byte Tax in .NET?" },
  { id: "conclusion", label: "Conclusion" },
  { id: "references", label: "References" },
];

const references = [
  {
    title: "Microsoft Learn — System.String",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.string",
  },
  {
    title: "Microsoft Learn — String.Intern",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.string.intern",
  },
  {
    title: "C# specification — UTF-8 string literals",
    url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/reference-types#utf-8-string-literals",
  },
  { title: "OpenJDK — JEP 254: Compact Strings", url: "https://openjdk.org/jeps/254" },
  {
    title: "V8 — Strings in V8",
    url: "https://chromium.googlesource.com/v8/v8.git/+/refs/heads/main/docs/objects/strings.md",
  },
  {
    title: "Python — PEP 393: Flexible String Representation",
    url: "https://peps.python.org/pep-0393/",
  },
  {
    title: "Rust Book — Storing UTF-8 Encoded Text with Strings",
    url: "https://doc.rust-lang.org/book/ch08-02-strings.html",
  },
  { title: "Go — Strings, bytes, runes and characters", url: "https://go.dev/blog/strings" },
  {
    title: "Microsoft Learn — Utf8Formatter",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.buffers.text.utf8formatter",
  },
];

function StringMemoryFigure() {
  const theme = useTheme();
  const diagram =
    theme.palette.mode === "dark"
      ? "/images/articles/dotnet-strings/string_memory_layout_dark.svg"
      : "/images/articles/dotnet-strings/string_memory_layout_light.svg";

  return (
    <PublicationFigure
      caption="Figure 1 · String memory layout (x64 CoreCLR)"
      note="Illustrative arrangement, not a guaranteed physical stack frame. The literal may be interned; a freshly allocated string of this size would normally begin in SOH Gen 0."
    >
      <img
        className="pind-string-memory-diagram"
        src={diagram}
        alt="A pointer-sized reference to str, alongside a 32-byte string object in the managed heap: 8-byte object header, 8-byte MethodTable pointer, 4-byte length, 8 bytes of UTF-16 character data, 2-byte null terminator, 2 bytes of alignment padding."
        width={1400}
        height={790}
        loading="lazy"
        decoding="async"
      />
    </PublicationFigure>
  );
}

export default function DotNetStrings() {
  return (
    <PublicationLayout
      publication={publication}
      toc={toc}
      references={references}
      related={[{ title: "Memory in .NET — Overview", to: "/articles/memory-in-dotnet" }]}
    >
      <PublicationSection id="introduction" title="Introduction">
        <p>
          Most built-in types in C#, such as <code>int</code>, <code>long</code>, and{" "}
          <code>decimal</code>, are value types. <code>string</code> is a notable exception: it is a
          reference type.
        </p>
        <p>
          As we discussed in <Link to="/articles/memory-in-dotnet">Memory in .NET</Link>,
          reference-type objects come with their own memory overhead. But strings have another
          characteristic worth examining: .NET stores their characters as UTF-16 code units.
        </p>
        <p>
          For ASCII-heavy applications, these two characteristics can make strings considerably more
          expensive than the text they contain.
        </p>
      </PublicationSection>

      <PublicationSection id="memory-layout" title="How .NET Stores a String">
        <p>Consider a simple example:</p>
        <CodeExample code={'string str = ".NET";'} />
        <StringMemoryFigure />
        <p>
          In our simplified x64 memory model, the local variable holds an 8-byte reference, while
          the string object resides in the managed heap. A newly allocated, non-interned string of
          this size normally starts in Generation 0 of the Small Object Heap (SOH).
        </p>
        <p>Let's calculate the cost of storing four characters.</p>
        <PublicationTable>
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Object header</td>
              <td>8 bytes</td>
            </tr>
            <tr>
              <td>MethodTable pointer</td>
              <td>8 bytes</td>
            </tr>
            <tr>
              <td>String length</td>
              <td>4 bytes</td>
            </tr>
            <tr>
              <td>Four UTF-16 code units</td>
              <td>8 bytes</td>
            </tr>
            <tr>
              <td>Null terminator</td>
              <td>2 bytes</td>
            </tr>
            <tr>
              <td>Alignment padding</td>
              <td>2 bytes</td>
            </tr>
            <tr>
              <th scope="row">Total (managed heap)</th>
              <th scope="row">32 bytes</th>
            </tr>
          </tbody>
        </PublicationTable>
        <p>
          That's 32 bytes in the heap for four ASCII characters, plus a pointer-sized reference
          wherever a separate reference is stored. The same text could be represented by just four
          bytes in ASCII or UTF-8.
        </p>
        <p>
          Two details are worth mentioning. String literals may be <em>interned</em>, allowing
          multiple references to share the same string object. This does not change the object's
          UTF-16 representation or overhead. Also, the JIT may keep a local reference in a register
          rather than a physical stack slot. The figure illustrates the object layout, not a
          guaranteed machine-level allocation for each use of a literal.
        </p>
      </PublicationSection>

      <PublicationSection id="two-byte-tax" title="The Two-Byte Tax">
        <p>
          For short strings, the fixed cost of the managed object is substantial. As the string
          grows longer, that overhead becomes relatively less important. But another cost remains.
        </p>
        <p>
          Every ASCII character in a .NET <code>string</code> occupies two bytes because it is
          stored as a UTF-16 code unit.
        </p>
        <p>Take an ASCII string of 1,000 characters:</p>
        <PublicationTable>
          <thead>
            <tr>
              <th scope="col">Representation</th>
              <th scope="col">Character data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UTF-8 / ASCII</td>
              <td>1,000 bytes</td>
            </tr>
            <tr>
              <td>.NET UTF-16</td>
              <td>2,000 bytes</td>
            </tr>
          </tbody>
        </PublicationTable>
        <p>
          The UTF-16 character data occupies twice as much memory. Relative to the single-byte
          representation, that's 100% additional storage. Conversely, a single-byte representation
          would save 50% of the UTF-16 payload.
        </p>
        <PublicationCallout title="The Two-Byte Tax">
          I call this the Two-Byte Tax — the extra memory consumed when ASCII characters are stored
          as two-byte UTF-16 code units instead of single bytes.
        </PublicationCallout>
        <p>
          Not exactly ideal for a platform used to build fast, scalable applications — particularly
          when applications and their dependencies process large volumes of ASCII-heavy text.
        </p>
      </PublicationSection>

      <PublicationSection id="utf16-tradeoff" title="Is UTF-16 Always Wasteful?">
        <p>
          No. UTF-8 is not universally more compact. Many common Chinese characters, for example,
          use three bytes in UTF-8 but only two in UTF-16. Other Unicode code points need a
          surrogate pair — four bytes — in UTF-16. The number of UTF-16 code units is not always the
          number of user-perceived characters.
        </p>
        <p>
          The argument here specifically concerns ASCII-heavy workloads: identifiers, protocol
          tokens, URLs, and other text where most characters are ASCII.
        </p>
      </PublicationSection>

      <PublicationSection
        id="other-runtimes"
        title="How Other Languages and Runtimes Handle Strings"
      >
        <p>
          .NET is far from the only platform with Unicode strings. But the internal storage
          strategies differ substantially.
        </p>
        <PublicationTable>
          <thead>
            <tr>
              <th scope="col">Technology</th>
              <th scope="col">String representation</th>
              <th scope="col">ASCII payload</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>.NET / C#</td>
              <td>UTF-16</td>
              <td>2 B / character</td>
            </tr>
            <tr>
              <td>Java 9+</td>
              <td>Compact Strings: Latin-1 or UTF-16</td>
              <td>1 B / character</td>
            </tr>
            <tr>
              <td>C++</td>
              <td>
                <code>std::string</code> stores <code>char</code>; no prescribed encoding
              </td>
              <td>Typically 1 B / character</td>
            </tr>
            <tr>
              <td>Rust</td>
              <td>
                UTF-8 <code>String</code> / <code>&amp;str</code>
              </td>
              <td>1 B / character</td>
            </tr>
            <tr>
              <td>Go</td>
              <td>Byte sequence, conventionally UTF-8</td>
              <td>1 B / character</td>
            </tr>
            <tr>
              <td>Node.js (V8)</td>
              <td>One-byte Latin-1 or two-byte representation</td>
              <td>1 B / character</td>
            </tr>
            <tr>
              <td>Python (CPython)</td>
              <td>Flexible 1-, 2- or 4-byte representation</td>
              <td>1 B / character</td>
            </tr>
          </tbody>
        </PublicationTable>
        <p>
          Java is a particularly interesting comparison. Before Java 9, its strings used UTF-16
          character storage. With <em>Compact Strings</em>, the runtime can store Latin-1 text in
          one byte per character without changing the public
          <code> String</code> API.
        </p>
        <p>
          JavaScript has UTF-16 string semantics, but the V8 engine used by Node.js can store
          Latin-1 strings using one-byte data. CPython also chooses between one-, two-, and
          four-byte representations according to the text's contents.
        </p>
        <p>
          C++ takes a different approach. <code>std::string</code> stores <code>char</code>
          elements without imposing a particular encoding; many implementations also use Small
          String Optimization to keep short text inside the string object. Rust strings contain
          valid UTF-8, while Go strings can contain arbitrary bytes, although ordinary string
          literals usually contain UTF-8 text.
        </p>
        <p>
          These comparisons are about character storage, not total object size. Runtime headers,
          pointers, buffer capacity, and other metadata also matter: one-byte storage does not
          necessarily make a whole string object half as large.
        </p>
      </PublicationSection>

      <PublicationSection id="avoiding-tax" title="Can We Avoid the Two-Byte Tax in .NET?">
        <p>
          Modern .NET provides byte-oriented APIs for cases where a UTF-16
          <code> string</code> is unnecessary. For constant UTF-8 text, C# supports UTF-8 string
          literals:
        </p>
        <CodeExample code={'ReadOnlySpan<byte> command = "PING"u8;'} />
        <p>
          The <code>u8</code> suffix provides UTF-8 bytes as a<code> ReadOnlySpan&lt;byte&gt;</code>{" "}
          rather than creating a managed
          <code> string</code>. The compiler can place the literal bytes in static data, avoiding a
          new managed string allocation at the call site.
        </p>
        <p>For data generated at runtime, we can also work directly with a byte buffer:</p>
        <CodeExample
          code={`using System.Buffers.Text;

Span<byte> buffer = stackalloc byte[32];

if (Utf8Formatter.TryFormat(12345, buffer, out int written))
{
    ReadOnlySpan<byte> payload = buffer[..written];
    // Pass payload to a byte-oriented API.
}`}
        />
        <p>
          Here, the integer is formatted directly into UTF-8 bytes in stack-allocated storage,
          without creating an intermediate <code>string</code>.
        </p>
        <p>
          Of course, <code>Span&lt;byte&gt;</code> is a view of bytes, not an encoding. This
          approach is useful only when the consumer accepts bytes and conversions back to UTF-16 can
          be avoided. A span also does not remove the allocation cost of whatever storage backs it.
        </p>
      </PublicationSection>

      <PublicationSection id="conclusion" title="Conclusion">
        <p>
          Working with strings in .NET is generally straightforward, since{" "}
          <code>System.String</code> uses a consistent UTF-16 representation without introducing the
          complexity of multiple encodings. However, this convenience comes at the cost of
          additional memory consumption and, in certain scenarios, reduced performance.
        </p>

        <p>
          In most applications, this overhead is negligible and rarely becomes a concern. But when
          choosing .NET to build extremely fast and scalable applications, this limitation may be a
          serious consideration.
        </p>

        <p>
          As of November 2026, when this article is being written, I would consider this one of the
          most significant shortcomings of .NET when it comes to memory-efficient text processing.
        </p>

        <p>
          Even if we switch to byte-oriented representations such as <code>Span&lt;byte&gt;</code>{" "}
          in performance-critical parts of an application, we still encounter the same limitation in
          other layers. Libraries and frameworks such as EF Core, ADO.NET, and ASP.NET Core continue
          to rely heavily on <code>System.String</code> in their public APIs.
        </p>

        <p>
          Addressing this problem would require more than introducing a new string type. It would
          also require broad support throughout the .NET ecosystem, allowing text to be processed
          without unnecessary conversions between UTF-8 and UTF-16.
        </p>

        <p>
          In a separate article, I plan to demonstrate a practical approach to processing text in
          .NET without creating managed <code>string</code> objects for the text itself. However,
          such techniques are more suitable for exceptional, performance-critical scenarios than
          everyday development.
        </p>

        <p>
          Personally, I would consider full support for memory-efficient string representations,
          particularly for ASCII-heavy text, one of the most welcome improvements in future .NET
          releases. Whether Microsoft achieves this through a dedicated UTF-8 string type or an
          optimized internal representation of <code>System.String</code> is ultimately an
          implementation decision.
        </p>
      </PublicationSection>
    </PublicationLayout>
  );
}
