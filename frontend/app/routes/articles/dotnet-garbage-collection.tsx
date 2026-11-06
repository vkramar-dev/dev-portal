import { Link } from "react-router";
import PublicationLayout from "../../components/publications/PublicationLayout";
import {
  CodeExample,
  PublicationFigure,
  PublicationSection,
} from "../../components/publications/PublicationElements";
import { GcGenerationsDiagram } from "../../components/publications/PublicationDiagrams";
import { Box, Typography } from "@mui/material";

export function meta() {
  return [
    { title: "Understanding .NET Garbage Collection | Programming in Depth" },
    {
      name: "description",
      content:
        "How .NET garbage collection works: managed heap allocation, Gen 0/1/2, object survival, compaction, and the large object heap.",
    },
    // Keep the unfinished article out of search results until it is ready to publish.
    { name: "robots", content: "noindex, nofollow" },
  ];
}

const toc = [
  { id: "managed-memory", label: "Managed Memory and the GC" },
  { id: "soh", label: "Small Object Heap" },
  { id: "generations", label: "Generations" },
  { id: "compaction", label: "Garbage Collection and Compaction" },
  { id: "loh", label: "Large Object Heap" },
  { id: "conclusion", label: "Conclusion" },
  { id: "references", label: "References" },
];

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
    title: "Microsoft Learn — Garbage collector configuration",
    url: "https://learn.microsoft.com/en-us/dotnet/core/runtime-config/garbage-collector#large-object-heap-threshold",
  },
];

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
        Figure 1. Inside the Managed Heap: SOH, LOH, and POH (conceptual, not to scale).
      </Typography>
    </Box>
  );
}

