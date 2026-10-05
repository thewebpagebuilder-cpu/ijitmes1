import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { TrackingForm } from "@/components/tracking-form";

export const metadata: Metadata = {
  title: "Track a manuscript",
  description: "Check the editorial status of an IJITMES manuscript using the private paper ID and author email.",
};

export default function TrackPage() {
  return (
    <>
      <PageHero eyebrow="Author services" title="Track your manuscript" description="Enter the paper ID issued at submission and the corresponding-author email to view the latest editorial status." aside={<p><strong>Where is my paper ID?</strong>It is displayed after online submission in the format IJITMES–YEAR–XXXXXXXX.</p>} />
      <section className="shell contentShell">
        <Reveal><TrackingForm /></Reveal>
        <div className="callout callout-cream" style={{ maxWidth: 760, marginTop: 65 }}>
          <h3>Need editorial assistance?</h3>
          <p>For a status question not answered here, email editor@ijitmes.com from the corresponding-author address and include the paper ID and manuscript title.</p>
          <Link className="textLink" href="/contact">Contact the editorial office</Link>
        </div>
      </section>
    </>
  );
}
