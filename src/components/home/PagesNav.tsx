import { FlowingMenu } from "@/components/effects/FlowingMenu";
import { Reveal } from "@/components/Reveal";
import { mainNav } from "@/content/site";

/**
 * Navigation to the inner pages — a scroll-revealed Flowing Menu of the four
 * service routes (Experience Center, Corporate Films, Software & Apps, Events).
 */
export function PagesNav() {
  const items = mainNav.map((n) => ({ link: n.href, text: n.label }));
  return (
    <section aria-labelledby="explore" className="bg-bg">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--margin-page)] pt-[clamp(4rem,11vh,10rem)]">
        <Reveal>
          <p className="font-display text-label uppercase tracking-[0.3em] text-muted">
            <span className="text-accent">/</span> Navigate
          </p>
          <h2
            id="explore"
            className="mt-4 font-display text-display font-normal uppercase leading-[1.02]"
          >
            EXPLORE<span className="text-accent">.</span>
          </h2>
        </Reveal>
      </div>
      <div className="mt-12 h-[70vh] min-h-[480px] border-t border-border">
        <FlowingMenu items={items} />
      </div>
    </section>
  );
}
