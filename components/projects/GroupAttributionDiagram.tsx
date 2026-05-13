export default function GroupAttributionDiagram() {
  return (
    <div className="overflow-x-auto rounded-2xl bg-neutral-100 p-4 md:p-6">
      <svg
        viewBox="0 0 540 300"
        xmlns="http://www.w3.org/2000/svg"
        className="min-w-[420px] w-full max-w-2xl mx-auto"
        aria-label="Group attribution decision tree"
      >
        <defs>
          <marker id="gav" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#7c3aed" />
          </marker>
          <marker id="gag" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#525252" />
          </marker>
          <marker id="gae" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#047857" />
          </marker>
        </defs>

        {/* ── Input: emploiId reçu ── */}
        <rect x="185" y="12" width="170" height="40" rx="8" fill="#f5f5f5" stroke="#d4d4d4" strokeWidth="1.5" />
        <text x="270" y="28" textAnchor="middle" fill="#171717" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">emploiId reçu</text>
        <text x="270" y="43" textAnchor="middle" fill="#737373" fontSize="10" fontFamily="ui-monospace,monospace">depuis MongoDB</text>

        {/* Arrow down */}
        <line x1="270" y1="52" x2="270" y2="80" stroke="#525252" strokeWidth="1.5" markerEnd="url(#gag)" />

        {/* ── Decision: emploi spécial? ── */}
        {/* Diamond shape */}
        <polygon points="270,82 340,112 270,142 200,112" fill="#f5f5f5" stroke="#d4d4d4" strokeWidth="1.5" />
        <text x="270" y="107" textAnchor="middle" fill="#171717" fontWeight="700" fontSize="10" fontFamily="ui-monospace,monospace">emploi</text>
        <text x="270" y="121" textAnchor="middle" fill="#171717" fontWeight="700" fontSize="10" fontFamily="ui-monospace,monospace">spécial ?</text>

        {/* Branch labels */}
        <text x="155" y="125" textAnchor="middle" fill="#7c3aed" fontWeight="700" fontSize="10" fontFamily="ui-monospace,monospace">OUI</text>
        <text x="385" y="125" textAnchor="middle" fill="#525252" fontWeight="700" fontSize="10" fontFamily="ui-monospace,monospace">NON</text>

        {/* Arrow left (OUI) */}
        <line x1="200" y1="112" x2="130" y2="112" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#gav)" />
        {/* Arrow right (NON) */}
        <line x1="340" y1="112" x2="410" y2="112" stroke="#525252" strokeWidth="1.5" markerEnd="url(#gag)" />

        {/* ── Left branch: Mapping direct ── */}
        <rect x="30" y="130" width="150" height="44" rx="8" fill="#2e1065" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="105" y="148" textAnchor="middle" fill="#c4b5fd" fontWeight="700" fontSize="10" fontFamily="ui-monospace,monospace">Mapping direct</text>
        <text x="105" y="163" textAnchor="middle" fill="#7c3aed" fontSize="9" fontFamily="ui-monospace,monospace">emploiId → groupes fixes</text>

        {/* Arrow down left branch */}
        <line x1="105" y1="174" x2="105" y2="210" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#gav)" />

        {/* ── Left result ── */}
        <rect x="30" y="210" width="150" height="34" rx="8" fill="#f3f0ff" stroke="#7c3aed" strokeWidth="1" />
        <text x="105" y="225" textAnchor="middle" fill="#5b21b6" fontWeight="700" fontSize="9" fontFamily="ui-monospace,monospace">GRP_Formateur_Intern</text>
        <text x="105" y="238" textAnchor="middle" fill="#7c3aed" fontSize="9" fontFamily="ui-monospace,monospace">GRP_Admin_SI</text>

        {/* ── Right branch: Wildcard matching ── */}
        <rect x="360" y="88" width="150" height="44" rx="8" fill="#171717" stroke="#404040" strokeWidth="1.5" />
        <text x="435" y="106" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="10" fontFamily="ui-monospace,monospace">Pattern matching</text>
        <text x="435" y="121" textAnchor="middle" fill="#a3a3a3" fontSize="9" fontFamily="ui-monospace,monospace">règles wildcard MongoDB</text>

        {/* Arrow down right branch */}
        <line x1="435" y1="132" x2="435" y2="160" stroke="#525252" strokeWidth="1.5" markerEnd="url(#gag)" />

        {/* ── Deduplication ── */}
        <rect x="360" y="160" width="150" height="44" rx="8" fill="#171717" stroke="#404040" strokeWidth="1.5" />
        <text x="435" y="178" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="10" fontFamily="ui-monospace,monospace">Déduplification</text>
        <text x="435" y="193" textAnchor="middle" fill="#a3a3a3" fontSize="9" fontFamily="ui-monospace,monospace">n → n-k groupes uniques</text>

        {/* Arrow down dedup */}
        <line x1="435" y1="204" x2="435" y2="222" stroke="#525252" strokeWidth="1.5" markerEnd="url(#gag)" />

        {/* ── Right result ── */}
        <rect x="360" y="222" width="150" height="34" rx="8" fill="#f0fdf4" stroke="#047857" strokeWidth="1" />
        <text x="435" y="237" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="9" fontFamily="ui-monospace,monospace">GRP_Collaborateur_Base</text>
        <text x="435" y="250" textAnchor="middle" fill="#047857" fontSize="9" fontFamily="ui-monospace,monospace">GRP_Portail_RH</text>

        {/* ── Merge arrow left → final ── */}
        <line x1="105" y1="244" x2="105" y2="270" stroke="#047857" strokeWidth="1.5" />
        <line x1="105" y1="270" x2="270" y2="270" stroke="#047857" strokeWidth="1.5" />
        {/* Merge arrow right → final */}
        <line x1="435" y1="256" x2="435" y2="270" stroke="#047857" strokeWidth="1.5" />
        <line x1="270" y1="270" x2="435" y2="270" stroke="#047857" strokeWidth="1.5" />
        <line x1="270" y1="270" x2="270" y2="285" stroke="#047857" strokeWidth="1.5" markerEnd="url(#gae)" />

        {/* ── Final: AD memberOf ── */}
        <rect x="185" y="285" width="170" height="14" rx="5" fill="#022c22" stroke="#047857" strokeWidth="1" />
        <text x="270" y="295" textAnchor="middle" fill="#34d399" fontWeight="700" fontSize="9" fontFamily="ui-monospace,monospace">AD memberOf updated</text>
      </svg>
    </div>
  );
}
