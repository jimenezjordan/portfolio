type Props = {
  branch1Label: string;
  branch2Label: string;
};

export default function ArchitectureDiagram({ branch1Label, branch2Label }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-neutral-950 p-4 md:p-6">
      <svg
        viewBox="0 0 650 220"
        xmlns="http://www.w3.org/2000/svg"
        className="min-w-[560px] w-full max-w-3xl mx-auto"
        aria-label="Architecture diagram"
      >
        <defs>
          <marker id="ag" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#525252" />
          </marker>
          <marker id="as" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#0369a1" />
          </marker>
          <marker id="ae" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#047857" />
          </marker>
          <marker id="aa" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#b45309" />
          </marker>
        </defs>

        {/* ── SCR-01 ── */}
        <rect x="12" y="85" width="118" height="52" rx="10" fill="#171717" stroke="#404040" strokeWidth="1.5" />
        <text x="71" y="107" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="12" fontFamily="ui-monospace,monospace">SCR-01</text>
        <text x="71" y="125" textAnchor="middle" fill="#a3a3a3" fontSize="10" fontFamily="ui-monospace,monospace">C# · 13h30</text>

        {/* ── Fork connector ── */}
        {/* H from SCR-01 */}
        <line x1="130" y1="111" x2="152" y2="111" stroke="#525252" strokeWidth="1.5" />
        {/* V fork line */}
        <line x1="152" y1="68" x2="152" y2="154" stroke="#525252" strokeWidth="1.5" />
        {/* Branch 1 horizontal */}
        <line x1="152" y1="68" x2="172" y2="68" stroke="#525252" strokeWidth="1.5" markerEnd="url(#ag)" />
        {/* Branch 2 horizontal */}
        <line x1="152" y1="154" x2="172" y2="154" stroke="#0369a1" strokeWidth="1.5" markerEnd="url(#as)" />

        {/* ── Branch labels ── */}
        <text x="175" y="30" fill="#737373" fontSize="9" fontFamily="ui-monospace,monospace">{branch1Label}</text>
        <text x="175" y="200" fill="#38bdf8" fontSize="9" fontFamily="ui-monospace,monospace">{branch2Label}</text>

        {/* ── .data files ── */}
        <rect x="172" y="43" width="126" height="50" rx="10" fill="#171717" stroke="#404040" strokeWidth="1.5" />
        <text x="235" y="64" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">.data files</text>
        <text x="235" y="81" textAnchor="middle" fill="#a3a3a3" fontSize="10" fontFamily="ui-monospace,monospace">SRV21 + SRV22</text>
        {/* Arrow .data → ICopitole */}
        <line x1="298" y1="68" x2="318" y2="68" stroke="#b45309" strokeWidth="1.5" markerEnd="url(#aa)" />

        {/* ── ICopitole ── */}
        <rect x="318" y="43" width="138" height="50" rx="10" fill="#1c0a00" stroke="#b45309" strokeWidth="1.5" strokeDasharray="6,3" />
        <text x="387" y="63" textAnchor="middle" fill="#fbbf24" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">ICopitole ⚠</text>
        <text x="387" y="80" textAnchor="middle" fill="#b45309" fontSize="10" fontFamily="ui-monospace,monospace">13h45 · non-retour</text>

        {/* ── MongoDB ── */}
        <rect x="172" y="129" width="118" height="50" rx="10" fill="#082f49" stroke="#0369a1" strokeWidth="1.5" />
        <text x="231" y="150" textAnchor="middle" fill="#38bdf8" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">MongoDB</text>
        <text x="231" y="167" textAnchor="middle" fill="#0369a1" fontSize="10" fontFamily="ui-monospace,monospace">temps réel</text>
        {/* Arrow MongoDB → Next.js */}
        <line x1="290" y1="154" x2="310" y2="154" stroke="#0369a1" strokeWidth="1.5" markerEnd="url(#as)" />

        {/* ── Next.js + Express ── */}
        <rect x="310" y="129" width="148" height="50" rx="10" fill="#082f49" stroke="#0369a1" strokeWidth="1.5" />
        <text x="384" y="150" textAnchor="middle" fill="#38bdf8" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">Next.js + Express</text>
        <text x="384" y="167" textAnchor="middle" fill="#0369a1" fontSize="10" fontFamily="ui-monospace,monospace">port 3002 / 5002</text>
        {/* Arrow Next.js → Site web */}
        <line x1="458" y1="154" x2="476" y2="154" stroke="#047857" strokeWidth="1.5" markerEnd="url(#ae)" />

        {/* ── Site web ── */}
        <rect x="476" y="129" width="146" height="50" rx="10" fill="#022c22" stroke="#047857" strokeWidth="1.5" />
        <text x="549" y="150" textAnchor="middle" fill="#34d399" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">Site web</text>
        <text x="549" y="167" textAnchor="middle" fill="#059669" fontSize="10" fontFamily="ui-monospace,monospace">degres-jours.eslc.fr</text>
      </svg>
    </div>
  );
}
