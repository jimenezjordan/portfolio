export default function FormRHArchitectureDiagram() {
  return (
    <div className="overflow-x-auto rounded-2xl bg-neutral-950 p-4 md:p-6">
      <svg
        viewBox="0 0 700 300"
        xmlns="http://www.w3.org/2000/svg"
        className="min-w-[580px] w-full max-w-3xl mx-auto"
        aria-label="FormRH architecture diagram"
      >
        <defs>
          <marker id="fag" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#525252" />
          </marker>
          <marker id="fav" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#7c3aed" />
          </marker>
          <marker id="fab" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#0078d4" />
          </marker>
          <marker id="faa" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#b45309" />
          </marker>
          <marker id="fae" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#047857" />
          </marker>
        </defs>

        {/* ── Layer labels ── */}
        <text x="12" y="68" fill="#525252" fontSize="9" fontFamily="ui-monospace,monospace" fontWeight="600">CLIENT</text>
        <text x="12" y="158" fill="#525252" fontSize="9" fontFamily="ui-monospace,monospace" fontWeight="600">API</text>
        <text x="12" y="248" fill="#525252" fontSize="9" fontFamily="ui-monospace,monospace" fontWeight="600">DATA</text>

        {/* ── Layer separator lines ── */}
        <line x1="60" y1="100" x2="700" y2="100" stroke="#262626" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="60" y1="190" x2="700" y2="190" stroke="#262626" strokeWidth="1" strokeDasharray="4,4" />

        {/* ── Browser / Next.js ── */}
        <rect x="65" y="45" width="160" height="50" rx="10" fill="#171717" stroke="#404040" strokeWidth="1.5" />
        <text x="145" y="66" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">Browser</text>
        <text x="145" y="83" textAnchor="middle" fill="#a3a3a3" fontSize="10" fontFamily="ui-monospace,monospace">Next.js 16 · App Router</text>

        {/* Arrow Browser → Express */}
        <line x1="145" y1="95" x2="145" y2="113" stroke="#525252" strokeWidth="1.5" markerEnd="url(#fag)" />

        {/* ── Express.js API ── */}
        <rect x="65" y="115" width="160" height="50" rx="10" fill="#2e1065" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="145" y="136" textAnchor="middle" fill="#c4b5fd" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">Express.js API</text>
        <text x="145" y="153" textAnchor="middle" fill="#7c3aed" fontSize="10" fontFamily="ui-monospace,monospace">Node.js · port 5002</text>

        {/* Arrow Express → MongoDB */}
        <line x1="145" y1="165" x2="145" y2="203" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#fav)" />

        {/* ── MongoDB ── */}
        <rect x="65" y="205" width="160" height="50" rx="10" fill="#171717" stroke="#404040" strokeWidth="1.5" />
        <text x="145" y="226" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">MongoDB</text>
        <text x="145" y="243" textAnchor="middle" fill="#a3a3a3" fontSize="10" fontFamily="ui-monospace,monospace">configs + collaborateurs</text>

        {/* ── Express → Azure AD ── */}
        <line x1="225" y1="140" x2="320" y2="140" stroke="#0078d4" strokeWidth="1.5" markerEnd="url(#fab)" />

        {/* ── Azure AD ── */}
        <rect x="320" y="115" width="148" height="50" rx="10" fill="#00132a" stroke="#0078d4" strokeWidth="1.5" />
        <text x="394" y="136" textAnchor="middle" fill="#60a5fa" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">Azure AD</text>
        <text x="394" y="153" textAnchor="middle" fill="#0078d4" fontSize="10" fontFamily="ui-monospace,monospace">OAuth · NextAuth.js</text>

        {/* ── Azure AD → MS Graph ── */}
        <line x1="468" y1="140" x2="518" y2="140" stroke="#0078d4" strokeWidth="1.5" markerEnd="url(#fab)" />

        {/* ── MS Graph API ── */}
        <rect x="518" y="115" width="160" height="50" rx="10" fill="#00132a" stroke="#0078d4" strokeWidth="1.5" />
        <text x="598" y="133" textAnchor="middle" fill="#60a5fa" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">MS Graph API</text>
        <text x="598" y="148" textAnchor="middle" fill="#0078d4" fontSize="10" fontFamily="ui-monospace,monospace">LRU cache · 15 min</text>
        <text x="598" y="160" textAnchor="middle" fill="#0078d4" fontSize="9" fontFamily="ui-monospace,monospace">profils · avatars</text>

        {/* ── Express → LDAP (vertical arrow down-right) ── */}
        <line x1="225" y1="155" x2="320" y2="230" stroke="#b45309" strokeWidth="1.5" markerEnd="url(#faa)" />

        {/* ── LDAP / Active Directory ── */}
        <rect x="320" y="205" width="180" height="50" rx="10" fill="#1c0a00" stroke="#b45309" strokeWidth="1.5" />
        <text x="410" y="226" textAnchor="middle" fill="#fbbf24" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">Active Directory</text>
        <text x="410" y="243" textAnchor="middle" fill="#b45309" fontSize="10" fontFamily="ui-monospace,monospace">LDAP · ldapjs · batch×3</text>

        {/* ── Worker badge ── */}
        <rect x="518" y="210" width="160" height="40" rx="10" fill="#022c22" stroke="#047857" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x="598" y="226" textAnchor="middle" fill="#34d399" fontWeight="700" fontSize="11" fontFamily="ui-monospace,monospace">AD Worker</text>
        <text x="598" y="241" textAnchor="middle" fill="#059669" fontSize="10" fontFamily="ui-monospace,monospace">Node.js · cron · sync</text>
        <line x1="500" y1="230" x2="518" y2="230" stroke="#047857" strokeWidth="1.5" markerEnd="url(#fae)" />
      </svg>
    </div>
  );
}
