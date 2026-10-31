import { Box, Divider, Typography } from "@mui/material";
import type { ReactNode } from "react";
import ArticleLayout from "../../components/ArticleLayout";

// Draft article: update the publication date when the text is ready to go live.
const draftPublicationDate = "2026-10-30";

export function meta() {
  return [
    { title: "Memory in .NET | Programming in Depth" },
    {
      name: "description",
      content:
        "A practical map of memory in CoreCLR: thread stacks, managed heaps (SOH, LOH, POH), static storage, native memory and executable code.",
    },
  ];
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
    title: "Microsoft Learn — EDITBIN /STACK",
    url: "https://learn.microsoft.com/en-us/cpp/build/reference/stack",
  },
  {
    title: "Microsoft Learn — Threading configuration (.NET 10+)",
    url: "https://learn.microsoft.com/en-us/dotnet/core/runtime-config/threading",
  },
];

const contentSx = { mb: 2.5, lineHeight: 1.75 } as const;
const headingSx = { mt: 5, mb: 2, scrollMarginTop: "96px" } as const;
const subheadingSx = { mt: 3.5, mb: 1.5, scrollMarginTop: "96px" } as const;

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
          <Box component="code" sx={{ display: "block", fontFamily: '"Cascadia Code", Consolas, Monaco, monospace' }}>
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
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>SOH</Typography>
              <Typography variant="caption" sx={{ lineHeight: 1.2 }}>Small Object Heap</Typography>
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
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Gen 0</Typography>
                <Typography aria-hidden="true" variant="caption" color="primary.main" sx={{ lineHeight: 1.1 }}>↓</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Gen 1</Typography>
                <Typography aria-hidden="true" variant="caption" color="primary.main" sx={{ lineHeight: 1.1 }}>↓</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Gen 2</Typography>
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
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>LOH</Typography>
              <Typography variant="caption" sx={{ display: "block", lineHeight: 1.2 }}>
                Large Object Heap
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
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
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>POH</Typography>
              <Typography variant="caption" sx={{ display: "block", lineHeight: 1.2 }}>
                Pinned Object Heap
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
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
        Figure 2. Inside the Managed Heap: SOH, LOH, and POH (conceptual, not to scale).
      </Typography>
    </Box>
  );
}

