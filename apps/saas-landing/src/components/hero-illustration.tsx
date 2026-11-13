/**
 * Decorative support-inbox illustration for the Casefern hero.
 *
 * Static inline SVG only: no scripts, no animation, no external requests.
 * Colors are applied with CSS classes so the shared tokens resolve reliably in
 * SVG (presentation attributes do not accept var()). Hidden below `lg` to keep
 * the mobile LCP text-based.
 */
export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 800 450"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className="casefern-illustration h-full w-full"
    >
      <style>{`
        .casefern-illustration .cf-surface { fill: rgb(var(--color-surface)); }
        .casefern-illustration .cf-bg { fill: rgb(var(--color-bg)); }
        .casefern-illustration .cf-elevated { fill: rgb(var(--color-elevated)); }
        .casefern-illustration .cf-fg { fill: rgb(var(--color-fg)); }
        .casefern-illustration .cf-muted { fill: rgb(var(--color-muted)); }
        .casefern-illustration .cf-primary { fill: rgb(var(--color-primary)); }
        .casefern-illustration .cf-primary-soft { fill: rgb(var(--color-primary-soft)); }
        .casefern-illustration .cf-secondary { fill: rgb(var(--color-secondary)); }
        .casefern-illustration .cf-accent { fill: rgb(var(--color-accent)); }
        .casefern-illustration .cf-success { fill: rgb(var(--color-success)); }
        .casefern-illustration .cf-border-stroke { stroke: rgb(var(--color-border)); }
        .casefern-illustration .cf-primary-stroke { stroke: rgb(var(--color-primary)); }
        .casefern-illustration .cf-secondary-stroke { stroke: rgb(var(--color-secondary)); }
        .casefern-illustration .cf-success-stroke { stroke: rgb(var(--color-success)); }
        .casefern-illustration .cf-primary-stop { stop-color: rgb(var(--color-primary)); }
        .casefern-illustration .cf-secondary-stop { stop-color: rgb(var(--color-secondary)); }
      `}</style>
      <defs>
        <linearGradient id="casefern-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className="cf-primary-stop" stopOpacity="0.18" />
          <stop offset="1" className="cf-secondary-stop" stopOpacity="0.08" />
        </linearGradient>
        <pattern id="casefern-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M32 0H0V32"
            fill="none"
            className="cf-border-stroke"
            strokeWidth="1"
            opacity="0.45"
          />
        </pattern>
        <marker
          id="casefern-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 0 10 5 0 10Z" className="cf-primary" />
        </marker>
      </defs>

      <rect width="800" height="450" rx="24" className="cf-surface" />
      <rect width="800" height="450" rx="24" fill="url(#casefern-grid)" />
      <circle cx="700" cy="80" r="120" fill="url(#casefern-glow)" />
      <circle cx="90" cy="390" r="90" fill="url(#casefern-glow)" opacity="0.7" />

      <g>
        <rect
          x="40"
          y="56"
          width="440"
          height="340"
          rx="20"
          className="cf-bg cf-border-stroke"
          strokeWidth="1.5"
        />
        <rect x="64" y="80" width="120" height="12" rx="6" className="cf-fg" opacity="0.85" />
        <rect x="64" y="100" width="80" height="8" rx="4" className="cf-muted" opacity="0.55" />
        <circle
          cx="440"
          cy="92"
          r="10"
          className="cf-primary-soft cf-primary-stroke"
          strokeWidth="1.5"
        />
        <path
          d="M436 92h8M440 88v8"
          fill="none"
          className="cf-primary-stroke"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <g>
          <rect
            x="64"
            y="132"
            width="392"
            height="72"
            rx="14"
            className="cf-elevated cf-border-stroke"
            strokeWidth="1.2"
          />
          <circle cx="96" cy="168" r="17" className="cf-primary-soft" />
          <circle cx="96" cy="168" r="7" className="cf-primary" opacity="0.75" />
          <rect x="124" y="152" width="160" height="10" rx="5" className="cf-fg" opacity="0.75" />
          <rect x="124" y="170" width="112" height="8" rx="4" className="cf-muted" opacity="0.5" />
          <rect
            x="356"
            y="150"
            width="80"
            height="24"
            rx="12"
            className="cf-success"
            opacity="0.14"
          />
          <circle cx="372" cy="162" r="4" className="cf-success" />
          <rect
            x="382"
            y="158"
            width="40"
            height="7"
            rx="3.5"
            className="cf-success"
            opacity="0.8"
          />
        </g>

        <g>
          <rect
            x="64"
            y="216"
            width="392"
            height="72"
            rx="14"
            className="cf-elevated cf-border-stroke"
            strokeWidth="1.2"
          />
          <circle cx="96" cy="252" r="17" className="cf-secondary" opacity="0.14" />
          <circle cx="96" cy="252" r="7" className="cf-secondary" opacity="0.8" />
          <rect x="124" y="236" width="180" height="10" rx="5" className="cf-fg" opacity="0.75" />
          <rect x="124" y="254" width="96" height="8" rx="4" className="cf-muted" opacity="0.5" />
          <rect
            x="356"
            y="234"
            width="80"
            height="24"
            rx="12"
            className="cf-accent"
            opacity="0.14"
          />
          <circle cx="372" cy="246" r="4" className="cf-accent" />
          <rect
            x="382"
            y="242"
            width="40"
            height="7"
            rx="3.5"
            className="cf-accent"
            opacity="0.8"
          />
        </g>

        <g>
          <rect
            x="64"
            y="300"
            width="392"
            height="72"
            rx="14"
            className="cf-elevated cf-border-stroke"
            strokeWidth="1.2"
          />
          <circle cx="96" cy="336" r="17" className="cf-primary-soft" />
          <circle cx="96" cy="336" r="7" className="cf-primary" opacity="0.75" />
          <rect x="124" y="320" width="140" height="10" rx="5" className="cf-fg" opacity="0.75" />
          <rect x="124" y="338" width="120" height="8" rx="4" className="cf-muted" opacity="0.5" />
          <rect
            x="356"
            y="318"
            width="80"
            height="24"
            rx="12"
            className="cf-primary"
            opacity="0.12"
          />
          <circle cx="372" cy="330" r="4" className="cf-primary" />
          <rect
            x="382"
            y="326"
            width="40"
            height="7"
            rx="3.5"
            className="cf-primary"
            opacity="0.8"
          />
        </g>
      </g>

      <path
        d="M500 226c28 0 34 0 58 0"
        fill="none"
        className="cf-primary-stroke"
        strokeWidth="2.5"
        strokeDasharray="6 6"
        markerEnd="url(#casefern-arrow)"
        opacity="0.8"
      />

      <g>
        <path d="M590 120v230" className="cf-border-stroke" strokeWidth="2" strokeDasharray="4 8" />
        <g>
          <circle
            cx="590"
            cy="120"
            r="22"
            className="cf-primary-soft cf-primary-stroke"
            strokeWidth="1.5"
          />
          <path
            d="m582 120 6 6 10-12"
            fill="none"
            className="cf-primary-stroke"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="626" y="108" width="90" height="10" rx="5" className="cf-fg" opacity="0.75" />
          <rect x="626" y="126" width="64" height="8" rx="4" className="cf-muted" opacity="0.5" />
        </g>
        <g>
          <circle
            cx="590"
            cy="230"
            r="22"
            className="cf-surface cf-secondary-stroke"
            strokeWidth="1.5"
          />
          <path
            d="M582 230h16"
            className="cf-secondary-stroke"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="626" y="218" width="100" height="10" rx="5" className="cf-fg" opacity="0.75" />
          <rect x="626" y="236" width="54" height="8" rx="4" className="cf-muted" opacity="0.5" />
        </g>
        <g>
          <circle
            cx="590"
            cy="340"
            r="22"
            className="cf-success cf-success-stroke"
            opacity="0.14"
            strokeWidth="1.5"
          />
          <circle cx="590" cy="340" r="7" className="cf-success" />
          <rect x="626" y="328" width="84" height="10" rx="5" className="cf-fg" opacity="0.75" />
          <rect x="626" y="346" width="70" height="8" rx="4" className="cf-muted" opacity="0.5" />
        </g>
      </g>

      <g>
        <rect
          x="520"
          y="48"
          width="232"
          height="56"
          rx="14"
          className="cf-bg cf-border-stroke"
          strokeWidth="1.5"
        />
        <rect x="540" y="66" width="54" height="20" rx="6" className="cf-primary-soft" />
        <path
          d="M548 80h10M558 80h10M568 80h18"
          fill="none"
          className="cf-primary-stroke"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="606" y="66" width="96" height="10" rx="5" className="cf-fg" opacity="0.8" />
        <rect x="606" y="82" width="70" height="8" rx="4" className="cf-muted" opacity="0.5" />
      </g>

      <g>
        <rect
          x="600"
          y="386"
          width="152"
          height="36"
          rx="18"
          className="cf-elevated cf-border-stroke"
          strokeWidth="1.2"
        />
        <circle cx="620" cy="404" r="6" className="cf-success" />
        <rect x="634" y="400" width="92" height="8" rx="4" className="cf-fg" opacity="0.7" />
      </g>
    </svg>
  );
}
