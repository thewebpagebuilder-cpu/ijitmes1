import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileCheck2, ShieldCheck } from "lucide-react";
import { SubmissionForm } from "@/components/submission-form";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/ui";
import { externalDocuments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Submit a manuscript",
  description: "Submit an engineering or applied-science manuscript to IJITMES.",
};

export default function SubmitPage() {
  return (
    <>
      <PageHero eyebrow="Online submission" title="Submit your manuscript" description="Complete each section carefully. Author and paper information will be used for editorial review, publication records and certificates." aside={<p><strong>Before you begin</strong>Prepare a final DOCX file, accurate author details and a 150–250 word abstract.</p>} />
      <section className="shell contentShell formPageGrid">
        <Reveal><SubmissionForm /></Reveal>
        <Reveal variant="right" delay={150}><aside className="formAside">
          <div className="infoPanel">
            <FileCheck2 size={23} />
            <h2>Submission checklist</h2>
            <ul><li>The work fits the journal scope.</li><li>The manuscript is original and not under review elsewhere.</li><li>All authors have approved this submission.</li><li>References, figures and tables are complete.</li><li>The file uses the IJITMES template.</li></ul>
            <a className="textLink" href={externalDocuments.template} target="_blank" rel="noreferrer"><Download size={14} /> Download template</a>
          </div>
          <div className="infoPanel">
            <ShieldCheck size={23} />
            <h3>Review & privacy</h3>
            <p>Eligible manuscripts proceed through double-blind review. Your corresponding-author email is also required to access private tracking information.</p>
            <Link className="textLink" href="/peer-review">Read peer review policy</Link>
          </div>
          <div className="infoPanel">
            <h3>Need help?</h3>
            <p>Contact the editorial office at editor@ijitmes.com before submitting if you have a file or authorship question.</p>
            <Link className="textLink" href="/contact">Contact support</Link>
          </div>
        </aside></Reveal>
      </section>
    </>
  );
}