function FigurePlaceholder({ number, title }: { number: number; title: string }) {
  return (
    <Box component="figure" sx={{ my: 3, mx: 0 }}>
      <Box
        sx={{
          minHeight: 132,
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "action.hover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          Figure {number} · Illustration to be added
        </Typography>
      </Box>
      <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Figure {number}. {title}.
      </Typography>
    </Box>
  );
}

export default function MemoryInDotNet() {
  return (
    <ArticleLayout
      title="Memory in .NET"
      category=".NET"
      publishedAt={draftPublicationDate}
      summary="Where .NET data lives, what controls its lifetime, and which choices are actually yours."
      references={references}
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
        stack, while the managed heap, static storage, and executable code belong to the process
        rather than to any individual thread. CPU registers and caches are shown separately because
        they are hardware resources, not regions of the process's virtual address space.
      </Paragraph>

      <SectionHeading id="thread-stack">2. Thread Stack</SectionHeading>
      <Paragraph>
        Each thread has its own stack. It tracks nested method calls and may contain local values,
        references, return addresses, and other execution state. Like the call stack in C and C++,
        its frames follow the flow of method calls.
      </Paragraph>
      <CodeExample
        code={`int number = 7;               // 4-byte value
double factor = 1.5;          // 8-byte value
Customer customer = new();    // 8-byte reference on x64; object usually on the heap`}
      />
      <Paragraph>
        In a simplified x64 stack-frame model, <code>number</code> occupies 4 bytes,
        <code> factor</code> occupies 8 bytes, and <code>customer</code> holds an 8-byte reference —
        all within the thread stack. The <code>Customer</code> object's data, however, resides
        separately, typically in the Small Object Heap (SOH).
      </Paragraph>
      <Paragraph>
        Arrays make this distinction even clearer. Consider a small byte array with 100 elements.
        Besides its element data, the array object contains header and length information:
      </Paragraph>
      <CodeExample
        code={`byte[] buffer = new byte[100]; // x64: 8-byte local reference + SOH array`}
      />
      <Paragraph>
        The local variable <code>buffer</code> occupies 8 bytes on the stack and holds a reference
        to an array in the SOH. The array's 100 bytes of element data, together with its metadata,
        are stored separately in the managed heap. The array belongs to the SOH because its total
        size is below the LOH threshold. If we only need a small temporary buffer within the
        current method, we can allocate those bytes directly on the stack instead:
      </Paragraph>
      <CodeExample
        code={`Span<byte> buffer = stackalloc byte[100]; // 100 contiguous bytes on the stack`}
      />
      <Paragraph>
        This allocates 100 contiguous bytes on the stack without creating a managed array.
        <code> Span&lt;byte&gt;</code> describes that memory; it does not own a separate 100-byte
        array. Unlike a newly created managed array, <code>stackalloc</code> memory is not guaranteed
        to be zero-initialized. Stack-allocated data must not outlive its stack frame, and large
        allocations can cause a stack overflow.
      </Paragraph>
      <Paragraph>
        These examples illustrate a simplified memory model, not guaranteed stack slots. With
        JIT optimizations enabled, local values may be held in CPU registers, removed entirely,
        or, in some cases, reference-type heap allocations may be avoided through escape analysis.
      </Paragraph>
      <Paragraph>
        Stack size depends on the runtime, operating system, and how a thread is created. On
        Windows, <code>EDITBIN /STACK</code> can change an executable's stack reservation. On Linux,
        launching a process with <code>ulimit -s</code> sets the main thread's stack limit and may
        affect other threads depending on the native threading implementation. Starting with .NET 10,
        <code> System.Threading.DefaultStackSize</code> in <code>runtimeconfig.json</code> can set
        the default for threads created by the runtime on either platform. The <code>Thread</code>{" "}
        constructor also offers a stack-size argument. These are specialized controls.
      </Paragraph>

      <SectionHeading id="managed-heap">3. Managed Heap</SectionHeading>
      <Paragraph>
        The managed heap is the usual home for managed objects. The CLR tracks their reachability
        and reclaims unreachable objects through garbage collection. The heap is commonly viewed as
        three areas: SOH, LOH, and POH.
      </Paragraph>
      <ManagedHeapFigure />

      <Subheading id="soh">3.1 Small Object Heap (SOH)</Subheading>
      <Paragraph>
        The SOH holds ordinary managed objects below the large-object threshold. Its generations are
        Gen 0, Gen 1, and Gen 2. New small objects generally start in Gen 0; surviving a collection
        may promote them to an older generation.
      </Paragraph>
      <CodeExample
        code={`Customer customer = new();
int[] numbers = new int[100];`}
      />
      <Paragraph>
        Generational collection is designed around a common pattern: many objects become unreachable
        quickly. Ideally, most temporary objects die young. Frequent promotion of temporary data
        into Gen 2 may increase collection costs and is worth investigating, but promotion alone
        does not prove a design problem.
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
        This example uses <code>Marshal.AllocHGlobal</code> to avoid C# unsafe pointer syntax.
        The returned <code>IntPtr</code> is an address, not a safe handle: incorrect access or
        failure to release the allocation can still cause serious problems. The GC does not free
        this memory automatically. For new applications on modern .NET, <code>NativeMemory</code>
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

      <SectionHeading id="where-data-lives">8. Where Does the Data Actually Live?</SectionHeading>
      <Paragraph>
        These examples illustrate why values, variables, references, and objects must be
        distinguished:
      </Paragraph>
      <CodeExample
        code={`int number = 7;                    // Local value: stack/register/optimized away
Customer customer = new();         // Local reference + managed object
byte[] buffer = new byte[100_000]; // Local reference + LOH array`}
      />
      <FigurePlaceholder number={3} title="Values, References, and Actual Storage" />
      <Paragraph>
        The type of a value alone does not determine its memory region. A value-type field inside a
        heap object is stored as part of that object; a local variable may never occupy a stack slot
        at all. What matters is the storage context and what the runtime can optimize.
      </Paragraph>

      <Divider sx={{ mt: 4, mb: 2 }} />
      <SectionHeading id="conclusion">Conclusion</SectionHeading>
      <Paragraph>
        The stack, managed heap, static storage, code memory, and native memory have different
        strengths and limitations. Understanding where data can live—and who manages its
        lifetime—helps us reduce unnecessary memory pressure and make better engineering decisions.
        The goal is not to eliminate heap allocations, but to use memory deliberately.
      </Paragraph>
    </ArticleLayout>
  );
}
