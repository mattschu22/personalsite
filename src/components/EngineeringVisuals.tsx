const simdRows = [
  { lane: 'LD', ops: ['v0', 'v1', '', 'v2', 'v3', '', '', ''] },
  { lane: 'A0', ops: ['', 'mul', 'add', '', 'mul', 'add', 'red', ''] },
  { lane: 'A1', ops: ['', 'fma', 'shf', '', 'fma', 'shf', 'red', ''] },
  { lane: 'ST', ops: ['', '', '', '', '', '', '', 'out'] },
];

const sqlStages = ['PARSE', 'BIND', 'OPTIMIZE', 'INDEX SCAN', 'FILTER', 'HASH AGG', 'RETURN'];

export function SimdBackdrop() {
  return (
    <div className="systems-backdrop simd-backdrop" aria-hidden="true">
      <span className="backdrop-kicker">SIMD / ISSUE TRACE</span>
      <div className="backdrop-simd-grid">
        <span />
        {Array.from({ length: 8 }, (_, index) => <span key={`cycle-${index}`}>C{index}</span>)}
        {simdRows.flatMap((row) => [
          <strong key={`${row.lane}-label`}>{row.lane}</strong>,
          ...row.ops.map((op, index) => <i className={op ? 'is-issued' : ''} key={`${row.lane}-${index}`}>{op || '·'}</i>),
        ])}
      </div>
    </div>
  );
}

export function SqlBackdrop() {
  return (
    <div className="systems-backdrop sql-backdrop" aria-hidden="true">
      <span className="backdrop-kicker">SQL / EXECUTION PATH</span>
      <ol>
        {sqlStages.map((stage, index) => (
          <li key={stage}><span>{String(index + 1).padStart(2, '0')}</span><strong>{stage}</strong><i /></li>
        ))}
      </ol>
    </div>
  );
}
