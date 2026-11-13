import type { Locale } from "@/lib/i18n";

/**
 * Inline, themed version of the industrial plant illustration.
 *
 * Colors use the shared CSS variables so the same drawing works in light and
 * dark. It is decorative: the hero already carries the text content, so the
 * SVG is hidden from assistive technology.
 */
export function PlantIllustration({ locale }: { locale: Locale }) {
  const labels =
    locale === "es"
      ? { intake: "ENTRADA", process: "PROCESO", output: "SALIDA" }
      : { intake: "INTAKE", process: "PROCESS", output: "OUTPUT" };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 675"
      width="1200"
      height="675"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <pattern id="plant-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgb(var(--color-border))" strokeWidth="1" />
        </pattern>
        <linearGradient id="plant-tank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgb(var(--color-primary-soft))" />
          <stop offset="1" stopColor="rgb(var(--color-primary))" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="plant-reactor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(var(--color-surface))" />
          <stop offset="1" stopColor="rgb(var(--color-secondary))" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="plant-pipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgb(var(--color-primary))" />
          <stop offset="0.6" stopColor="rgb(var(--color-secondary))" />
          <stop offset="1" stopColor="rgb(var(--color-accent))" />
        </linearGradient>
        <marker
          id="plant-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M0 0 10 5 0 10Z" fill="rgb(var(--color-muted))" />
        </marker>
      </defs>

      <rect width="1200" height="675" fill="rgb(var(--color-surface))" />
      <rect width="1200" height="675" fill="url(#plant-grid)" />

      <g stroke="rgb(var(--color-muted))" strokeWidth="2">
        <path d="M80 566H1120" />
        <path d="M80 560v12M1120 560v12" />
      </g>

      <g>
        <rect
          x="160"
          y="258"
          width="124"
          height="308"
          rx="14"
          fill="url(#plant-tank)"
          stroke="rgb(var(--color-primary))"
          strokeWidth="3"
        />
        <ellipse
          cx="222"
          cy="258"
          rx="62"
          ry="14"
          fill="rgb(var(--color-primary-soft))"
          stroke="rgb(var(--color-primary))"
          strokeWidth="3"
        />
        <path
          d="M164 330h116M164 400h116M164 470h116"
          stroke="rgb(var(--color-primary))"
          strokeWidth="2"
          strokeDasharray="6 8"
          opacity="0.7"
        />
        <path d="M222 244v-34" stroke="rgb(var(--color-primary))" strokeWidth="3" />
        <circle cx="222" cy="204" r="7" fill="rgb(var(--color-primary))" />
      </g>

      <g>
        <rect
          x="340"
          y="300"
          width="124"
          height="266"
          rx="14"
          fill="url(#plant-tank)"
          stroke="rgb(var(--color-primary))"
          strokeWidth="3"
        />
        <ellipse
          cx="402"
          cy="300"
          rx="62"
          ry="14"
          fill="rgb(var(--color-primary-soft))"
          stroke="rgb(var(--color-primary))"
          strokeWidth="3"
        />
        <path
          d="M344 366h116M344 432h116M344 498h116"
          stroke="rgb(var(--color-primary))"
          strokeWidth="2"
          strokeDasharray="6 8"
          opacity="0.7"
        />
        <path d="M402 286v-26" stroke="rgb(var(--color-primary))" strokeWidth="3" />
        <circle cx="402" cy="254" r="7" fill="rgb(var(--color-primary))" />
      </g>

      <g fill="none" stroke="url(#plant-pipe)" strokeWidth="8" strokeLinecap="round">
        <path d="M284 480h56" />
        <path d="M464 480h96l40-84" />
        <path d="M600 396h64" />
      </g>
      <g fill="rgb(var(--color-secondary))">
        <circle cx="340" cy="480" r="10" />
        <circle cx="600" cy="396" r="10" />
      </g>

      <g>
        <rect
          x="664"
          y="292"
          width="220"
          height="274"
          rx="22"
          fill="url(#plant-reactor)"
          stroke="rgb(var(--color-secondary))"
          strokeWidth="3"
        />
        <path
          d="M700 340h148M700 384h148M700 428h148"
          stroke="rgb(var(--color-secondary))"
          strokeWidth="2"
          strokeDasharray="6 8"
          opacity="0.8"
        />
        <rect
          x="718"
          y="466"
          width="112"
          height="70"
          rx="10"
          fill="rgb(var(--color-surface))"
          stroke="rgb(var(--color-secondary))"
          strokeWidth="2"
        />
        <path
          d="M736 492h76M736 510h52"
          stroke="rgb(var(--color-secondary))"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M884 340h52" stroke="rgb(var(--color-secondary))" strokeWidth="3" />
        <circle cx="936" cy="340" r="7" fill="rgb(var(--color-secondary))" />
      </g>

      <g fill="none" stroke="rgb(var(--color-accent))" strokeWidth="3">
        <path d="M936 340h92v126" />
        <path d="M1000 466h94" />
      </g>
      <g fill="rgb(var(--color-accent))">
        <circle cx="1028" cy="466" r="9" />
      </g>

      <g>
        <circle
          cx="1008"
          cy="220"
          r="76"
          fill="rgb(var(--color-elevated))"
          stroke="rgb(var(--color-border))"
          strokeWidth="3"
        />
        <path
          d="M1008 220l34-34"
          stroke="rgb(var(--color-primary))"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="1008" cy="220" r="8" fill="rgb(var(--color-primary))" />
        <g stroke="rgb(var(--color-muted))" strokeWidth="2">
          <path d="M1008 150v14M1078 220h-14M1008 290v-14M938 220h14" />
          <path d="M1055 173l-10 10M1055 267l-10-10M961 267l10-10M961 173l10 10" />
        </g>
        <path
          d="M959 259a62 62 0 0 1 98 0"
          fill="none"
          stroke="rgb(var(--color-accent))"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      <g
        stroke="rgb(var(--color-muted))"
        strokeWidth="2"
        fill="none"
        markerStart="url(#plant-arrow)"
        markerEnd="url(#plant-arrow)"
      >
        <path d="M160 612h188" />
        <path d="M664 612h220" />
        <path d="M936 612h92" />
      </g>

      <g
        fill="rgb(var(--color-muted))"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="3"
      >
        <text x="160" y="645">
          {labels.intake}
        </text>
        <text x="664" y="645">
          {labels.process}
        </text>
        <text x="936" y="645">
          {labels.output}
        </text>
      </g>

      <g stroke="rgb(var(--color-border))" strokeWidth="2" strokeDasharray="4 8">
        <path d="M120 258h-32M120 566h-32" />
        <path d="M1080 220h32M1080 466h32" />
      </g>
    </svg>
  );
}
