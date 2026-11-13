import { BrandMark, type BrandMarkSize } from "@folio/ui";

/**
 * Original Casefern mark: a fern/leaf glyph with cut-out veins. The tile uses
 * the shared primary token, so the mark adapts to light and dark.
 */
function CasefernGlyph() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-[58%] w-[58%]"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 3.2c4.3 3.2 6.4 7 6.4 10.6 0 4.1-2.8 6.8-6.4 6.8s-6.4-2.7-6.4-6.8c0-3.6 2.1-7.4 6.4-10.6Z"
        style={{ fill: "rgb(var(--color-primary-soft))" }}
      />
      <path
        d="M12 7v11.6M12 10.4 9.2 8.1M12 13.2l3.1-2.5M12 16l-3.1-2.4"
        fill="none"
        style={{ stroke: "rgb(var(--color-primary))" }}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CasefernLockup({ size = "md" }: { size?: BrandMarkSize }) {
  return <BrandMark name="Casefern" mark={<CasefernGlyph />} size={size} />;
}
