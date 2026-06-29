import { cn } from "@/lib/cn";

/**
 * Section heading in the Figma display style: Exo, 96px, with the trailing
 * period rendered in the accent colour (matches every heading on 190-33).
 */
export function SectionHeading({
  children,
  id,
  className,
}: {
  children: string;
  id?: string;
  className?: string;
}) {
  const text = children.replace(/\.\s*$/, "");
  return (
    <h2
      id={id}
      className={cn(
        "font-display text-display font-normal uppercase leading-[1.02]",
        className,
      )}
    >
      {text}
      <span className="text-accent">.</span>
    </h2>
  );
}
