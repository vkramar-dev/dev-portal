import { Box, Divider, Typography, useTheme } from "@mui/material";
import type { ReactNode } from "react";
import PublicationLayout from "../../components/publications/PublicationLayout";
import { getPublication, publicationMeta } from "../../content/publications";
import type { TocItem } from "../../components/publications/PublicationBody";

const publication = getPublication("memory-in-dotnet");

export function meta() {
  return publicationMeta(publication);
}

const references = [
  {
    title: "Microsoft Learn — Fundamentals of garbage collection",
    url: "https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals",
  },
  {
    title: "Microsoft Learn — Large object heap",
    url: "https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/large-object-heap",
  },
  {
    title: "Microsoft Learn — GC configuration: LOH threshold",
    url: "https://learn.microsoft.com/en-us/dotnet/core/runtime-config/garbage-collector",
  },
  {
    title: "Microsoft Learn — NativeMemory",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.nativememory",
  },
  {
    title: "Microsoft Learn — Marshal.AllocHGlobal",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.marshal.allochglobal",
  },
  {
    title: "Microsoft Learn — stackalloc expression",
    url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/stackalloc",
  },
  {
    title: "Microsoft Learn — GC.AllocateArray",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.gc.allocatearray",
  },
  {
    title: "Microsoft Learn — ArrayPool<T>",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.buffers.arraypool-1.shared",
  },
  {
    title: "Microsoft Learn — EDITBIN /STACK",
    url: "https://learn.microsoft.com/en-us/cpp/build/reference/stack",
  },
  {
    title: "Microsoft Learn — Threading configuration (.NET 10+)",
    url: "https://learn.microsoft.com/en-us/dotnet/core/runtime-config/threading",
  },
];

const toc = [
  { id: "memory-overview", label: "1. Memory Overview" },
  { id: "thread-stack", label: "2. Thread Stack" },
  { id: "managed-heap", label: "3. Managed Heap" },
  { id: "soh", label: "3.1 Small Object Heap", level: 3 },
  { id: "loh", label: "3.2 Large Object Heap", level: 3 },
  { id: "poh", label: "3.3 Pinned Object Heap", level: 3 },
  { id: "managed-heap-summary", label: "3.4 Performance Considerations", level: 3 },
  { id: "static-storage", label: "4. Static Storage" },
  { id: "code-memory", label: "5. Code Memory" },
  { id: "native-memory", label: "6. Native and Unmanaged Memory" },
  { id: "cpu-storage", label: "7. CPU Registers and Caches" },
  { id: "where-data-lives", label: "8. Putting It All Together" },
  { id: "references", label: "References" },
] satisfies TocItem[];

const contentSx = { mb: 2.5, lineHeight: 1.75 } as const;
const headingSx = { mt: 5, mb: 2, scrollMarginTop: "25px" } as const;
const subheadingSx = { mt: 3.5, mb: 1.5, scrollMarginTop: "25px" } as const;

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Typography id={id} component="h2" variant="h5" sx={headingSx}>
      {children}
    </Typography>
  );
}

function Subheading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Typography id={id} component="h3" variant="h6" sx={subheadingSx}>
      {children}
    </Typography>
  );
}

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <Typography component="p" variant="body1" sx={contentSx}>
      {children}
    </Typography>
  );
}

// A lightweight C# highlighter for the article's short, static examples.
// No runtime parser or syntax-highlighting dependency is required.
const codeTokenPattern =
  /\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:abstract|as|async|await|bool|break|byte|catch|char|class|const|decimal|double|else|false|finally|float|for|foreach|if|int|internal|is|long|namespace|new|null|object|out|override|private|protected|public|readonly|ref|return|short|stackalloc|static|string|struct|this|throw|true|try|typeof|unsafe|using|var|void|while)\b|\b[A-Z][A-Za-z0-9_]*\b|\b\d[\d_]*(?:\.\d[\d_]*)?\b/g;

