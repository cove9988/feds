export default function LlmOrbSvg() {
  return (
    <svg viewBox="0 0 500 500" className="size-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="glowSoft"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="glowStrong"><feGaussianBlur stdDeviation="10" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {/* orbital rings */}
      <g className="origin-center" style={{ animation: 'spinSlow 40s linear infinite' }}>
        <circle cx="250" cy="250" r="200" fill="none" stroke="#a8c8ff" strokeWidth="0.6" strokeDasharray="4 12" opacity="0.3" />
        <circle cx="250" cy="250" r="150" fill="none" stroke="#97cbff" strokeWidth="0.6" strokeDasharray="3 10" opacity="0.25" />
        <circle cx="250" cy="250" r="100" fill="none" stroke="#dabafa" strokeWidth="0.6" strokeDasharray="3 8" opacity="0.25" />
      </g>

      {/* ── knowledge graph connection lines (outer layer) ── */}
      <g style={{ animation: 'spinSlow 80s linear infinite reverse' }}>
        {[
          [130, 70, 45, 240, '#4fc3f7'], [45, 240, 95, 400, '#97cbff'], [95, 400, 240, 445, '#ce93d8'],
          [240, 445, 400, 385, '#4fc3f7'], [400, 385, 455, 210, '#81c784'], [455, 210, 375, 70, '#4fc3f7'],
          [375, 70, 130, 70, '#81c784'], [130, 70, 250, 250, '#4fc3f7'], [95, 400, 250, 250, '#ffb74d'],
          [400, 385, 250, 250, '#4fc3f7'], [455, 210, 250, 250, '#4fc3f7'], [45, 240, 250, 250, '#97cbff'],
          [375, 70, 250, 250, '#81c784'], [240, 445, 250, 250, '#ce93d8'],
        ].map(([x1, y1, x2, y2, c], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c as string} strokeWidth="0.7" opacity="0.25" />
        ))}
      </g>

      {/* knowledge graph connection lines (middle layer) */}
      <g style={{ animation: 'spinSlow 60s linear infinite' }}>
        {[
          [160, 140, 108, 270, '#ff8a65'], [108, 270, 155, 375, '#ff8a65'], [155, 375, 280, 405, '#90caf9'],
          [280, 405, 385, 345, '#ff8a65'], [385, 345, 405, 195, '#ff8a65'], [405, 195, 325, 115, '#80cbc4'],
          [325, 115, 160, 140, '#80cbc4'], [160, 140, 250, 250, '#ff8a65'], [155, 375, 250, 250, '#aed581'],
          [385, 345, 250, 250, '#ff8a65'], [405, 195, 250, 250, '#ff8a65'], [108, 270, 250, 250, '#ff8a65'],
          [280, 405, 250, 250, '#90caf9'],
        ].map(([x1, y1, x2, y2, c], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c as string} strokeWidth="0.7" opacity="0.2" />
        ))}
      </g>

      {/* knowledge graph connection lines (inner layer) */}
      <g style={{ animation: 'spinSlow 90s linear infinite reverse' }}>
        {[
          [195, 178, 172, 280, '#f48fb1'], [172, 280, 215, 348, '#b39ddb'], [215, 348, 292, 345, '#ff8a65'],
          [292, 345, 335, 280, '#80cbc4'], [335, 280, 310, 178, '#80cbc4'], [310, 178, 195, 178, '#f48fb1'],
        ].map(([x1, y1, x2, y2, c], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c as string} strokeWidth="0.8" opacity="0.25" />
        ))}
      </g>

      {/* cross-layer connections */}
      <g style={{ animation: 'spinSlow 120s linear infinite' }}>
        {[
          [130, 70, 160, 140], [375, 70, 325, 115], [45, 240, 108, 270],
          [455, 210, 405, 195], [95, 400, 155, 375], [400, 385, 385, 345],
          [240, 445, 280, 405],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={['#4fc3f7', '#81c784', '#97cbff', '#4fc3f7', '#ffb74d', '#4fc3f7', '#ce93d8'][i]} strokeWidth="0.5" opacity="0.12" />
        ))}
      </g>

      {/* ── edge relationship labels ── */}
      <g style={{ animation: 'spinSlow 80s linear infinite reverse' }}>
        <text x="82" y="178" fill="#97cbff" fontSize="7" fontWeight="500" opacity="0.6" transform="rotate(-15 82 178)">applies_to</text>
        <text x="62" y="285" fill="#dabafa" fontSize="7" fontWeight="500" opacity="0.6" transform="rotate(10 62 285)">references</text>
        <text x="420" y="280" fill="#4fc3f7" fontSize="7" fontWeight="500" opacity="0.6" transform="rotate(-8 420 280)">governs</text>
        <text x="378" y="108" fill="#97cbff" fontSize="7" fontWeight="500" opacity="0.6" transform="rotate(20 378 108)">defines</text>
        <text x="145" y="425" fill="#a8c8ff" fontSize="7" fontWeight="500" opacity="0.6" transform="rotate(-12 145 425)">constrains</text>
        <text x="320" y="438" fill="#dabafa" fontSize="7" fontWeight="500" opacity="0.6" transform="rotate(8 320 438)">relates_to</text>
      </g>

      <g style={{ animation: 'spinSlow 60s linear infinite' }}>
        <text x="228" y="118" fill="#97cbff" fontSize="6.5" fontWeight="500" opacity="0.5" transform="rotate(-5 228 118)">amends</text>
        <text x="432" y="190" fill="#dabafa" fontSize="6.5" fontWeight="500" opacity="0.5" transform="rotate(15 432 190)">interprets</text>
        <text x="78" y="345" fill="#a8c8ff" fontSize="6.5" fontWeight="500" opacity="0.5" transform="rotate(-10 78 345)">regulates</text>
        <text x="370" y="380" fill="#97cbff" fontSize="6.5" fontWeight="500" opacity="0.5" transform="rotate(-6 370 380)">extends_to</text>
      </g>

      {/* ── entity nodes (outer ring) ── */}
      {[
        { x: 130, y: 70, label: 'Civil Code', tag: 'LAW', c: '#4fc3f7' },
        { x: 45, y: 240, label: 'Contract Law', tag: 'CODE', c: '#81c784' },
        { x: 95, y: 400, label: 'Tort Law', tag: 'CODE', c: '#ffb74d' },
        { x: 240, y: 445, label: 'IP Law', tag: 'LAW', c: '#ce93d8' },
        { x: 400, y: 385, label: 'Corporate Law', tag: 'LAW', c: '#4fc3f7' },
        { x: 455, y: 210, label: 'Labor Law', tag: 'LAW', c: '#4fc3f7' },
        { x: 375, y: 70, label: 'Procedure Law', tag: 'CODE', c: '#81c784' },
      ].map((n, i) => (
        <g key={i} filter="url(#glow)" style={{ animation: `drift 8s ease-in-out infinite ${i * 0.9}s` }}>
          <circle cx={n.x} cy={n.y} r={15 + (i % 2) * 3} fill={n.c} opacity="0.08" />
          <circle cx={n.x} cy={n.y} r={4.5} fill={n.c} opacity="0.8" />
          <text x={n.x} y={n.y + 22} fill={n.c} fontSize="7.5" fontWeight="600" textAnchor="middle" opacity="0.9">{n.label}</text>
          <rect x={n.x - 10} y={n.y - 13} width="20" height="8" rx="3" fill={n.c} opacity="0.12" />
          <text x={n.x} y={n.y - 6.5} fill={n.c} fontSize="5.5" fontWeight="700" textAnchor="middle" opacity="0.6">{n.tag}</text>
        </g>
      ))}

      {/* entity nodes (middle ring) */}
      {[
        { x: 160, y: 140, label: 'Breach of Contract', tag: 'TERM', c: '#ff8a65' },
        { x: 108, y: 270, label: 'Joint Obligations', tag: 'TERM', c: '#ff8a65' },
        { x: 155, y: 375, label: 'Damages', tag: 'REMEDY', c: '#aed581' },
        { x: 280, y: 405, label: 'Legal Person', tag: 'ENTITY', c: '#90caf9' },
        { x: 385, y: 345, label: 'Statute of Lim.', tag: 'TERM', c: '#ff8a65' },
        { x: 405, y: 195, label: 'Unjust Enrich.', tag: 'TERM', c: '#ff8a65' },
        { x: 325, y: 115, label: 'Agency', tag: 'ACT', c: '#80cbc4' },
      ].map((n, i) => (
        <g key={i} filter="url(#glow)" style={{ animation: `drift 8s ease-in-out infinite ${i * 0.7 + 0.5}s` }}>
          <circle cx={n.x} cy={n.y} r={12 + (i % 3)} fill={n.c} opacity="0.07" />
          <circle cx={n.x} cy={n.y} r={3.5} fill={n.c} opacity="0.7" />
          <text x={n.x} y={n.y + 17} fill={n.c} fontSize="6.5" fontWeight="500" textAnchor="middle" opacity="0.85">{n.label}</text>
          <rect x={n.x - 8} y={n.y - 10.5} width="16" height="7" rx="2.5" fill={n.c} opacity="0.1" />
          <text x={n.x} y={n.y - 5} fill={n.c} fontSize="4.5" fontWeight="700" textAnchor="middle" opacity="0.5">{n.tag}</text>
        </g>
      ))}

      {/* entity nodes (inner ring) */}
      {[
        { x: 195, y: 178, label: 'Force Majeure', tag: 'DEF', c: '#f48fb1' },
        { x: 172, y: 280, label: 'Right of Rescind', tag: 'RIGHT', c: '#b39ddb' },
        { x: 215, y: 348, label: 'Penalty Clause', tag: 'TERM', c: '#ff8a65' },
        { x: 292, y: 345, label: 'Earnest Money', tag: 'TERM', c: '#ff8a65' },
        { x: 335, y: 280, label: 'Set-off', tag: 'ACT', c: '#80cbc4' },
        { x: 310, y: 178, label: 'Deposit', tag: 'ACT', c: '#80cbc4' },
      ].map((n, i) => (
        <g key={i} filter="url(#glow)" style={{ animation: `drift 8s ease-in-out infinite ${i * 0.6 + 1}s` }}>
          <circle cx={n.x} cy={n.y} r={10 + (i % 2)} fill={n.c} opacity="0.07" />
          <circle cx={n.x} cy={n.y} r={2.5} fill={n.c} opacity="0.6" />
          <text x={n.x} y={n.y + 14} fill={n.c} fontSize="6" fontWeight="500" textAnchor="middle" opacity="0.8">{n.label}</text>
          <rect x={n.x - 6} y={n.y - 9} width="12" height="6" rx="2" fill={n.c} opacity="0.1" />
          <text x={n.x} y={n.y - 4.5} fill={n.c} fontSize="4" fontWeight="700" textAnchor="middle" opacity="0.5">{n.tag}</text>
        </g>
      ))}

      {/* ── central hub ── */}
      <g filter="url(#glowStrong)" style={{ animation: 'pulse 3s ease-in-out infinite' }}>
        <circle cx="250" cy="250" r="12" fill="#a8c8ff" opacity="0.12" />
        <circle cx="250" cy="250" r="6" fill="#a8c8ff" opacity="0.5" />
        <circle cx="250" cy="250" r="3" fill="#fff" opacity="0.9" />
        <text x="250" y="272" fill="#a8c8ff" fontSize="8" fontWeight="700" textAnchor="middle" opacity="0.8">Legal KB</text>
      </g>

      {/* hub spokes */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <line key={i} x1="250" y1="250" x2={250 + 75 * Math.cos((angle * Math.PI) / 180)} y2={250 + 75 * Math.sin((angle * Math.PI) / 180)} stroke={i % 3 === 0 ? '#a8c8ff' : i % 3 === 1 ? '#97cbff' : '#dabafa'} strokeWidth="0.5" opacity="0.12" />
      ))}

      {/* ── floating category tag chips ── */}
      <g style={{ animation: 'drift 9s ease-in-out infinite 0.2s' }}>
        <rect x="30" y="135" width="38" height="13" rx="6" fill="#4fc3f7" opacity="0.1" />
        <text x="49" y="144.5" fill="#4fc3f7" fontSize="6.5" textAnchor="middle" fontWeight="700" opacity="0.65">LAW</text>
      </g>
      <g style={{ animation: 'drift 9s ease-in-out infinite 2s' }}>
        <rect x="418" y="308" width="42" height="13" rx="6" fill="#81c784" opacity="0.1" />
        <text x="439" y="317.5" fill="#81c784" fontSize="6.5" textAnchor="middle" fontWeight="700" opacity="0.65">CASE</text>
      </g>
      <g style={{ animation: 'drift 9s ease-in-out infinite 4s' }}>
        <rect x="288" y="38" width="40" height="13" rx="6" fill="#ffb74d" opacity="0.1" />
        <text x="308" y="47.5" fill="#ffb74d" fontSize="6.5" textAnchor="middle" fontWeight="700" opacity="0.65">TERM</text>
      </g>
      <g style={{ animation: 'drift 9s ease-in-out infinite 6s' }}>
        <rect x="152" y="445" width="44" height="13" rx="6" fill="#ce93d8" opacity="0.1" />
        <text x="174" y="454.5" fill="#ce93d8" fontSize="6.5" textAnchor="middle" fontWeight="700" opacity="0.65">RULE</text>
      </g>

      {/* scattered micro nodes */}
      {[
        { x: 85, y: 120, c: '#4fc3f7' }, { x: 60, y: 195, c: '#97cbff' },
        { x: 125, y: 435, c: '#ce93d8' }, { x: 210, y: 455, c: '#a8c8ff' },
        { x: 405, y: 440, c: '#97cbff' }, { x: 445, y: 150, c: '#4fc3f7' },
        { x: 335, y: 50, c: '#81c784' }, { x: 195, y: 48, c: '#ffb74d' },
      ].map((n, i) => (
        <g key={i} filter="url(#glow)" style={{ animation: `pulse ${2 + (i * 0.3)}s ease-in-out infinite ${i * 0.25}s` }}>
          <circle cx={n.x} cy={n.y} r={1.5} fill={n.c} opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
