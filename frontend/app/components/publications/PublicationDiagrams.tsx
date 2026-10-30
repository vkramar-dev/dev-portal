/** Lightweight semantic diagrams — no charting library or client-only runtime. */
export function Utf16Diagram() {
  return <div className="utf-diagram" role="img" aria-label="The emoji U+1F600 is encoded as the UTF-16 surrogate pair D83D and DE00">
    <span className="glyph" aria-hidden="true">😀</span>
    <span className="diagram-arrow" aria-hidden="true">→</span>
    <span className="unit"><b>D83D</b><small>High surrogate</small></span>
    <span className="unit"><b>DE00</b><small>Low surrogate</small></span>
  </div>;
}

export function GcGenerationsDiagram() {
  return <div className="gc-diagram" role="img" aria-label="A conceptual progression: new allocations in generation zero, survivors in generation one, and longer-lived objects in generation two">
    <div className="generation"><span>NEW ALLOCATIONS</span><strong>Gen 0</strong><small>Frequent young-generation collections</small></div>
    <span className="gc-arrow" aria-hidden="true">→</span>
    <div className="generation"><span>SURVIVORS</span><strong>Gen 1</strong><small>Intermediate generation</small></div>
    <span className="gc-arrow" aria-hidden="true">→</span>
    <div className="generation"><span>LONGER-LIVED</span><strong>Gen 2</strong><small>Older objects</small></div>
  </div>;
}

export function DemoBarChart() {
  const examples = [
    { label: "Scenario A", value: 78 },
    { label: "Scenario B", value: 42 },
    { label: "Scenario C", value: 59 },
  ];
  return <div className="bars" role="img" aria-label="Synthetic demonstration values: scenario A 78, scenario B 42, scenario C 59, arbitrary units">
    {examples.map(({ label, value }) => <div key={label}>
      <span>{label}</span><div className="bar-track"><b style={{ width: `${value}%` }} /></div><em>{value}</em>
    </div>)}
  </div>;
}
