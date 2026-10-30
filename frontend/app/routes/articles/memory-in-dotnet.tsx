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
    title: "Microsoft Learn — EDITBIN /STACK",
    url: "https://learn.microsoft.com/en-us/cpp/build/reference/stack",
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

function CodeExample({ code, title }: { code: string; title?: string }) {
  return (
    <Box sx={{ my: 2.5 }}>
      {title && (
        <Typography component="p" variant="caption" color="text.secondary" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      <Box component="pre" sx={{ m: 0, fontSize: "0.88rem" }}>
        <code>{code}</code>
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

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.25 }}>
          <Box
            sx={{
              borderLeft: "2px solid",
              borderColor: "text.disabled",
              px: 1.5,
              py: 0.25,
              maxWidth: 310,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
              CPU: registers · L1 · L2 · L3
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Hardware storage, not a separate region of the process address space
            </Typography>
          </Box>
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
        lifetime. This article explores those regions, their characteristics, and their impact on
        application performance.
      </Paragraph>

      <SectionHeading id="memory-overview">1. Memory Overview</SectionHeading>
      <Paragraph>
        A .NET process uses several kinds of memory, each with different purposes and lifetime
        rules. The most relevant to everyday C# development are the thread stack and the managed
        heap. Other areas hold static data, native allocations, and executable code.
      </Paragraph>
      <MemoryLayoutFigure />
      <Paragraph>
        The diagram shows a process with one thread. A new thread means another stack, while managed
        objects, static storage, and executable code always remain part of the same process.
      </Paragraph>

      <SectionHeading id="thread-stack">2. Thread Stack</SectionHeading>
      <Paragraph>
        Every thread has its own stack. It supports method execution: stack frames can contain local
        values, references, saved state, and information needed to resume a caller. Like the stack
        in C and C++, it follows the nested flow of function calls.
      </Paragraph>
      <CodeExample
        code={`int number = 7;
double factor = 1.5;
Customer customer = new();`}
      />
      <Paragraph>
        An <code>int</code> represents 32 bits of value; on a typical 64-bit CoreCLR process, an
        object reference occupies 8 bytes. The <code>Customer</code> object itself is normally
        allocated in the managed heap. The local reference and the object are different things.
      </Paragraph>
      <Paragraph>
        This is a useful conceptual model, not a promise about physical placement. The optimizing
        JIT may keep locals in registers, eliminate them, or move execution state elsewhere when
        necessary. Stack space is limited, and data allocated directly on a stack cannot outlive the
        corresponding stack frame.
      </Paragraph>
      <Paragraph>
        Stack size depends on the runtime, operating system, and how a thread is created. On
        Windows, the executable's stack reservation can be adjusted with <code>EDITBIN /STACK</code>
        ; an explicitly created <code>Thread</code> can also request a stack size. These are
        specialized controls, not everyday memory-management tools.
      </Paragraph>

      <SectionHeading id="managed-heap">3. Managed Heap</SectionHeading>
      <Paragraph>
        Most managed objects are allocated on the managed heap. The CLR tracks their reachability
        and reclaims unreachable objects through garbage collection. The heap is commonly viewed as
        three areas: SOH, LOH, and POH.
      </Paragraph>
      <FigurePlaceholder number={2} title="Inside the Managed Heap: SOH, LOH, and POH" />

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

unsafe
{
    void* memory = NativeMemory.Alloc(1024);
    try
    {
        // Use the native buffer.
    }
    finally
    {
        NativeMemory.Free(memory);
    }
}`}
      />
      <Paragraph>
        Native allocation is not inherently an anti-pattern; it is useful for interop and
        specialized performance work. The risk is an allocation whose lifetime is not correctly
        managed. The GC does not automatically free memory returned by
        <code> NativeMemory.Alloc</code>.
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