function highlightCodeLine(line: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let previousEnd = 0;

  for (const match of line.matchAll(codeTokenPattern)) {
    const index = match.index ?? 0;
    if (index > previousEnd) parts.push(line.slice(previousEnd, index));

    const token = match[0];
    const color = token.startsWith("//")
      ? "text.secondary"
      : token.startsWith('"') || token.startsWith("'")
        ? "success.main"
        : /^\d/.test(token)
          ? "secondary.main"
          : /^[A-Z]/.test(token)
            ? "info.main"
            : "primary.main";

    parts.push(
      <Box component="span" key={`${index}-${token}`} sx={{ color, fontWeight: 500 }}>
        {token}
      </Box>,
    );
    previousEnd = index + token.length;
  }

  if (previousEnd < line.length) parts.push(line.slice(previousEnd));
  return parts;
}

function CodeExample({ code, title }: { code: string; title?: string }) {
  const lines = code.replace(/\n$/, "").split("\n");

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
          {title ?? "C#"}
        </Typography>
      </Box>

      <Box sx={{ overflowX: "auto", py: 1.25 }}>
        <Box
          component="pre"
          sx={{
            "&&": {
              m: 0,
              p: 0,
              bgcolor: "transparent",
              borderRadius: 0,
              fontSize: "0.86rem",
              lineHeight: 1.85,
              overflow: "visible",
            },
          }}
        >
          <Box
            component="code"
            sx={{ display: "block", fontFamily: '"Cascadia Code", Consolas, Monaco, monospace' }}
          >
            {lines.map((line, index) => (
              <Box
                component="span"
                key={index}
                sx={{
                  display: "flex",
                  width: "max-content",
                  minWidth: "100%",
                  whiteSpace: "pre",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Box component="span" sx={{ px: 2 }}>
                  {highlightCodeLine(line)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function MemoryRegion({
  title,
  detail,
  children,
}: {
  title: string;
  detail?: string;
  children?: ReactNode;
}) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        bgcolor: "background.paper",
        p: { xs: 1.5, md: 2 },
        minWidth: 0,
        height: "100%",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700, overflowWrap: "anywhere" }}>
        {title}
      </Typography>
      {detail && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 0.5, lineHeight: 1.5 }}
        >
          {detail}
        </Typography>
      )}
      {children}
    </Box>
  );
}

/** Figure 1 — a semantic, responsive recreation of the author's Paint sketch. */
function MemoryLayoutFigure() {
  const sohGenerations = ["Gen 0", "Gen 1", "Gen 2"];

  return (
    <Box component="figure" aria-labelledby="memory-layout-caption" sx={{ my: 4, mx: 0 }}>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: { xs: 1.5, md: 2 },
          bgcolor: "action.hover",
        }}
      >
        <Typography variant="overline" sx={{ display: "block", mb: 1.5, letterSpacing: "0.09em" }}>
          Single-threaded .NET process · conceptual view
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 1.25,
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "1fr minmax(0, 3.3fr) 1.05fr 1.05fr 1.25fr",
            },
            alignItems: "stretch",
          }}
        >
          <MemoryRegion title="Thread stack" detail="One stack per thread" />

          <Box
            sx={{
              border: "2px solid",
              borderColor: "primary.main",
              borderRadius: 2,
              p: 1,
              bgcolor: "background.default",
              gridColumn: { sm: "span 2", md: "auto" },
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary.main"
              sx={{ textAlign: "center", fontWeight: 700, mb: 1 }}
            >
              Managed heap
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 0.75,
              }}
            >
              <MemoryRegion title="SOH" detail="Small objects">
                <Box sx={{ mt: 1.5 }}>
                  {sohGenerations.map((gen, index) => (
                    <Box
                      key={gen}
                      sx={{
                        borderTop: index === 0 ? 0 : "1px dashed",
                        borderColor: "divider",
                        pt: index === 0 ? 0 : 0.8,
                        pb: 0.8,
                      }}
                    >
                      <Typography variant="caption">{gen}</Typography>
                    </Box>
                  ))}
                </Box>
              </MemoryRegion>
              <MemoryRegion title="LOH" detail="Objects ≥ 85,000 B (default threshold)" />
              <MemoryRegion title="POH" detail="Pinned allocations" />
            </Box>
          </Box>

          <MemoryRegion title="Static storage" detail="Values and references" />
          <MemoryRegion title="Code memory" detail="JIT / executable code" />
          <MemoryRegion title="Native memory" detail="Unmanaged allocations" />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 0.75, pl: 0.25 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.69rem", letterSpacing: "0.01em" }}
          >
            CPU · registers · L1 / L2 / L3
            <Box component="span" sx={{ ml: 1, color: "text.disabled" }}>
              (hardware-managed)
            </Box>
          </Typography>
        </Box>
      </Box>
      <Typography
        id="memory-layout-caption"
        component="figcaption"
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1.25, lineHeight: 1.6 }}
      >
        Figure 1. Simplified Memory Layout of a Single-Threaded .NET Process.
      </Typography>
    </Box>
  );
}

