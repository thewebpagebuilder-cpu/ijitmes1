import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Home } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
};

export function PageHero({ eyebrow, title, description, aside }: PageHeroProps) {
  return (
    <section className="pageHero">
      <div className={`shell pageHeroInner ${aside ? "withAside" : ""}`}>
        <div>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/"><Home size={14} /> Home</Link>
            <ArrowRight size={13} aria-hidden="true" />
            <span>{eyebrow}</span>
          </nav>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lede">{description}</p>
        </div>
        {aside && <aside className="heroAside">{aside}</aside>}
      </div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <header className={`sectionHeading ${align === "center" ? "centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}

export function Callout({ children, tone = "navy" }: { children: ReactNode; tone?: "navy" | "cream" }) {
  return <aside className={`callout callout-${tone}`}>{children}</aside>;
}
