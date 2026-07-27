import { Reveal } from "@/components/Reveal";
import { homeContent } from "@/content/home";

/** Intro / "Who We Are" (Figma 190-33) on the warm radial backdrop. */
export function Intro() {
  const { intro } = homeContent;
  const statement = intro.statement.replace(/\.\s*$/, "");

  return (
    <section aria-labelledby="who-we-are" className="bg-intro relative isolate">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--margin-page)] py-[clamp(5rem,14vh,13rem)]">
        <div className="grid gap-x-[var(--gutter)] gap-y-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <h1 className="max-w-[16ch] font-display text-display font-normal leading-[1.02]">
              {statement}
              <span className="text-accent">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-right font-display text-display-sm font-normal leading-[1.1] lg:pt-8">
              {intro.subhead.before}
              <span className="font-bold text-accent">{intro.subhead.accent}</span>
              {intro.subhead.after}
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(3.5rem,11vh,9rem)] grid gap-x-[var(--gutter)] gap-y-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div className="relative">
              <span
                aria-hidden
                className="absolute -left-5 top-3 hidden h-[clamp(2.5rem,8vw,9rem)] w-px bg-fg/70 lg:block"
              />
              <h2
                id="who-we-are"
                className="font-display text-display font-normal uppercase leading-[1.02]"
              >
                WHO WE ARE<span className="text-accent">.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-right font-body text-body-lg text-fg/90">
              {intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="text-body-emph uppercase">{intro.bodyEmphasis}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
