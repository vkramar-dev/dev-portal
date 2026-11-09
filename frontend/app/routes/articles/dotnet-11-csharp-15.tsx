import PublicationLayout from "../../components/publications/PublicationLayout";
import {
  CodeExample,
  PublicationCallout,
  PublicationSection,
  PublicationTable,
} from "../../components/publications/PublicationElements";
import type { TocItem } from "../../components/publications/PublicationBody";
import { getPublication, publicationMeta } from "../../content/publications";

const publication = getPublication("dotnet-11-csharp-15");

export function meta() {
  return publicationMeta(publication);
}

const toc: TocItem[] = [
  { id: "runtime-async", label: "Runtime Async" },
  { id: "numeric-types", label: "New Numeric Types" },
  { id: "unions", label: "Union Types" },
  { id: "extension-indexers", label: "Extension Indexers" },
  { id: "labeled-jumps", label: "Goodbye, goto :)" },
  { id: "conclusion", label: "Conclusion" },
  { id: "references", label: "References" },
];

const references = [
  {
    title: "Microsoft Learn — What's new in the .NET 11 runtime",
    url: "https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-11/runtime",
  },
  {
    title: "Stephen Toub — Performance Improvements in .NET 11",
    url: "https://devblogs.microsoft.com/dotnet/performance-improvements-in-net-11/",
  },
  {
    title: "Microsoft Learn — What's new in .NET 11 libraries",
    url: "https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-11/libraries",
  },
  {
    title: "Microsoft Learn — Decimal32 API reference",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.numerics.decimal32?view=net-11.0",
  },
  {
    title: "Microsoft Learn — volatile (C# reference)",
    url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/volatile",
  },
  {
    title: "Microsoft Learn — What's new in C# 15",
    url: "https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-15",
  },
  {
    title: "Microsoft Learn — Union types (C# reference)",
    url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/union",
  },
  {
    title: "Microsoft Learn — Labeled break and continue (C# proposal)",
    url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-15.0/labeled-break-continue",
  },
];

