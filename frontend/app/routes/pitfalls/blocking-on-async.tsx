import PublicationLayout from "../../components/publications/PublicationLayout";
import { CodeExample, PublicationCallout, PublicationSection } from "../../components/publications/PublicationElements";

export function meta() { return [
  { title: "Blocking on Async Code — Design Preview | PinD" },
  { name: "robots", content: "noindex, nofollow" },
]; }
export default function BlockingOnAsync() {
  return <PublicationLayout kind="pitfall" title="Blocking on Async Code" category=".NET · Concurrency"
    summary="When synchronous waiting on a Task creates unnecessary blocking — and can sometimes deadlock."
    references={[{ title: "Microsoft Learn — Asynchronous programming", url: "https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/" }]}>
    <PublicationSection id="problem" title="The common mistake">
      <p>Calling <code>.Result</code> or <code>.Wait()</code> on a <code>Task</code> blocks the current thread. In environments with a synchronization context, a blocked caller and a continuation waiting for that context can deadlock.</p>
      <CodeExample code={'// Example of sync-over-async\nvar result = FetchDataAsync().Result;'} />
    </PublicationSection>
    <PublicationSection id="explanation" title="Why it matters">
      <p>Even when deadlock does not occur, blocking can consume threads unnecessarily. ASP.NET Core typically has no request synchronization context, but blocking asynchronous work can still harm scalability.</p>
      <PublicationCallout tone="warning" title="Important distinction">Blocking does not automatically mean deadlock. The outcome depends on the application model, synchronization context, and continuation behavior.</PublicationCallout>
    </PublicationSection>
    <PublicationSection id="better" title="A safer approach">
      <p>Prefer propagating asynchrony through the call chain when possible.</p>
      <CodeExample code={'// Prefer asynchronous composition\nvar result = await FetchDataAsync();'} />
    </PublicationSection>
    <PublicationSection id="decision" title="When this guidance applies">
      <p>Review the surrounding API contract, whether the caller can be asynchronous, and whether the operation is I/O-bound. Avoid oversimplified blanket rules.</p>
    </PublicationSection>
  </PublicationLayout>;
}
