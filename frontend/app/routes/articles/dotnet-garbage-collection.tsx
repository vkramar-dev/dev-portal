import PublicationLayout from "../../components/publications/PublicationLayout";
import {
  CodeExample,
  PublicationCallout,
  PublicationFigure,
  PublicationSection,
  PublicationTable,
} from "../../components/publications/PublicationElements";
import {
  DemoBarChart,
  GcGenerationsDiagram,
} from "../../components/publications/PublicationDiagrams";

export function meta() {
  return [
    { title: "Understanding .NET Garbage Collection — Design Preview | Programming in Depth" },
    {
      name: "description",
      content:
        "Unpublished layout preview showcasing .NET garbage collection diagrams, code, and sample charts.",
    },
    { name: "robots", content: "noindex, nofollow" },
  ];
}
const toc = [
  { id: "question", label: "The engineering question" },
  { id: "model", label: "Generations and object survival" },
  { id: "experiment", label: "Designing an experiment" },
  { id: "results", label: "Results and interpretation" },
  { id: "takeaway", label: "Engineering takeaway" },
  { id: "references", label: "References" },
];
export default function GarbageCollectionPreview() {
  return (
    <PublicationLayout
      kind="article"
      title="Understanding .NET Garbage Collection"
      category=".NET · Runtime"
      summary="Allocations, generations, object survival, and the measurements behind garbage collection."
      toc={toc}
      references={[
        {
          title: "Microsoft Learn — Fundamentals of garbage collection",
          url: "https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals",
        },
      ]}
      related={[{ title: "How .NET Stores Strings", to: "/articles/dotnet-strings" }]}
    >
      <PublicationSection id="question" title="The engineering question">
        <p>
          Allocation in managed code is usually fast, but collection cost depends on object
          lifetimes, reference graphs, and application behavior. Distinguish{" "}
          <em>allocation volume</em>, <em>survival</em>, and <em>collection frequency</em>.
        </p>
        <PublicationCallout title="Scope of this design sample" tone="warning">
          The figures and measurements below are synthetic placeholders for testing the publication
          layout, not results of a real benchmark.
        </PublicationCallout>
      </PublicationSection>
      <PublicationSection id="model" title="Generations and object survival">
        <p>
          The generational collector groups objects by their survival history. Objects that remain
          reachable through a collection may be promoted, while unreachable objects may be reclaimed
          when the appropriate generation is collected.
        </p>
        <PublicationFigure
          caption="FIGURE 01 · Simplified generational model"
          note="A conceptual illustration only, not a literal view of the runtime's heap layout."
        >
          <GcGenerationsDiagram />
        </PublicationFigure>
      </PublicationSection>
      <PublicationSection id="experiment" title="Designing an experiment">
        <p>
          Before benchmarking, specify runtime version, GC mode, workload, warmup, allocation
          volume, and measurement method. These details matter more than a visually impressive
          chart.
        </p>
        <CodeExample
          code={
            'long before = GC.GetAllocatedBytesForCurrentThread();\n\nbyte[] data = new byte[64 * 1024];\nGC.KeepAlive(data);\n\nlong allocated = GC.GetAllocatedBytesForCurrentThread() - before;\nConsole.WriteLine($"Allocated: {allocated:N0} bytes");'
          }
        />
      </PublicationSection>
      <PublicationSection id="results" title="Results and interpretation">
        <p>
          Our publication template accommodates charts, tables, notes, and methodology without
          turning the page into an analytics dashboard.
        </p>
        <PublicationFigure
          caption="FIGURE 02 · Mock allocation comparison (synthetic values)"
          note="Arbitrary units for visual testing only. Real results must specify units, runtime, workload, and uncertainty."
        >
          <DemoBarChart />
        </PublicationFigure>
        <PublicationTable>
          <thead>
            <tr>
              <th scope="col">Scenario</th>
              <th scope="col">Synthetic value (a.u.)</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>78</td>
              <td>Illustrative baseline</td>
            </tr>
            <tr>
              <td>B</td>
              <td>42</td>
              <td>Reduced sample value</td>
            </tr>
            <tr>
              <td>C</td>
              <td>59</td>
              <td>Intermediate sample value</td>
            </tr>
          </tbody>
        </PublicationTable>
      </PublicationSection>
      <PublicationSection id="takeaway" title="Engineering takeaway">
        <p>
          Performance investigations should distinguish actual measurements from hypotheses,
          document their methods, and avoid generalizing from a single workload.
        </p>
      </PublicationSection>
    </PublicationLayout>
  );
}
