export function ProceduralBackground() {
  return <svg className="procedural" aria-hidden="true" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><g className="grid">{Array.from({ length: 13 }, (_, i) => <path key={`v${i}`} d={`M${i * 100} 0V800`} />)}{Array.from({ length: 9 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 100}H1200`} />)}</g></svg>;
}