/** Figure 2 — the author's three-column SOH / LOH / POH sketch. */
function ManagedHeapFigure() {
  return (
    <Box component="figure" aria-labelledby="managed-heap-caption" sx={{ my: 4, mx: 0 }}>
      <Box sx={{ overflowX: "auto", pb: 1 }}>
        <Box
          role="img"
          aria-label="Conceptual managed heap: separate SOH, LOH, and POH regions. The SOH includes generations 0, 1, and 2, with promotion from younger to older generations."
          sx={{
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 2,
            bgcolor: "background.default",
            p: { xs: 1.5, sm: 2 },
            minWidth: 490,
            maxWidth: 660,
            mx: "auto",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", color: "primary.main", fontWeight: 700, mb: 1.5 }}
          >
            Managed Heap
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: { xs: 2, sm: 3 },
              px: { xs: 0, sm: 1 },
              pb: 0.5,
            }}
          >
            <Box
              sx={{
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: 1,
                bgcolor: "background.paper",
                height: 236,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                SOH
              </Typography>
              <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
                Small Object Heap
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                {"< 85,000 bytes"}*
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 0.1,
                  width: "100%",
                  mt: 0.75,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Gen 0
                </Typography>
                <Typography
                  aria-hidden="true"
                  variant="caption"
                  color="primary.main"
                  sx={{ lineHeight: 1.1 }}
                >
                  ↓
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Gen 1
                </Typography>
                <Typography
                  aria-hidden="true"
                  variant="caption"
                  color="primary.main"
                  sx={{ lineHeight: 1.1 }}
                >
                  ↓
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Gen 2
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: 1,
                bgcolor: "background.paper",
                height: 236,
                p: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                LOH
              </Typography>
              <Typography variant="caption" sx={{ display: "block", lineHeight: 1.2 }}>
                Large Object Heap
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 0.5 }}
              >
                ≥ 85,000 bytes*
              </Typography>
            </Box>

            <Box
              sx={{
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: 1,
                bgcolor: "background.paper",
                height: 236,
                p: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                POH
              </Typography>
              <Typography variant="caption" sx={{ display: "block", lineHeight: 1.2 }}>
                Pinned Object Heap
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 0.5 }}
              >
                Pinned allocations
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1.25, fontSize: "0.68rem", textAlign: "center" }}
          >
            * Default LOH threshold; the size includes object overhead.
            <br />
            <br />* A small clarification: With Server GC enabled, .NET typically creates one
            managed heap per logical CPU available to the process. As you might have guessed,
            garbage collection can then run in parallel, with a dedicated GC thread for each heap.
          </Typography>
        </Box>
      </Box>
      <Typography
        id="managed-heap-caption"
        component="figcaption"
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, lineHeight: 1.6 }}
      >
        Figure 3. Inside the Managed Heap: SOH, LOH, and POH (conceptual, not to scale).
      </Typography>
    </Box>
  );
}

// function FigurePlaceholder({ number, title }: { number: number; title: string }) {
//   return (
//     <Box component="figure" sx={{ my: 3, mx: 0 }}>
//       <Box
//         sx={{
//           minHeight: 132,
//           border: "1px dashed",
//           borderColor: "divider",
//           borderRadius: 2,
//           bgcolor: "action.hover",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           p: 2,
//         }}
//       >
//         <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
//           Figure {number} · Illustration to be added
//         </Typography>
//       </Box>
//       <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//         Figure {number}. {title}.
//       </Typography>
//     </Box>
//   );
// }

