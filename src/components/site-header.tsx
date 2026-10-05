import Link from "next/link";
import { ChevronDown, FileDown, Mail, Menu, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Ticker } from "@/components/motion";
import { externalDocuments } from "@/lib/content";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/issues", label: "Issues & archive" },
  { href: "/editorial-board", label: "Editorial board" },
  { href: "/peer-review", label: "Peer review" },
  { href: "/contact", label: "Contact" },
];

const authorLinks = [
  { href: "/publish", label: "How to publish" },
  { href: "/guidelines", label: "Author guidelines" },
  { href: externalDocuments.template, label: "Manuscript template", external: true },
  { href: externalDocuments.copyright, label: "Copyright form", external: true },
  { href: "/fees", label: "Publication charges" },
  { href: "/track", label: "Track a manuscript" },
];

const tickerItems = [
  "Call for papers — submissions accepted through the 25th of every month",
  "Volume 1 · Issue 7 now live in the open-access library",
  "Peer-reviewed · Open access · No subscription required",
  "Processing charges ₹449 (India) / $17 (International)",
  "Manuscript template & copyright form available under For authors",
];

function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label="IJITMES home">
      <img className="logoImg" src="/images/logo.jpg" alt="IJITMES journal logo" width={64} height={64} />
      <span className="wordmarkText">
        <strong>IJITMES</strong>
        <span>International Journal of Innovative Technologies</span>
        <span>and Modern Trends in Engineering & Science</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="utilityBar">
        <div className="shell utilityInner">
          <p>Peer-reviewed · Open access · Monthly publication</p>
          <div>
            <a href="mailto:editor@ijitmes.com"><Mail size={14} /> editor@ijitmes.com</a>
            <Link href="/issues"><Search size={14} /> Search research</Link>
          </div>
        </div>
      </div>

      <Ticker items={tickerItems} />

      <div className="shell masthead">
        <Wordmark />
        <div className="mastheadActions">
          <ThemeToggle />
          <Link className="textLink" href="/track">Track manuscript</Link>
          <Link className="button buttonPrimary buttonSmall" href="/submit">Submit a paper</Link>
        </div>
        <details className="mobileMenu">
          <summary aria-label="Open navigation"><Menu size={23} /></summary>
          <nav aria-label="Mobile navigation">
            <ThemeToggle />
            {primaryLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            <p>For authors</p>
            {authorLinks.map((link) => (
              <a key={link.href} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
                {link.label}
              </a>
            ))}
            <Link className="button buttonPrimary" href="/submit">Submit a paper</Link>
          </nav>
        </details>
      </div>

      <div className="navBar">
        <nav className="shell mainNav" aria-label="Primary navigation">
          {primaryLinks.slice(0, 3).map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <details className="navDropdown">
            <summary>For authors <ChevronDown size={14} /></summary>
            <div>
              {authorLinks.map((link) => (
                <a key={link.href} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
                  {link.external && <FileDown size={15} />}{link.label}
                </a>
              ))}
            </div>
          </details>
          {primaryLinks.slice(3).map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