export default function DotNetGarbageCollection() {
  return (
    <PublicationLayout
      kind="article"
      title="Understanding .NET Garbage Collection"
      category=".NET · Runtime"
      summary="Allocations, generations, and object survival."
      toc={toc}
      references={references}
      related={[{ title: "Memory in .NET", to: "/articles/memory-in-dotnet" }]}
    >
      <PublicationSection id="managed-memory" title="Managed Memory and the GC">
        <p>
          Most objects in a typical .NET application are allocated on the managed heap. Allocating
          memory there is very fast, often approaching the speed of stack allocation. Reclaiming
          that memory, however, is not as straightforward as releasing a stack frame.
        </p>
        <p>
          Unlike stack memory, which is released as stack frames unwind, managed heap memory is
          reclaimed automatically by a runtime component called the
          <strong> Garbage Collector (GC)</strong>.
        </p>
        <p>
          As we discussed in <Link to="/articles/memory-in-dotnet">Memory in .NET</Link>, the
          managed heap consists of three main areas:
        </p>
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
        <p>
          With Server GC enabled, the runtime typically creates a separate GC heap for each
          available logical processor, although configuration and resource limits can reduce the
          actual number of heaps.
        </p>
        <p>
          In many applications, the SOH handles most allocations. The LOH is used for large objects,
          while the POH serves more specialized scenarios. For this reason, we will start with the
          SOH.
        </p>
      </PublicationSection>

      <PublicationSection id="soh" title="Small Object Heap">
        <p>
          By default, objects whose total size is <strong>85,000 bytes or more </strong>
          are allocated on the LOH. Smaller objects are normally allocated on the SOH. The threshold
          can be increased, but it cannot be configured below the default value.
        </p>
        <p>
          For example, we can raise the threshold to 120,000 bytes using
          <code> runtimeconfig.template.json</code>:
        </p>
        <CodeExample
          language="JSON"
          code={`{
  "configProperties": {
    "System.GC.LOHThreshold": 120000
  }
}`}
        />
        <p>Alternatively, we can specify it in the project file:</p>
        <CodeExample
          language="XML"
          code={`<ItemGroup>
  <RuntimeHostConfigurationOption
    Include="System.GC.LOHThreshold"
    Value="120000" />
</ItemGroup>`}
        />
        <p>
          Memory allocation in the SOH is somewhat similar to stack allocation. The runtime
          maintains an allocation pointer and typically places new objects sequentially in available
          space. On the fast allocation path, allocating a small object requires little more than
          advancing that pointer.
        </p>
        <p>
          So far, everything is relatively simple. Reclaiming memory is more complicated, and this
          is where the GC comes into play.
        </p>
        <p>
          The GC is triggered according to runtime conditions rather than at predictable points in
          application code. During a collection, it traces references from <strong>GC roots</strong>
          , including references in stack frames, static fields, and registers, to determine which
          objects are still reachable.
        </p>
        <p>
          Objects that are no longer reachable are considered garbage, and their memory can be
          reclaimed. This does not mean that the GC physically erases every byte of each discarded
          object. The memory becomes available for future allocations.
        </p>
      </PublicationSection>

      <PublicationSection id="generations" title="Generations">
        <p>
          To understand when objects are collected, we need to look at the generational structure of
          the SOH.
        </p>
        <p>
          The SOH has three logical generations: <strong>Gen 0, Gen 1, and Gen 2</strong>. New small
          objects are allocated in Gen 0. An object that survives a Gen 0 collection is normally
          promoted to Gen 1. If it survives a Gen 1 collection, it is promoted to Gen 2, where it
          stays until it becomes unreachable and is collected.
        </p>
        <PublicationFigure
          caption="Figure 02 · Generations and object survival"
          note="A conceptual progression, not a literal memory layout. Promotion depends on an object surviving a collection of its generation."
        >
          <GcGenerationsDiagram />
        </PublicationFigure>
        <p>
          This approach is based on a simple observation: most objects die young. By collecting
          younger generations more frequently, the GC avoids repeatedly examining objects that have
          already survived multiple collections.
        </p>
        <p>
          A Gen 0 collection processes Gen 0. A Gen 1 collection includes Gen 0 and Gen 1. A Gen 2
          collection, also called a <strong>full garbage collection</strong>, includes all three
          generations and also collects the LOH and POH.
        </p>
      </PublicationSection>

      <PublicationSection id="compaction" title="Garbage Collection and Compaction">
        <p>
          At this point, it is important to distinguish between two related operations:{" "}
          <strong>garbage collection</strong> and <strong>compaction</strong>.
        </p>
        <p>
          Garbage collection determines which objects are still reachable and reclaims memory
          occupied by unreachable objects. Compaction moves surviving objects closer together,
          eliminating gaps and creating contiguous free space for subsequent allocations.
        </p>
        <p>
          Compaction is not exclusive to Gen 2. It can occur during collections of younger
          generations, including Gen 0. Moving objects also requires the GC to update references to
          their new locations, which adds work.
        </p>
        <p>
          Full collections can be particularly expensive because they cover a much larger portion of
          the heap. Their actual cost depends on the amount of live data and the work required to
          process it. A Gen 2 collection does not necessarily mean that every surviving object is
          moved; the GC can sometimes reclaim memory without compacting it.
        </p>
        <p>
          Ideally, temporary objects become unreachable while they are still in younger generations.
          This reduces the amount of surviving data the GC must process and helps avoid frequent
          full collections.
        </p>
      </PublicationSection>

      <PublicationSection id="loh" title="Large Object Heap">
        <p>
          We should also return briefly to the LOH, because it is collected together with Gen 2.
        </p>
        <p>
          Unlike the SOH, the LOH does not use the same promotion mechanism through Gen 0, Gen 1,
          and Gen 2. Large objects are allocated directly on the LOH, and unreachable ones are
          reclaimed during Gen 2 collections.
        </p>
        <p>
          Because moving large objects can be expensive, the GC normally does not compact the LOH.
          Instead, it identifies unused blocks and makes them available for later large-object
          allocations. New objects can reuse those free blocks without moving the survivors.
        </p>
        <p>
          LOH compaction is supported, but it is not the usual behavior unless requested or
          triggered by certain memory-limit conditions.
        </p>
      </PublicationSection>

      <PublicationSection id="conclusion" title="Conclusion">
        <p>
          Allocating new objects on the managed heap is highly efficient. When most objects become
          unreachable while still in Gen 0, the overall cost of memory management can be relatively
          low, sometimes approaching the efficiency of stack-based allocation.
        </p>
        <p>
          However, some objects inevitably survive their first garbage collection and are promoted
          to Gen 1. Others survive even longer and eventually reach Gen 2.
        </p>
        <p>
          Although promotion does not necessarily involve physically copying an object, processing
          and potentially relocating surviving objects requires additional work from the GC.
        </p>
        <p>
          If an object eventually becomes unreachable in Gen 2, all the effort spent keeping it
          alive through earlier collections may have been unnecessary.
        </p>
        <p>
          When this happens to a small number of objects, the impact is usually negligible. But if
          large numbers of temporary objects, or significant amounts of memory, consistently survive
          into Gen 2 before becoming unreachable, the resulting GC overhead may become a performance
          concern.
        </p>
        <p>
          This is particularly important when developing high-performance, scalable applications.
        </p>

        <h3 id="identifying-gc-problems">Identifying GC Performance Problems</h3>
        <p>
          The first question is: <strong>How can we identify these problems?</strong>
        </p>
        <p>
          Our application may be running without errors, responding to requests, and appearing
          perfectly healthy. But how do we know what is happening inside the managed heap?
        </p>
        <p>This is where .NET profiling tools become valuable.</p>
        <p>
          A good .NET memory profiler can provide detailed information about allocation rates,
          garbage collection frequency, object survival, memory consumption across generations, and
          other GC-related metrics.
        </p>
        <p>
          I usually use <strong>PerfView</strong>, but several other tools provide similar
          capabilities.
        </p>
        <p>
          To obtain meaningful results, profiling should be performed under realistic workloads. We
          can investigate a production environment during peak traffic, provided that we account for
          the profiler's overhead. However, I generally prefer running dedicated load tests in a
          production-like environment.
        </p>
        <p>
          For web applications, tools such as WebSurge or k6 can help simulate realistic traffic.
        </p>
        <p>
          One particularly interesting pattern to investigate is the promotion of temporary objects
          into Gen 2, followed by their eventual collection. Another is frequent allocation and
          reclamation of large objects in the LOH.
        </p>
        <p>
          Such behavior does not necessarily indicate a problem, but it deserves closer examination
          when accompanied by high GC CPU usage, memory pressure, or increased response times.
        </p>
        <p>
          Profiling helps us identify potential problems, while understanding how the GC and managed
          heap work allows us to choose appropriate solutions.
        </p>

        <h3 id="possible-optimizations">Possible Optimizations</h3>
        <p>Based on my experience, I would consider the following approaches:</p>
        <ol>
          <li>
            <strong>Use value types instead of reference types where appropriate.</strong> Replacing
            classes with structures can eliminate separate heap allocations, particularly when
            working with collections of small data objects. However, structures do not always reside
            on the stack, and excessive copying or boxing can outweigh the benefits.
          </li>
          <li>
            <strong>Reuse objects and arrays.</strong> For frequently allocated objects, especially
            those that survive multiple collections, consider <code>ObjectPool&lt;T&gt;</code>. For
            reusable buffers and arrays, <code>ArrayPool&lt;T&gt;</code>
            can significantly reduce allocation pressure. Pooling is not always beneficial, however,
            and should be evaluated through measurements.
          </li>
          <li>
            <strong>
              Consider <code>stackalloc</code> for temporary buffers.
            </strong>{" "}
            This is a less common but potentially powerful optimization. It allows small buffers to
            be allocated directly on the stack, avoiding managed heap allocation entirely. However,
            stack space is limited, so this approach requires careful consideration of buffer size
            and lifetime.
          </li>
          <li>
            <strong>Consider the Pinned Object Heap (POH) for specialized scenarios.</strong> When
            an application requires buffers with stable memory addresses, particularly for native
            interoperability, allocating pinned arrays directly in the POH may be useful. This is
            not a general-purpose GC optimization, but it can help avoid fragmentation caused by
            long-lived pinned objects in the regular managed heap.
          </li>
          <li>
            <strong>Consider unmanaged memory in exceptional cases.</strong>
            Native memory allocation provides another way to avoid managed heap allocations for
            certain buffers or data structures. However, it introduces manual memory management and
            additional risks. Such solutions require strong justification and careful
            implementation.
          </li>
          <li>
            <strong>And finally, use common sense.</strong> The better you understand memory
            management in .NET, the more opportunities you have to identify problems and develop
            solutions that go beyond standard recommendations.
          </li>
        </ol>
        <p>
          After all, we are engineers. Our job is not simply to follow established practices, but to
          understand why they exist, recognize when they apply, and know when an alternative
          approach is justified.
        </p>
      </PublicationSection>
    </PublicationLayout>
  );
}
