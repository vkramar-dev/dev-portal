import PublicationLayout from "../../components/publications/PublicationLayout";
import { CodeExample, PublicationCallout, PublicationSection, PublicationTable } from "../../components/publications/PublicationElements";

export function meta() { return [
  { title: "Choosing EF Core Query Tracking — Design Preview | PinD" },
  { name: "robots", content: "noindex, nofollow" },
]; }
const toc = [
  { id: "decision", label: "The decision" },
  { id: "examples", label: "Two common choices" },
  { id: "tradeoffs", label: "Trade-offs" },
  { id: "checklist", label: "A short decision checklist" },
  { id: "references", label: "References" },
];
export default function EfCoreTrackingGuideline() {
  return <PublicationLayout kind="guideline" title="Choosing EF Core Query Tracking"
    category="EF Core · Data Access" summary="When to track entities, when to avoid tracking, and which trade-offs deserve a closer look."
    toc={toc} references={[{ title: "Microsoft Learn — Tracking vs. No-Tracking Queries", url: "https://learn.microsoft.com/en-us/ef/core/querying/tracking" }]}>
    <PublicationSection id="decision" title="The decision">
      <p>Entity Framework Core tracks entities by default when materializing them in a tracking query. This is useful when the unit of work will modify those entities and later call <code>SaveChanges</code>.</p>
      <p>For read-only results, tracking may introduce unnecessary state management. What does the application intend to do with the results?</p>
    </PublicationSection>
    <PublicationSection id="examples" title="Two common choices">
      <CodeExample language="C# · EF Core" code={'// A read-only listing\nvar products = await db.Products\n    .AsNoTracking()\n    .Where(p => p.IsActive)\n    .ToListAsync();\n\n// An entity that will be modified\nvar product = await db.Products.SingleAsync(p => p.Id == id);\nproduct.Price = newPrice;\nawait db.SaveChangesAsync();'} />
    </PublicationSection>
    <PublicationSection id="tradeoffs" title="Trade-offs">
      <PublicationTable>
        <thead><tr><th scope="col">Question</th><th scope="col">Tracking</th><th scope="col">No tracking</th></tr></thead>
        <tbody>
          <tr><td>Will entities be updated?</td><td>Convenient</td><td>Requires another approach</td></tr>
          <tr><td>Need change detection?</td><td>Available</td><td>Not maintained</td></tr>
          <tr><td>Read-only result?</td><td>May add overhead</td><td>Often appropriate</td></tr>
        </tbody>
      </PublicationTable>
      <PublicationCallout tone="warning" title="Avoid absolute rules">Tracking can affect identity resolution and result shape. The best choice depends on actual queries and workload.</PublicationCallout>
    </PublicationSection>
    <PublicationSection id="checklist" title="A short decision checklist">
      <ol className="pub-steps">
        <li>Will the returned entities be modified in the current unit of work?</li>
        <li>Does the query return entities or projections?</li>
        <li>Are object identity and duplicate instances relevant?</li>
        <li>Have you measured the effect under realistic load?</li>
      </ol>
    </PublicationSection>
  </PublicationLayout>;
}