export default function MemoryInDotNet() {
  const theme = useTheme();
  return (
    <PublicationLayout
      publication={publication}
      references={references}
      toc={toc}
    >
      <Paragraph>
        Every engineer building professional .NET applications should understand where data is
        stored, how different memory regions behave, and how code can influence allocation and
        lifetime. This article maps these regions so developers can recognize and distinguish them
        in real applications.
      </Paragraph>

      <SectionHeading id="memory-overview">1. Memory Overview</SectionHeading>
      <Paragraph>
        A .NET process uses several kinds of memory, each with different purposes and lifetime
        rules. The most relevant to everyday C# development are the thread stack and the managed
        heap. Other areas hold static data, native allocations, and executable code.
      </Paragraph>
      <MemoryLayoutFigure />
      <Paragraph>
        The diagram illustrates a process with a single thread. Each additional thread has its own
        stack, while the managed heap, static storage, and executable code belong to the process and
        are shared by all its threads. CPU registers and caches are shown separately because they
        are hardware resources, not regions of the process's virtual address space.
      </Paragraph>

      <SectionHeading id="thread-stack">2. Thread Stack</SectionHeading>
      <Paragraph>
        Let's start with the thread stack and one of the fundamental features of .NET: the
        distinction between value types and reference types. Value types can be defined using the
        <code>struct</code> keyword, while reference types can be defined using <code>class</code>.
        It would be interesting to represent the same data using both types and see how and where
        they are stored in memory. Let's define a simple order using both approaches:
      </Paragraph>
      <CodeExample
        code={`struct OrderStruct {
    public int OrderId;
    public decimal Price;
}

class OrderClass {
    public int OrderId;
    public decimal Price;
}`}
      />
      <Paragraph>
        It is worth mentioning that most primitive types in .NET, including int, byte, double, and
        many others, are defined as structs. When declared as local variables, such types store
        their data directly on the stack, unlike reference types.
      </Paragraph>
      <Paragraph>
        Let's look at a simple example of declaring local variables using both our custom types and
        some primitive types:
      </Paragraph>
      <CodeExample
        code={`int number = 7;
decimal price = 100.01m;
OrderClass orderClass = new OrderClass() { OrderId = 1, Price = 10.50m };
OrderStruct orderStruct = new OrderStruct() { OrderId = 2, Price = 4.60m };`}
      />
      <Paragraph>Now let's see how these variables are arranged in memory:</Paragraph>
      <Box
        component="img"
        src={
          theme.palette.mode === "dark"
            ? "/images/articles/memory-in-dotnet/stack_memory_layout_dark.svg"
            : "/images/articles/memory-in-dotnet/stack_memory_layout_light.svg"
        }
        alt="Thread stack and managed heap memory layout in .NET"
        sx={{ width: "100%", height: "auto", display: "block" }}
      />
      <Typography
        id="memory-state"
        component="figcaption"
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, lineHeight: 1.6 }}
      >
        Figure 2. Memory state.
      </Typography>
      <br />
      <Paragraph>
        With the primitive value types and our OrderStruct, everything is straightforward. Their
        data is stored directly on the stack, much like in C and C++, with possible gaps due to
        memory alignment.
      </Paragraph>
      <Paragraph>
        But what I would like to draw particular attention to is the creation of our OrderClass
        instance:
        <br />
        Creating an instance of a reference type involves two separate entities in memory:
      </Paragraph>

      <Box component="ul" sx={{ pl: 4, my: 1.5 }}>
        <Typography component="li" variant="body1">
          The object itself.
        </Typography>
        <Typography component="li" variant="body1">
          A value-like reference to that object.
        </Typography>
      </Box>

      <Paragraph>
        We'll explore this in more detail in the Managed Heap section. For now, let's focus on the
        fact that creating a reference-type instance in our example also allocates bytes on the
        stack to store the reference.
      </Paragraph>

      <Paragraph>
        The reference itself is pointer-sized — 4 bytes in a 32-bit process or 8 bytes in a 64-bit
        process — since it stores the memory address of the object.
      </Paragraph>

      <Paragraph>
        So far, we've covered the most common ways data is stored on the stack. However, there's
        another, less commonly used technique that can significantly improve performance in certain
        scenarios: allocating an array on the stack instead of the managed heap.
      </Paragraph>
      <CodeExample code={`Span<byte> buffer = stackalloc byte[1024];`} />
      <Paragraph>
        As we'll see later, the performance improvement in this case can come from reducing the
        workload of the Garbage Collector, since it doesn't manage memory allocated on the stack. To
        summarize this section on the Thread Stack, we can draw the following conclusion:
      </Paragraph>
      <Paragraph>
        In most cases, the stack is the fastest and therefore the preferred memory region for
        storing local variables. This is why Microsoft designed most primitive types in .NET as
        structs. Knowing how to keep data on the stack rather than allocate it on the managed heap
        is one of the techniques experienced .NET engineers use to build high-performance and,
        consequently, scalable applications. Unfortunately, not everything can be placed on the
        stack. So let's move on to the next memory region, where most of our data lives: the Managed
        Heap.
      </Paragraph>

      <SectionHeading id="managed-heap">3. Managed Heap</SectionHeading>
      <Paragraph>
        In typical .NET applications, most objects we create are instances of reference types rather
        than value types. Although we've established in the previous section that stack memory is
        generally preferable to heap allocations, we cannot always store our data on the stack.
        Sometimes the required lifetime of our data or the need for reference semantics makes heap
        allocation necessary.
      </Paragraph>

      <Paragraph>
        The Managed Heap is not a single continuous region of memory. Instead, it consists of three
        distinct areas:
      </Paragraph>

      <Box component="ul" sx={{ pl: 4, mt: 0, mb: 3 }}>
        <Typography component="li" variant="body1">
          Small Object Heap (SOH)
        </Typography>
        <Typography component="li" variant="body1">
          Large Object Heap (LOH)
        </Typography>
        <Typography component="li" variant="body1">
          Pinned Object Heap (POH)
        </Typography>
      </Box>
      <ManagedHeapFigure />
      <Subheading id="soh">3.1 Small Object Heap (SOH)</Subheading>
      <Paragraph>
        Of the three managed heap areas, the SOH is typically the most heavily used, since
        applications generally create far more small objects than large or pinned ones.
      </Paragraph>
      <Paragraph>
        The SOH is also more complex than the other two areas. It is logically divided into three
        generations: Gen 0, Gen 1, and Gen 2. New small objects are generally allocated in Gen 0. If
        they survive garbage collection, they may eventually be promoted to Gen 1 and then Gen 2.
      </Paragraph>
      <CodeExample
        code={`OrderClass order = new();
int[] numbers = new int[100];`}
      />
      <Paragraph>
        We'll explore how the Garbage Collector manages these generations in more detail in our
        separate article on .NET Garbage Collection. For now, it's enough to understand that the SOH
        is where most of our managed objects are allocated.
      </Paragraph>

      <Subheading id="loh">3.2 Large Object Heap (LOH)</Subheading>
      <Paragraph>
        By default, a managed object with a total size of at least 85,000 bytes is allocated on the
        LOH. The threshold applies to the object size, including its overhead, not only its payload,
        and the runtime allows this threshold to be increased.
      </Paragraph>
      <CodeExample
        code={`byte[] buffer = new byte[100_000]; // LOH in the default configuration`}
      />
      <Paragraph>
        LOH allocations are collected as part of Gen 2 collections. Repeatedly creating and
        discarding large objects can therefore be costly. We will examine GC behavior and LOH
        fragmentation separately in the article dedicated to garbage collection.
      </Paragraph>

      <Subheading id="poh">3.3 Pinned Object Heap (POH)</Subheading>
      <Paragraph>
        The POH provides a dedicated home for certain pinned managed allocations. Pinning keeps an
        object at a stable address, which is useful when managed data must be shared with native
        code. Not every pinned object is placed in the POH.
      </Paragraph>
      <CodeExample code={`byte[] buffer = GC.AllocateArray<byte>(1024, pinned: true);`} />
      <Paragraph>
        It is worth mentioning that the POH is rarely, if ever, used in typical .NET applications.
        In many projects, you are unlikely to find even a single explicit allocation to it.
      </Paragraph>

      <Subheading id="managed-heap-summary">3.4 Performance Considerations</Subheading>
      <Paragraph>
        Memory allocation on the managed heap is very fast, often approaching the speed of stack
        allocation. This is especially efficient for short-lived objects that are collected in Gen
        0. It might seem that we can use the managed heap freely without worrying too much about
        performance. However, I want to draw your attention to another cost: the memory overhead of
        reference types.
      </Paragraph>
      <Paragraph>
        As we saw in the earlier OrderClass example, each object requires an additional 16 bytes on
        x64 for its object header and method table pointer. Each reference also occupies 8 bytes.
        Now consider an array of 1,000 OrderClass instances:
      </Paragraph>
      <CodeExample
        code={`OrderClass[] orders = new OrderClass[1000];

for (int i = 0; i < orders.Length; i++)
    orders[i] = new OrderClass();`}
      />
      <Paragraph>
        The array contains 1,000 references (8,000 bytes), while the object headers require another
        16,000 bytes. That is approximately 24 KB of additional memory, excluding the actual data
        and the array's own overhead. Not a huge amount on its own.
      </Paragraph>
      <Paragraph>
        However, on a web server processing thousands of requests, repeated allocations like these
        can generate considerable memory overhead and additional work for the garbage collector.
        Depending on the workload, this can negatively affect the application's performance and
        scalability.
      </Paragraph>
      <Paragraph>
        Such costs are worth considering when designing high-load systems. In future articles, we
        will explore how to identify these problems and optimize memory usage.
      </Paragraph>

      <SectionHeading id="static-storage">4. Static Storage</SectionHeading>
      <Paragraph>
        A static field belongs to a type rather than to an instance. Static fields are not kept on a
        thread's call stack. CoreCLR uses different backing storage for GC-tracked and non-GC static
        fields; for this overview, the diagram groups them as static storage.
      </Paragraph>
      <CodeExample
        code={`public static class Storage
{
    public static int Counter = 7;
    public static byte[] Buffer = new byte[300_000];
}`}
      />
      <Paragraph>
        Here, <code>Counter</code> stores a 4-byte value, while <code>Buffer</code> stores a
        reference (typically 8 bytes on x64). The approximately 300 KB array is a separate managed
        object on the LOH. Reassigning <code>Buffer</code> does not change the static field's size;
        it changes which object the field refers to.
      </Paragraph>
      <Paragraph>
        Static storage is not necessarily a single contiguous block allocated in full when the
        process starts. Runtime type initialization and generic type instantiations influence which
        static data is created and when.
      </Paragraph>

      <SectionHeading id="code-memory">5. Code Memory</SectionHeading>
      <Paragraph>
        The process also needs executable memory. The JIT places generated machine instructions into
        executable memory; precompiled native code may also be mapped into the process. This memory
        serves a different purpose from the stack or managed objects.
      </Paragraph>

      <SectionHeading id="native-memory">6. Native and Unmanaged Memory</SectionHeading>
      <Paragraph>
        Not all process memory belongs to the managed heap. Native libraries, OS APIs, and
        application code can allocate memory outside GC management. That control comes with an
        obligation to manage ownership and release the allocation appropriately.
      </Paragraph>
      <CodeExample
        code={`using System.Runtime.InteropServices;

IntPtr memory = Marshal.AllocHGlobal(1024);
try
{
    Marshal.WriteByte(memory, 0, 42); // Write one byte at offset 0.
}
finally
{
    Marshal.FreeHGlobal(memory);
}`}
      />
      <Paragraph>
        This example uses <code>Marshal.AllocHGlobal</code> to avoid C# unsafe pointer syntax. The
        returned <code>IntPtr</code> is an address, not a safe handle: incorrect access or failure
        to release the allocation can still cause serious problems. The GC does not free this memory
        automatically. For new applications on modern .NET, <code>NativeMemory</code>
        is the preferred low-level allocator, although its pointer-based API requires an unsafe
        context.
      </Paragraph>

      <SectionHeading id="cpu-storage">7. CPU Registers and Caches</SectionHeading>
      <Paragraph>
        Registers and L1/L2/L3 caches are hardware storage, not ordinary allocations in a .NET
        process. The JIT chooses instructions and may keep values in registers; the CPU manages
        cache contents. C# does not offer a general way to place a variable into a chosen register
        or cache level.
      </Paragraph>

      <Divider sx={{ mt: 4, mb: 2 }} />
      <SectionHeading id="where-data-lives">8. Putting It All Together</SectionHeading>
      <Paragraph>
        So the purpose of this article is to identify the different memory regions used by .NET
        applications and learn to distinguish them in practice. Instead of thinking of variables and
        arrays as simply being created somewhere in memory, we should understand where their data
        actually lives.
      </Paragraph>
      <Paragraph>
        Let's explore the different ways to allocate memory for the same purpose—for example, a
        simple array.
      </Paragraph>
      <Paragraph>
        <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
          Option A:
        </Box>
        <br />
        Traditionally, we create a byte array this way:
      </Paragraph>
      <CodeExample title="Managed array · SOH" code={`byte[] buffer = new byte[1024];`} />
      <Paragraph>
        <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
          Option B:
        </Box>
        <br />
        But this is not the only way to do that. Let's try to allocate bytes of this array on the
        stack:
      </Paragraph>

      {/* <Subheading id="stack-buffer">A short-lived buffer: the stack</Subheading> */}
      <CodeExample
        title="Stack · 1,024 bytes"
        code={`Span<byte> buffer = stackalloc byte[1024];`}
      />
      <Paragraph>
        This does not create a managed array, and the stack allocation is automatically discarded
        when the method returns.
      </Paragraph>

      {/* <Subheading id="pinned-buffer">A stable address: the POH</Subheading> */}
      <Paragraph>
        <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
          Option C:
        </Box>
        <br />
        Another option is the POH. If a buffer must remain at a stable address, for example during
        repeated native interop, it can be allocated as a pinned array in the POH. The reason to
        choose the POH is pinning, not merely that the buffer will be reused for a long time.
      </Paragraph>
      <CodeExample
        title="Pinned managed array · POH"
        code={`byte[] buffer = GC.AllocateArray<byte>(1024, pinned: true);`}
      />

      {/* <Subheading id="pooled-buffer">Frequent reuse: a managed buffer pool</Subheading> */}
      <Paragraph>
        <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
          Option D:
        </Box>
        <br />
        When temporary buffers are repeatedly needed, an array pool is often more appropriate.
        Renting and returning arrays can reduce new allocations and the resulting GC pressure.
        Pooled arrays remain managed objects, usually in the SOH for this size; retained arrays may
        eventually reach Gen 2, but the pool does not guarantee a particular generation.
      </Paragraph>
      <CodeExample
        title="Reusable managed array · ArrayPool"
        code={`using System.Buffers;

byte[] rented = ArrayPool<byte>.Shared.Rent(1024);
try
{
    Span<byte> buffer = rented.AsSpan(0, 1024);
    buffer[0] = 42;
}
finally
{
    ArrayPool<byte>.Shared.Return(rented, clearArray: true);
}`}
      />
      <Paragraph>
        A rented array may be larger than requested and is not guaranteed to contain zeros. After
        returning it, the caller must not access it again.
      </Paragraph>

      {/* <Subheading id="native-buffer">Manual control: native memory</Subheading> */}
      <Paragraph>
        <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
          Option E:
        </Box>
        <br />
        And finally, we can allocate 1,024 bytes outside the managed heap, as shown earlier with
        <code> Marshal.AllocHGlobal</code>. This is useful for specific interop requirements, but is
        not a general replacement for managed arrays: the caller owns the allocation and must
        release it explicitly:
      </Paragraph>
      <CodeExample
        title="Unmanaged Heap"
        code={`
IntPtr memory = Marshal.AllocHGlobal(1024);
Marshal.WriteByte(memory, 0, 42);
Marshal.FreeHGlobal(memory);`}
      />
      {/* <FigurePlaceholder number={3} title="Different Storage Strategies for a 1 KB Buffer" /> */}

      <Paragraph>
        None of these approaches is universally the best. However, understanding their differences
        and knowing when to use each can help you build exceptionally performant and scalable .NET
        applications.
      </Paragraph>
      <Paragraph>
        This knowledge allows you to push .NET beyond its default capabilities—and, in certain
        scenarios, outperform solutions built with Java, Node.js, Go, Rust, and other popular
        technologies. The key is to make informed engineering decisions and validate their results
        against real-world workloads rather than assumptions.
      </Paragraph>
      <Paragraph>
        For a deeper understanding of the memory management mechanisms introduced in this overview,
        I invite you to explore my other articles:
        <br />
        ...
      </Paragraph>
    </PublicationLayout>
  );
}
