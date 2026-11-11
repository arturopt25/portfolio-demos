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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {brand.name}
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {dictionary.redirect.title}
        </h1>
        <p className="text-base leading-7 text-muted">{dictionary.redirect.description}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href="/en/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-fg transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {dictionary.language.en}
          </a>
          <a
            href="/es/"
            hrefLang="es"
            lang="es"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-elevated px-5 text-sm font-semibold text-fg transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {dictionary.language.es}
          </a>
        </div>
      </main>
    </>
  );
}
