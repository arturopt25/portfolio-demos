# @folio/ui

Shared React components, form handling, and consent-gated analytics for the
Folio demos. Imported by all three apps through the workspace protocol.

## Install

It is a private workspace package, so no registry install is needed:

```json
{
  "dependencies": {
    "@folio/ui": "workspace:*"
  }
}
```

## Components

`@folio/ui` exports functional, named components:

- `Badge`
- `Button`, `LinkButton`, `buttonVariants`
- `ContactForm`
- `Container`
- `CookieBanner`
- `Cta`
- `Faq`
- `Features`
- `Footer`
- `Header`
- `Hero`
- `JsonLd`
- `Pricing`
- `Section`, `SectionHeader`, `SectionHeading`
- `Testimonials`
- Icons: `ArrowRightIcon`, `CheckIcon`, `ChevronDownIcon`, `CloseIcon`,
  `CompassIcon`, `FactoryIcon`, `GaugeIcon`, `LeafIcon`, `MenuIcon`, `SparkIcon`

## Hooks and adapters

- `useConsent` — reads and updates the stored analytics/storage consent state.
  The default storage key is `DEFAULT_CONSENT_STORAGE_KEY`.
- `configureAnalytics`, `setAnalyticsConsent`, `trackEvent`, `useAnalytics` —
  consent-gated event tracking. The default adapter is `noopAnalyticsAdapter`.
- `mockFormSubmissionHandler` — default `FormSubmissionHandler` used by
  `ContactForm`. It logs locally and transmits nothing.
- `contactFormSchema`, `emptyContactFormValues` — Zod schema and initial values
  for the shared contact form.
- `cn` — the shared `clsx` + `tailwind-merge` class helper.

## Usage

```tsx
import { ContactForm, Header, Section, configureAnalytics, trackEvent } from "@folio/ui";

configureAnalytics({
  track(event) {
    // Replace with a real provider only after consent is granted.
    console.log(event);
  },
});

export function Page() {
  return (
    <>
      <Header brand="Demo" links={[{ href: "/", label: "Home", current: true }]} />
      <Section id="contact">
        <ContactForm
          onSubmit={async (payload) => {
            trackEvent("form_submit", payload.values);
            return { ok: true };
          }}
        />
      </Section>
    </>
  );
}
```

## Notes

- All components are client-safe only where they need interactivity; the entry
  point is a single `src/index.ts`.
- The default analytics provider is a no-op. Events are emitted only after
  consent is granted.
- The default form adapter is a mock. Replace it behind the
  `FormSubmissionHandler` interface rather than editing components.
- Styling relies on the `@folio/config` Tailwind preset and CSS tokens.
