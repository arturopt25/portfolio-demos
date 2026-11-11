import { brand } from "@/content/brand";
import { getDictionary } from "@/lib/dictionary";

export default function RootRedirectPage() {
  const dictionary = getDictionary("en");

  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <link rel="canonical" href={`${brand.baseUrl}/en/`} />

      <main
        id="main"
        className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 px-6 py-16"
      >
        <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
          {brand.name}
        </p>
        <h1 className="font-display text-fg text-3xl font-bold tracking-tight sm:text-4xl">
          {dictionary.redirect.title}
        </h1>
        <p className="text-muted text-base leading-7">{dictionary.redirect.description}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href="/en/"
            className="bg-primary text-primary-fg hover:bg-primary-hover focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {dictionary.language.en}
          </a>
          <a
            href="/es/"
            hrefLang="es"
            lang="es"
            className="border-border bg-elevated text-fg hover:bg-surface focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {dictionary.language.es}
          </a>
        </div>
      </main>
    </>
  );
}
