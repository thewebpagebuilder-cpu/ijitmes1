import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { externalDocuments } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="shell footerLead">
        <div>
          <p className="eyebrow light">Open access scholarship</p>
          <h2>Advancing applied research across engineering and science.</h2>
        </div>
        <Link className="button buttonLight" href="/submit">Submit your manuscript <ArrowUpRight size={17} /></Link>
      </div>

      <div className="shell footerGrid">
        <div className="footerIdentity">
          <div className="footerLogoChip">
            <img src="/images/logo.jpg" alt="IJITMES journal logo" width={48} height={48} />
          </div>
          <div>
            <strong>IJITMES</strong>
            <p>International Journal of Innovative Technologies and Modern Trends in Engineering and Science</p>
          </div>
          <p className="footerMeta">Peer-reviewed · Open access<br />Established 2025 · Published monthly</p>
        </div>

        <div>
          <h3>Journal</h3>
          <Link href="/about">Aims & scope</Link>
          <Link href="/issues">Current issue</Link>
          <Link href="/issues#archive">Issue archive</Link>
          <Link href="/editorial-board">Editorial board</Link>
          <Link href="/peer-review">Peer review policy</Link>
        </div>
        <div>
          <h3>For authors</h3>
          <Link href="/guidelines">Author guidelines</Link>
          <Link href="/publish">Publication process</Link>
          <a href={externalDocuments.template} target="_blank" rel="noreferrer">Manuscript template</a>
          <Link href="/fees">Publication charges</Link>
          <Link href="/track">Track manuscript</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:editor@ijitmes.com"><Mail size={15} /> editor@ijitmes.com</a>
          <p><MapPin size={15} /> Mahalaxmi Temple, Pimpalgaon Khamb, Nashik, Maharashtra, India</p>
          <Link href="/contact">Editorial office</Link>
        </div>
      </div>

      <div className="shell footerBottom">
        <p>© {new Date().getFullYear()} IJITMES. All rights reserved.</p>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms & conditions</Link>
          <Link href="/faq">FAQs</Link>
        </div>
      </div>
    </footer>
  );
}