export default function DotNet11AndCSharp15() {
  return (
    <PublicationLayout
      publication={publication}
      toc={toc}
      references={references}
      related={[
        { title: "Memory in .NET — Overview", to: "/articles/memory-in-dotnet" },
        { title: ".NET Strings & the Two-Byte Tax", to: "/articles/dotnet-strings" },
      ]}
    >
      <p>
        Every new version of .NET and C# brings changes to the runtime, new APIs, and language
        features. I'd like to focus on the ones I find most relevant:
      </p>
      <ol className="pub-steps">
        <li>
          <a href="#runtime-async">Runtime Async</a>
        </li>
        <li>
          <a href="#numeric-types">New Numeric Types</a>
        </li>
        <li>
          <a href="#unions">Union Types</a>
        </li>
        <li>
          <a href="#extension-indexers">Extension Indexers</a>
        </li>
        <li>
          <a href="#labeled-jumps">
            Goodbye, <code>goto</code> :) — Labeled <code>break</code> &amp; <code>continue</code>
          </a>
        </li>
      </ol>
      <p>
        Let's see which problems these changes solve and whether they are useful in everyday
        development.
      </p>

      <PublicationSection id="runtime-async" title="1. Runtime Async">
        <p>
          This is probably one of the most interesting changes in .NET 11. It affects not just
          syntax or library APIs, but the mechanism behind asynchronous execution itself.
        </p>

        <h3 id="classic-async">How It Worked Before</h3>
        <p>
          Since C# 5, the compiler has transformed <code>async</code> methods into state machines.
          Consider a simple example:
        </p>
        <CodeExample
          code={`public async Task<string> GetDataAsync()
{
    string data = await LoadDataAsync();
    return data.ToUpperInvariant();
}`}
        />
        <p>
          Behind this small method is a compiler-generated state machine that keeps track of
          everything needed to resume execution after an <code>await</code>, including the relevant
          local variables and the current execution state.
        </p>
        <p>
          Creating the state-machine structure does not necessarily mean allocating an object in the
          managed heap. However, the asynchronous machinery may create additional objects, including
          intermediate <code>Task</code> instances. In deep chains of small async methods, that
          overhead can add up.
        </p>

        <h3 id="runtime-async-changes">What Changes with Runtime Async?</h3>
        <p>
          Runtime Async moves much of the responsibility for asynchronous execution from the
          compiler to the runtime and JIT. Instead of generating the traditional state machine, the
          compiler emits a different representation that allows the runtime to manage suspension and
          resumption.
        </p>
        <p>
          One particularly interesting optimization is <code>AsyncCall</code>. When one Runtime
          Async method directly awaits another, the JIT can, in certain cases, avoid creating an
          intermediate <code>Task&lt;T&gt;</code> for that call.
        </p>
        <p>This can help reduce:</p>
        <ul className="pub-steps">
          <li>allocations in async call chains;</li>
          <li>the overhead of asynchronous calls;</li>
          <li>the size of generated code.</li>
        </ul>
        <p>
          It can also improve stack traces and debugging. The programming model does not change: we
          still write <code>async</code>/<code>await</code> and still use <code>Task</code> and
          <code>ValueTask</code>.
        </p>

        <h3 id="runtime-async-enable">How to Enable It</h3>
        <p>
          In .NET 11, Runtime Async is still a preview feature. It is not enabled by default for
          application code. To opt in, add the feature switch to the project file:
        </p>
        <CodeExample
          language="XML"
          code={`<PropertyGroup>
    <TargetFramework>net11.0</TargetFramework>
    <Features>$(Features);runtime-async=on</Features>
</PropertyGroup>`}
        />
        <p>
          When targeting <code>net11.0</code>, this no longer requires setting
          <code> EnablePreviewFeatures</code>. The switch applies to code compiled for that project;
          it does not recompile existing dependencies.
        </p>

        <h3 id="runtime-async-mixing">Mixing Two Async Models</h3>
        <p>And this is where things get rather curious.</p>
        <p>
          The .NET 11 runtime libraries themselves are already compiled with Runtime Async enabled.
          That leaves us with two scenarios.
        </p>
        <p>
          <strong>Scenario one:</strong> We migrate an application to .NET 11 but do not enable
          Runtime Async. Our own async methods continue to use traditional compiler-generated state
          machines, while the runtime libraries use the new model.
        </p>
        <p>
          <strong>Scenario two:</strong> We enable Runtime Async for our application. Now our code
          and the runtime libraries use the new model, but dependencies compiled without the feature
          still use the old one.
        </p>
        <p>
          Either way, a typical application ends up using both async implementations. The runtime
          provides the necessary interoperability between them.
        </p>
        <PublicationCallout title="A mixed-model application">
          Mixing the two models is not an error in itself. Still, it would make sense to have
          Runtime Async calls throughout the entire async call chain to get the most out of the new
          mechanism.
        </PublicationCallout>

        <h3 id="runtime-async-verdict">My Take</h3>
        <p>
          I like the direction of this change. Moving more of the async machinery into the runtime
          opens optimization opportunities that the old approach could not offer.
        </p>
        <p>But the current situation is rather odd.</p>
        <p>
          Runtime Async is still in preview and remains opt-in for application code, even though the
          runtime libraries already use it. Don't enable it, and you mix models. Enable it, and you
          still mix models because of older dependencies.
        </p>
        <p>
          And the .NET team is not promising a universal performance improvement yet. The goal for
          .NET 11 has been performance parity with .NET 10; some paths are faster, while others
          still have known inefficiencies.
        </p>
        <p>
          <strong>
            So why rush a change of this scale when the ecosystem is not yet ready to use it
            consistently?
          </strong>
        </p>
        <p>
          In my own production projects, I'd rather wait for a more mature implementation than
          enable a preview feature solely in the hope of better performance. And I certainly
          wouldn't upgrade to .NET 11 just for Runtime Async.
        </p>
      </PublicationSection>

      <PublicationSection id="numeric-types" title="2. New Numeric Types">
        <p>.NET 11 introduces three IEEE 754-2019 decimal floating-point types:</p>
        <ul className="pub-steps">
          <li>
            <code>Decimal32</code>
          </li>
          <li>
            <code>Decimal64</code>
          </li>
          <li>
            <code>Decimal128</code>
          </li>
        </ul>
        <p>
          Unlike <code>float</code> and <code>double</code>, which use binary floating-point
          arithmetic, these types use decimal floating-point arithmetic.
        </p>
        <PublicationTable>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Size</th>
              <th scope="col">Decimal precision</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>float</code>
              </td>
              <td>4 bytes</td>
              <td>~7 significant digits</td>
            </tr>
            <tr>
              <td>
                <code>double</code>
              </td>
              <td>8 bytes</td>
              <td>~16 significant digits</td>
            </tr>
            <tr>
              <td>
                <code>decimal</code>
              </td>
              <td>16 bytes</td>
              <td>28–29 significant digits</td>
            </tr>
            <tr>
              <td>
                <code>Decimal32</code>
              </td>
              <td>4 bytes</td>
              <td>7 significant digits</td>
            </tr>
            <tr>
              <td>
                <code>Decimal64</code>
              </td>
              <td>8 bytes</td>
              <td>16 significant digits</td>
            </tr>
            <tr>
              <td>
                <code>Decimal128</code>
              </td>
              <td>16 bytes</td>
              <td>34 significant digits</td>
            </tr>
          </tbody>
        </PublicationTable>
        <p>
          These types also support IEEE decimal semantics such as <code>NaN</code> and infinities.
          From a practical application-development perspective, <code>Decimal32</code> interests me
          the most — though even there, I see only a rather narrow use case.
        </p>

        <h3 id="decimal-comparisons">The Practical Problem of Decimal Comparisons</h3>
        <p>
          We've all encountered surprising results when comparing floating-point calculations for
          exact equality:
        </p>
        <CodeExample
          code={`float a = 0.1f;
float b = 0.6f;
float c = 0.7f;

Console.WriteLine(a + b == c); // False`}
        />
        <p>
          This happens because these decimal fractions cannot be represented exactly in binary
          floating point. We typically compare using an appropriate tolerance or switch to
          <code> decimal</code>. But <code>decimal</code> occupies 16 bytes. What if we don't need
          that much precision?
        </p>
        <p>
          With <code>Decimal32</code>, the same example behaves as expected:
        </p>
        <CodeExample
          code={`using System.Globalization;
using System.Numerics;

static Decimal32 D(string text) =>
    Decimal32.Parse(text, CultureInfo.InvariantCulture);

Decimal32 a = D("0.1");
Decimal32 b = D("0.6");
Decimal32 c = D("0.7");

Console.WriteLine(a + b == c); // True`}
        />
        <p>
          Those three decimal values are representable exactly, and their sum fits within the
          format's seven significant digits. So this particular equality test works with a four-byte
          value type.
        </p>
        <PublicationCallout title="Exact representation is not unlimited precision" tone="warning">
          <code>Decimal32</code> still rounds results that exceed seven significant digits. It does
          not make exact equality safe for every calculation — only for cases where the values and
          operations fit the required precision.
        </PublicationCallout>

        <p>
          I&apos;ve also used <code>float</code> in multithreaded code because its fields can be
          declared <code>volatile</code>, providing useful memory-ordering and visibility
          guarantees. <code>Decimal32</code> cannot, despite its four-byte size (nor can
          <code> double</code>). Of course, <code>volatile</code> does not guarantee that every read
          sees the latest write.
        </p>

        <h3 id="numeric-performance">Performance</h3>
        <p>
          The matching size does not mean matching performance. On mainstream x64 CPUs,
          <code> float</code> and <code>double</code> benefit from well-established hardware
          floating-point instructions. The new decimal formats don't have the same general-purpose
          hardware execution path in typical .NET deployments.
        </p>
        <p>
          Decimal arithmetic may therefore be significantly more expensive. Before choosing
          <code> Decimal32</code> for a performance-sensitive path, I'd want actual benchmarks
          against <code>float</code>, <code>double</code>, and <code>decimal</code> on the target
          workload and hardware — not a guess based on the type's size.
        </p>

        <h3 id="numeric-verdict">My Take</h3>
        <p>
          Despite three new types being introduced at once, I see little reason to reconsider
          <code> float</code>, <code>double</code>, or <code>decimal</code> in my own projects.
        </p>
        <p>
          The one scenario that interests me is <code>Decimal32</code> when seven significant digits
          are enough and exact representation of certain decimal fractions matters for equality
          comparisons. Even then, concurrency limitations and potentially slower calculations make
          the trade-off far from obvious.
        </p>
        <p>
          I don't yet see a compelling everyday use for <code>Decimal64</code> or
          <code> Decimal128</code>. They may be valuable in specialized calculations or when
          interoperating with systems that already use IEEE decimal formats. But I am unlikely to
          adopt them in existing projects simply because they are new in .NET 11.
        </p>
      </PublicationSection>

      <PublicationSection id="unions" title="3. Union Types">
        <p>
          When I first heard that C# 15 was getting <code>union</code>, I expected something similar
          to the familiar C++ construct: overlapping fields in the same memory region. C# could
          already approximate that with <code>StructLayout</code> and
          <code> FieldOffset</code>.
        </p>
        <p>
          But the new C# <code>union</code> has a different purpose. It's a{" "}
          <em>discriminated union</em>: a value that can be one of several explicitly declared
          types. The familiar name can be a little misleading at first, but the feature has a useful
          application of its own.
        </p>

        <h3 id="unions-example">Returning Different Types from a Method</h3>
        <p>
          Suppose a method searches for a user. It can produce three different results: a{" "}
          <code>User</code> when the lookup succeeds, a <code>NotFound</code> result, or an
          <code> AccessDenied</code> result.
        </p>
        <p>
          These types have no reason to share an interface or a common base class. Previously, one
          option was to return <code>object</code> and then check and cast the actual result. It
          works, but the method signature says nothing about the permitted result types. And the
          compiler cannot stop us from returning something unrelated.
        </p>
        <p>Now we can declare the possibilities directly:</p>
        <CodeExample
          code={`public sealed record User(int Id, string Name);
public sealed record NotFound(int Id);
public sealed record AccessDenied(string Reason);

public union UserLookupResult(User, NotFound, AccessDenied);`}
        />
        <p>The method can then return any one of them:</p>
        <CodeExample
          code={`public static UserLookupResult FindUser(int id, bool hasAccess)
{
    if (!hasAccess)
        return new AccessDenied("Access denied");

    if (id != 42)
        return new NotFound(id);

    return new User(42, "Alice");
}`}
        />
        <p>
          Notice that the return type is <code>UserLookupResult</code>, but we return
          <code> User</code>, <code>NotFound</code>, or <code>AccessDenied</code> directly. The
          compiler provides the implicit conversion into the union.
        </p>
        <p>On the receiving side, pattern matching handles each possible result:</p>
        <CodeExample
          code={`UserLookupResult result = FindUser(42, true);

string message = result switch
{
    User user => $"Hello, {user.Name}!",
    NotFound missing => $"User {missing.Id} not found",
    AccessDenied denied => denied.Reason,
    null => "No result"
};`}
        />
        <p>
          No manual cast from <code>object</code> is needed, and the compiler knows the complete set
          of cases. If we later add another type to <code>UserLookupResult</code>, a
          <code> switch</code> expression that doesn't handle it can produce a warning. The explicit{" "}
          <code>null</code> arm also handles a default-initialized union value without hiding newly
          introduced cases behind a catch-all pattern.
        </p>

        <h3 id="unions-memory">What About Memory?</h3>
        <p>
          An automatically generated C# union is a struct containing an <code>object?</code>
          reference. Because all three cases in this example are reference types, storing them in
          the union does not require boxing.
        </p>
        <p>
          If a union contains value types, however, those values are boxed by the generated
          representation and may cause allocations. Custom union implementations can use other
          storage strategies when that matters.
        </p>
        <p>
          This feature is primarily about expressive, type-safe APIs, not an automatic memory
          optimization.
        </p>

        <h3 id="unions-verdict">My Take</h3>
        <p>
          Although I originally expected C++-style behavior, this version of <code>union</code>
          does solve a real problem: a method can return several unrelated types without forcing an
          artificial common interface or falling back to <code>object</code> and casts.
        </p>
        <p>
          That's one of the more practically useful additions in C# 15 for me. And if C# ever
          allowed method overloads to differ by return type as well as by parameters — now{" "}
          <em>that</em> I'd appreciate even more. :)
        </p>
      </PublicationSection>

      <PublicationSection id="extension-indexers" title="4. Extension Indexers">
        <p>
          C# 14 introduced the new extension-member model. C# 15 extends it with extension indexers.
          We can now provide indexer syntax for types that don't define an indexer themselves.
        </p>
        <p>For example:</p>
        <CodeExample
          code={`public static class EnumerableIndexers
{
    extension(IEnumerable<int> source)
    {
        public int this[int index] => source.ElementAt(index);
    }
}`}
        />
        <p>Now this becomes possible:</p>
        <CodeExample
          code={`IEnumerable<int> numbers = Enumerable.Range(10, 5);

int number = numbers[2]; // 12`}
        />
        <p>
          It looks perfectly natural. But there's a detail worth remembering: indexer syntax often
          suggests fast, direct access, while <code>ElementAt()</code> may need to walk a sequence
          that doesn't support indexed access.
        </p>
        <p>
          <strong>My take:</strong> A convenient syntax improvement — as long as we're careful about
          the actual cost of the operation we hide behind <code>[]</code>.
        </p>
      </PublicationSection>

      <PublicationSection id="labeled-jumps" title="5. Goodbye, goto :) — Labeled break & continue">
        <p>Another small but noticeable improvement.</p>
        <p>
          Imagine several nested loops. Once a certain condition is met, we need to exit all of them
          immediately. In the past, <code>goto</code> was a perfectly practical way to do this.
        </p>
        <p>
          Another option was to use flags, but the deeper the nesting, the more checks we had to
          add. (I never understood why anyone preferred flags once the nesting went beyond two
          levels...)
        </p>
        <p>Now we can write:</p>
        <CodeExample
          code={`int[,,] data = new int[2, 3, 4];

scan:
for (int i = 0; i < data.GetLength(0); i++)
{
    for (int j = 0; j < data.GetLength(1); j++)
    {
        for (int k = 0; k < data.GetLength(2); k++)
        {
            if (data[i, j, k] == 42)
            {
                Console.WriteLine("Found!");
                break scan;
            }
        }
    }
}`}
        />
        <p>
          <code>break scan</code> exits the outer loop and, naturally, every loop nested inside it.
          Labeled <code>continue</code> works similarly:
        </p>
        <CodeExample
          code={`scan:
for (int i = 0; i < data.GetLength(0); i++)
{
    for (int j = 0; j < data.GetLength(1); j++)
    {
        for (int k = 0; k < data.GetLength(2); k++)
        {
            if (data[i, j, k] < 0)
                continue scan;
        }
    }
}`}
        />
        <p>
          Here execution moves straight to the next iteration of the outer loop. Of course,{" "}
          <code>goto</code> is not going anywhere. But for one of its common uses, we now have a
          more specific and readable construct.
        </p>
        <p>
          <strong>My take:</strong> A small but useful readability improvement, particularly with
          deeply nested loops.
        </p>
      </PublicationSection>

      <PublicationSection id="conclusion" title="Conclusion">
        <p>
          From an architectural perspective, Runtime Async is the most significant change here. It
          represents a real evolution of a fundamental part of .NET. But while it remains in
          preview, coexists with the old implementation, and doesn't promise a performance win in
          every case, I'm not in a hurry to enable it in production.
        </p>
        <p>
          The new numeric types have interesting capabilities, but they haven't convinced me to
          rethink existing choices. <code>Decimal32</code> might help in a few specific situations;
          in most everyday code, <code>float</code>, <code>double</code>, and
          <code> decimal</code> still do their jobs well.
        </p>
        <p>
          On the other hand, C# 15 <code>union</code> really could have practical applications: it
          lets methods return different, unrelated result types without losing type safety.
          Extension indexers and labeled <code>break</code>/<code>continue</code> are smaller,
          welcome improvements that can make code more concise and readable.
        </p>
        <p>
          Overall, .NET 11 and C# 15 offer both fundamental changes and smaller conveniences. But
          new does not automatically mean better.
        </p>
        <p>
          My criterion remains the same: what real problem does a feature solve, and is using it
          justified in a particular project...
        </p>
      </PublicationSection>
    </PublicationLayout>
  );
}
