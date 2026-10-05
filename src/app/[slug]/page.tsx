import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeIndianRupee,
  BookOpen,
  Check,
  CircleDollarSign,
  Download,
  FileCheck2,
  Globe2,
  Info,
  Layers3,
  Lightbulb,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Callout, PageHero, SectionHeading } from "@/components/ui";
import { Reveal, Slideshow } from "@/components/motion";
import { aboutSlides, board, externalDocuments, focusAreas, publicationSteps } from "@/lib/content";

const validSlugs = ["about", "publish", "guidelines", "fees", "peer-review", "editorial-board", "privacy", "terms", "faq"] as const;

const titles: Record<(typeof validSlugs)[number], string> = {
  about: "About the journal",
  publish: "How to publish",
  guidelines: "Author guidelines",
  fees: "Publication charges",
  "peer-review": "Peer review policy",
  "editorial-board": "Editorial board",
  privacy: "Privacy policy",
  terms: "Terms & conditions",
  faq: "Frequently asked questions",
};

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!validSlugs.includes(slug as (typeof validSlugs)[number])) return {};
  return { title: titles[slug as (typeof validSlugs)[number]] };
}

function SideNav({ links }: { links: Array<{ id: string; label: string }> }) {
  return (
    <nav className="sideNav" aria-label="On this page">
      <p>On this page</p>
      {links.map((link) => <a key={link.id} href={`#${link.id}`}>{link.label}</a>)}
    </nav>
  );
}

function AboutPage() {
  const links = [
    { id: "mission", label: "Mission" },
    { id: "scope", label: "Aims & scope" },
    { id: "formats", label: "Article types" },
    { id: "frequency", label: "Publication model" },
  ];
  return (
    <>
      <PageHero eyebrow="About IJITMES" title="A journal for applied ideas and emerging disciplines." description="IJITMES provides an open-access forum for research that advances engineering practice, scientific understanding and interdisciplinary collaboration." aside={<p><strong>Journal profile</strong>Peer-reviewed · Open access · Established 2025 · Published monthly</p>} />
      <div className="shell contentShell" style={{ paddingBottom: 0 }}>
        <Reveal variant="scale">
          <Slideshow slides={aboutSlides} />
        </Reveal>
      </div>
      <div className="shell contentShell" style={{ paddingTop: 30 }}>
        <div className="proseLayout">
        <SideNav links={links} />
        <article className="prose">
          <h2 id="mission">Our mission</h2>
          <p>The International Journal of Innovative Technologies and Modern Trends in Engineering and Science supports the clear, responsible and timely exchange of technical knowledge. The journal brings together researchers, educators and practitioners whose work addresses practical challenges or expands the methods available to their field.</p>
          <p>We aim to make relevant research discoverable without subscription barriers while maintaining editorial screening, independent assessment and a defined publication record.</p>
          <div className="aimsGrid">
            <div className="aimCard"><Globe2 size={24} /><h3>Open scholarship</h3><p>Research is available to read online without institutional or individual subscription.</p></div>
            <div className="aimCard"><ShieldCheck size={24} /><h3>Editorial oversight</h3><p>Manuscripts are checked for fit, originality, ethical compliance and presentation.</p></div>
            <div className="aimCard"><Lightbulb size={24} /><h3>Applied relevance</h3><p>We value methods and findings with clear scientific, technical or practical significance.</p></div>
            <div className="aimCard"><Users size={24} /><h3>Interdisciplinary exchange</h3><p>The journal connects established engineering domains with fast-evolving technologies.</p></div>
          </div>

          <h2 id="scope">Aims & scope</h2>
          <p>IJITMES considers work across engineering, technology, computational disciplines and applied science. Submissions should define a clear problem, use appropriate methods, engage with relevant literature and explain the significance and limitations of the findings.</p>
          <ul>{focusAreas.map((area) => <li key={area}>{area}</li>)}</ul>

          <h2 id="formats">Article types</h2>
          <h3>Original research</h3><p>Complete reports of empirical, experimental, computational or theoretical investigations with a clear contribution.</p>
          <h3>Review articles</h3><p>Critical, structured syntheses that evaluate the state of a field and identify meaningful directions for future work.</p>
          <h3>Case studies & technical notes</h3><p>Focused accounts of an implementation, engineering solution, method, dataset or technical observation with transferable value.</p>

          <h2 id="frequency">Publication model</h2>
          <p>IJITMES follows a continuous open-access publication model organized into monthly issues, with twelve issues planned each year. Accepted papers are assigned a stable paper ID and issue metadata when published.</p>
          <Callout tone="cream"><h3>Before you submit</h3><p>Review the author guidelines, prepare your manuscript using the journal template and confirm that the work is original and not under consideration elsewhere.</p><Link className="textLink" href="/guidelines">Read the guidelines <ArrowRight size={14} /></Link></Callout>
        </article>
        </div>
      </div>
    </>
  );
}

function PublishPage() {
  return (
    <>
      <PageHero eyebrow="For authors" title="From a prepared manuscript to a published paper." description="A practical overview of the IJITMES submission and editorial process, with the documents and decisions authors should expect at each stage." aside={<p><strong>Prepare first</strong>Manuscripts should be in English, follow the journal template and be uploaded as a DOCX file.</p>} />
      <section className="shell contentShell">
        <Reveal><SectionHeading eyebrow="Publication process" title="Five stages, clearly explained" description="Editorial timelines can vary with subject, reviewer availability and the extent of revision required. Quality and research integrity take priority over speed." /></Reveal>
        <Reveal>
          <div className="processWrap">
            <span className="processTrack" aria-hidden="true" />
            <div className="processGrid">
              {publicationSteps.map((step, index) => <div className="processStep" style={{ "--i": index } as CSSProperties} key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}
            </div>
          </div>
        </Reveal>
        <div className="proseLayout" style={{ marginTop: 80 }}>
          <SideNav links={[{ id: "prepare", label: "Prepare" }, { id: "submit", label: "Submit" }, { id: "review", label: "Review" }, { id: "decision", label: "Decision" }, { id: "production", label: "Production" }]} />
          <article className="prose">
            <h2 id="prepare">1. Prepare your paper</h2>
            <p>Read the journal’s aims and author requirements before formatting your work. Use the manuscript template, check every citation, ensure that figures and tables are legible, and remove identifying information where a blinded file is requested.</p>
            <a className="button buttonOutline" href={externalDocuments.template} target="_blank" rel="noreferrer"><Download size={16} /> Download manuscript template</a>
            <h2 id="submit">2. Submit online</h2>
            <p>Complete the submission form with the manuscript title, research area, abstract, corresponding-author information, co-authors and institutional address. Upload only the final DOCX version intended for screening.</p>
            <p>After a successful submission, the corresponding author receives a unique tracking ID. Keep this ID with the submission email—it is required to check status.</p>
            <h2 id="review">3. Editorial screening & peer review</h2>
            <p>The editorial office first checks scope, originality, basic presentation and compliance. Suitable manuscripts are assigned to at least two independent subject experts under the journal’s double-blind model. Reviewers consider methodological quality, clarity, significance and ethical practice.</p>
            <h2 id="decision">4. Decision & revision</h2>
            <p>The Editor-in-Chief considers reviewer recommendations and editorial judgment. A manuscript may be accepted, returned for minor or major revision, or declined. When revision is invited, authors should submit a clean manuscript and a point-by-point response.</p>
            <h2 id="production">5. Proof & open-access publication</h2>
            <p>Following acceptance and completion of formalities, the paper proceeds to editorial preparation. Authors review the proof for minor production corrections. The final paper is then added to an issue with its publication metadata and made openly accessible.</p>
            <Callout tone="navy"><h3>Ready to begin?</h3><p>Confirm that the manuscript is original, complete and in DOCX format before opening the submission form.</p><Link className="button buttonLight" href="/submit">Start a submission <ArrowRight size={15} /></Link></Callout>
          </article>
        </div>
      </section>
    </>
  );
}

function GuidelinesPage() {
  const links = [{ id: "scope", label: "Scope & originality" }, { id: "format", label: "Manuscript format" }, { id: "structure", label: "Paper structure" }, { id: "review", label: "Peer review" }, { id: "ethics", label: "Ethics" }, { id: "acceptance", label: "After acceptance" }];
  return (
    <>
      <PageHero eyebrow="For authors" title="Author guidelines" description="Use these requirements to prepare a complete, readable and ethically compliant manuscript for editorial consideration." aside={<p><strong>Required format</strong>English language · DOCX file · Up to 10,000 words for a research article</p>} />
      <div className="shell contentShell proseLayout">
        <SideNav links={links} />
        <article className="prose">
          <h2 id="scope">1. Scope & originality</h2>
          <p>Submissions should fit the engineering and applied-science scope of IJITMES and make a clear contribution. A manuscript must be original, unpublished and not under review by another publication at the time of submission.</p>
          <ul><li>Write the paper in clear English.</li><li>Research articles should normally remain within 10,000 words, including references and figure captions.</li><li>Use a standard word processor and submit a DOCX file.</li><li>Identify all sources accurately and avoid duplicate or fragmented publication.</li></ul>
          <h2 id="format">2. General manuscript format</h2>
          <p>Use the IJITMES manuscript template for page layout, type sizes, columns, headings, figure captions and references. All tables and figures must remain readable at the intended publication size.</p>
          <a className="button buttonOutline" href={externalDocuments.template} target="_blank" rel="noreferrer"><Download size={16} /> Download manuscript template</a>
          <h2 id="structure">3. Recommended paper structure</h2>
          <h3>Title page</h3><p>Provide a concise title, the full name and affiliation of each author, corresponding-author contact information and relevant funding acknowledgements.</p>
          <h3>Abstract & keywords</h3><p>Include a 150–250 word abstract that states the objective, method, principal results and conclusion. Add four to six precise keywords.</p>
          <h3>Main text</h3><ul><li><strong>Introduction:</strong> context, literature, gap and objective.</li><li><strong>Methods:</strong> design, materials, data, procedures and analysis in enough detail for evaluation.</li><li><strong>Results:</strong> a clear account of the findings supported by appropriate tables or figures.</li><li><strong>Discussion:</strong> interpretation, comparison, implications and limitations.</li><li><strong>Conclusion:</strong> concise takeaways and, where appropriate, future work.</li></ul>
          <h3>References & supplementary material</h3><p>Every in-text citation must appear in the reference list and vice versa. Authors may include supporting datasets, additional figures or related files when they are clearly referenced in the manuscript.</p>
          <h2 id="review">4. Editorial and peer review</h2>
          <p>Submissions undergo editorial screening before eligible papers are assigned to at least two independent reviewers. IJITMES uses double-blind review. Authors may be asked to revise the paper and provide a point-by-point response before a final decision.</p>
          <h2 id="ethics">5. Research & publication ethics</h2>
          <ul><li>Disclose financial or personal conflicts of interest.</li><li>Obtain and state appropriate approval for research involving human participants or animals.</li><li>Do not fabricate, falsify or selectively misrepresent data.</li><li>Credit ideas, text, figures, code and data from others with accurate citation and permission where required.</li><li>List as authors only individuals who made a meaningful contribution and approve the submitted work.</li></ul>
          <Callout tone="cream"><h3>Plagiarism policy</h3><p>Manuscripts are screened for copied or improperly reused material. A submission with unacceptable overlap may be rejected. If a concern is substantiated after publication, the journal may issue a correction, notification or retraction and contact relevant institutions where appropriate.</p></Callout>
          <h2 id="acceptance">6. After acceptance</h2>
          <p>Authors receive a publication proof for final checking and should return corrections within the period stated by the editorial office. Only minor corrections are normally permitted at this stage. Publication charges and optional services are listed transparently on the charges page.</p>
          <div className="heroButtons"><Link className="button buttonPrimary" href="/submit">Submit a manuscript</Link><Link className="button buttonOutline" href="/fees">View publication charges</Link></div>
        </article>
      </div>
    </>
  );
}

function FeesPage() {
  return (
    <>
      <PageHero eyebrow="For authors" title="Publication charges" description="A transparent summary of the charges currently listed by IJITMES for accepted manuscripts and optional services." aside={<p><strong>No fee to submit</strong>Publication charges apply only after an editorial acceptance. Never make payment before receiving official instructions.</p>} />
      <section className="shell contentShell">
        <Reveal><SectionHeading eyebrow="Article processing" title="Standard publication options" description="The listed charge supports open-access publication, editorial preparation, layout and author e-certificates." /></Reveal>
        <div className="feeGrid">
          <div className="feeCard featured"><p>Authors in India</p><div className="feeAmount">₹449</div><h3>Standard publication charge</h3><ul><li>Up to 5 authors</li><li>Up to 20 manuscript pages</li><li>Online open-access publication</li><li>Editing and layout</li><li>Author e-certificates</li></ul></div>
          <div className="feeCard"><p>International authors</p><div className="feeAmount">$17</div><h3>Standard publication charge</h3><ul><li>Up to 7 authors</li><li>Up to 26 manuscript pages</li><li>Online open-access publication</li><li>Editing and layout</li><li>Author e-certificates</li></ul></div>
        </div>
        <div className="feeGrid">
          <div className="feeCard"><p>Optional service</p><div className="feeAmount">₹150</div><h3>DOI request — Indian authors</h3><p>Request the optional DOI service during the submission or acceptance process.</p></div>
          <div className="feeCard"><p>Optional service</p><div className="feeAmount">$3</div><h3>DOI request — International authors</h3><p>Request the optional DOI service before publication preparation is complete.</p></div>
        </div>
        <Reveal variant="scale">
          <div className="qrPanel">
            <img src="/images/upi-qr.jpg" alt="IJITMES UPI payment QR code" loading="lazy" />
            <div>
              <h3>Scan to pay via UPI</h3>
              <p>Pay by UPI, cards, wallets or net-banking. After payment, send the receipt screenshot to editor@ijitmes.com with your paper ID. International authors may use PayPal or supported cards.</p>
            </div>
          </div>
        </Reveal>
        <div className="prose" style={{ maxWidth: 800, marginTop: 55 }}>
          <h2>Payment guidance</h2>
          <p>Authors should pay only after receiving an acceptance notice and verified payment instructions from the journal’s official email address. Indian payments may be made using the supported UPI, card, wallet or net-banking options identified by the editorial office. International payment instructions are provided for supported card or PayPal payment.</p>
          <div className="feeNote"><Info size={21} /><p>Hard-copy certificates and a printed paper copy are available on request for an additional ₹300 where delivery is supported. Confirm current availability and delivery terms before payment.</p></div>
          <Callout tone="cream"><h3>Payment support</h3><p>For an invoice, payment verification or a question about optional services, contact <a href="mailto:editor@ijitmes.com">editor@ijitmes.com</a> and include your paper ID.</p></Callout>
        </div>
      </section>
    </>
  );
}

function PeerReviewPage() {
  const links = [{ id: "model", label: "Review model" }, { id: "process", label: "Process" }, { id: "responsibilities", label: "Responsibilities" }, { id: "decision", label: "Decisions" }, { id: "appeals", label: "Appeals" }];
  return (
    <><PageHero eyebrow="Editorial policy" title="Independent, confidential and constructive review." description="Peer review helps IJITMES evaluate the validity, clarity, originality and significance of submitted research before publication." aside={<p><strong>Review standard</strong>Double-blind assessment by at least two independent experts for manuscripts that pass editorial screening.</p>} />
    <div className="shell contentShell proseLayout"><SideNav links={links} /><article className="prose">
      <div className="policyBadge" style={{ background: "var(--c-surface)" }}>
        <img src="/images/plagiarism.jpg" alt="Plagiarism Checker X badge" style={{ filter: "none" }} />
        <span style={{ color: "var(--c-text-soft)" }}>Originality screening on every manuscript</span>
      </div>
      <h2 id="model">Purpose & review model</h2><p>IJITMES uses double-blind peer review: author identities are not disclosed to reviewers, and reviewer identities are not disclosed to authors. The model is intended to support impartial assessment and reduce avoidable sources of bias.</p>
      <h2 id="process">Review process</h2><ol><li>The editorial office screens the manuscript for scope, originality, presentation and compliance.</li><li>A suitable manuscript is sent to at least two independent experts in the relevant field.</li><li>Reviewers assess methodology, evidence, clarity, ethical compliance, significance and engagement with prior work.</li><li>Reviewers provide reasoned comments and recommend acceptance, revision or rejection.</li><li>The editor considers all reports and communicates a decision to the corresponding author.</li></ol>
      <h2 id="responsibilities">Responsibilities</h2><h3>Reviewers</h3><ul><li>Treat manuscripts and review correspondence as confidential.</li><li>Declare actual or potential conflicts of interest promptly.</li><li>Provide objective, evidence-based and constructive comments.</li><li>Avoid personal criticism and do not use unpublished information.</li></ul><h3>Authors</h3><ul><li>Submit original work and provide accurate data and attribution.</li><li>Disclose funding, conflicts of interest and relevant ethical approvals.</li><li>Address reviewer comments carefully and identify all changes.</li><li>Do not contact reviewers or attempt to compromise anonymous review.</li></ul>
      <h2 id="decision">Editorial decisions</h2><p>The Editor-in-Chief makes the final decision using reviewer recommendations, the manuscript record and editorial judgment. Conflicting or incomplete reports may lead to consultation with an additional reviewer. Acceptance is never guaranteed by submission or payment.</p>
      <h2 id="appeals">Appeals & ethical concerns</h2><p>An author may appeal a decision by sending a concise, evidence-based explanation to the editorial office. Appeals are reviewed fairly but do not guarantee a different outcome. Suspected plagiarism, fabricated data or other serious breaches are investigated, and appropriate correction or retraction action may follow.</p>
      <Callout tone="navy"><h3>Confidential editorial contact</h3><p>Questions about a review, appeal or publication-ethics concern can be sent to editor@ijitmes.com with the paper ID in the subject line.</p><a className="button buttonLight" href="mailto:editor@ijitmes.com"><Mail size={15} /> Contact the editor</a></Callout>
    </article></div></>
  );
}

function EditorialBoardPage() {
  return (
    <><PageHero eyebrow="Journal leadership" title="Editorial board" description="The editorial and reviewer team supports subject assessment, research integrity and the journal’s publication standards." />
    <section className="shell contentShell"><Reveal><div className="boardLead"><SectionHeading eyebrow="Editorial team" title="Expertise across disciplines" /><p>The board includes academic contributors from civil, computer, electronics, electrical, mechanical, environmental and applied-science disciplines. Editorial assignments are made with subject relevance and conflict-of-interest safeguards in mind.</p></div></Reveal>
    <div className="boardGrid">{board.map((member, index) => { const initials = member.name.replace(/Prof\.|Mr\.|Dr\./g, "").trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join(""); return <Reveal key={member.email} delay={(index % 3) * 110}><article className="boardCard lift">{member.photo ? <div className="boardPhoto"><img src={member.photo} alt={`Portrait of ${member.name}`} loading="lazy" /></div> : <div className="avatarMonogram" aria-hidden="true">{initials}</div>}<p className="role">{member.role}</p><h2>{member.name}</h2><p>{member.department}</p><p>{member.institution}</p><a href={`mailto:${member.email}`}>{member.email}</a></article></Reveal>; })}</div></section></>
  );
}

function PrivacyPage() {
  return (
    <><PageHero eyebrow="Site policy" title="Privacy policy" description="How IJITMES collects, uses and protects information supplied by authors, readers and editorial correspondents." />
    <div className="shell contentShell proseLayout"><SideNav links={[{ id: "collection", label: "Information collected" }, { id: "use", label: "How it is used" }, { id: "retention", label: "Retention & security" }, { id: "rights", label: "Your choices" }]} /><article className="prose">
      <h2 id="collection">Information we collect</h2><p>IJITMES receives information that you voluntarily provide through manuscript submission, paper tracking and contact forms. This may include names, email addresses, telephone numbers, affiliations, postal information, manuscript files, authorship information and correspondence. Basic technical logs may also be generated by the hosting platform for security and operation.</p>
      <h2 id="use">How information is used</h2><ul><li>Administer manuscript screening, peer review, editorial decisions and publication.</li><li>Communicate with authors, reviewers and readers about requested services.</li><li>Maintain publication records and investigate ethical or technical concerns.</li><li>Protect the service from abuse, fraud or unauthorized access.</li></ul><p>Information supplied for a submission is shared only as reasonably required for editorial and production work. Reviewer and author identity information is handled in accordance with the journal’s double-blind process.</p>
      <h2 id="retention">Retention & security</h2><p>Editorial records may be retained to preserve the scholarly record, document decisions and meet operational or legal requirements. IJITMES applies reasonable administrative and technical measures, but no internet transmission or storage system can be guaranteed to be completely secure.</p>
      <h2 id="rights">Your choices</h2><p>You may request correction of inaccurate contact information or ask a privacy question by emailing the editorial office. Certain submission or publication records may need to be retained for research-integrity and recordkeeping purposes.</p>
      <Callout tone="cream"><h3>Privacy contact</h3><p>Email <a href="mailto:editor@ijitmes.com">editor@ijitmes.com</a> with “Privacy request” in the subject line.</p></Callout>
    </article></div></>
  );
}

function TermsPage() {
  return (
    <><PageHero eyebrow="Site policy" title="Terms & conditions" description="The conditions that apply when using IJITMES services, content, submission tools and publication workflows." />
    <div className="shell contentShell proseLayout"><SideNav links={[{ id: "use", label: "Website use" }, { id: "submission", label: "Submissions" }, { id: "content", label: "Published content" }, { id: "fees", label: "Fees" }, { id: "liability", label: "Limitations" }]} /><article className="prose">
      <h2 id="use">Website use</h2><p>You may use this website for lawful research, reading, submission and correspondence purposes. You must not attempt to disrupt the service, gain unauthorized access, upload malicious material, misrepresent an identity or use the platform to violate another person’s rights.</p>
      <h2 id="submission">Author representations</h2><p>By submitting a manuscript, the corresponding author confirms that the provided information is accurate, all listed authors have approved the submission, the work is original, permissions have been obtained where required and the paper is not under conflicting publication consideration.</p>
      <h2 id="content">Published content</h2><p>Authors remain responsible for the accuracy and integrity of their work. Open-access availability does not remove the need to credit authors and the journal when content is reused. Third-party marks, figures, datasets or other material may be governed by separate rights.</p>
      <h2 id="fees">Fees & services</h2><p>Submission does not guarantee acceptance. A publication charge is requested only for accepted manuscripts according to the terms communicated by the editorial office. Optional DOI, printed paper and hard-copy certificate services may carry separate charges and availability conditions.</p>
      <h2 id="liability">Availability & limitation</h2><p>IJITMES aims to keep information accurate and services available but may update content, workflows, policies or charges when necessary. External links are provided for convenience and do not constitute control of third-party services. To the extent permitted by law, use of the website is at the user’s own risk.</p>
      <Callout tone="cream"><h3>Questions about these terms?</h3><p>Contact the editorial office before using a service if any requirement is unclear.</p><Link className="textLink" href="/contact">Contact IJITMES <ArrowRight size={14} /></Link></Callout>
    </article></div></>
  );
}

const faqs = [
  ["What subjects does IJITMES publish?", "The journal covers engineering, technology, computing, applied science, sustainability, materials, mathematical modelling and relevant interdisciplinary work."],
  ["What file format should I submit?", "Upload the manuscript as a DOCX file and prepare it with the official IJITMES manuscript template."],
  ["Does submission guarantee publication?", "No. Every manuscript is subject to editorial screening and, when suitable, independent peer review. Acceptance is based on quality, scope, ethics and editorial judgment."],
  ["How do I track my manuscript?", "Use the unique tracking ID issued after submission together with the corresponding author email address on the Track manuscript page."],
  ["Is IJITMES open access?", "Yes. Published papers are made available online for readers without a subscription."],
  ["What are the publication charges?", "The currently listed standard charge is ₹449 for Indian authors and $17 for international authors, with separate optional services. Payment is requested only after acceptance."],
  ["How does peer review work?", "Eligible papers are evaluated under a double-blind model by at least two independent experts. The Editor-in-Chief makes the final publication decision."],
  ["Who should I contact for help?", "Email editor@ijitmes.com and include your paper ID when asking about an existing submission."],
];

function FaqPage() {
  return (
    <><PageHero eyebrow="Support" title="Frequently asked questions" description="Quick answers about scope, submission, review, tracking, open access and publication charges." />
    <section className="shell contentShell" style={{ maxWidth: 900 }}><div className="faqList">{faqs.map(([question, answer], index) => <Reveal key={question} delay={index * 60}><details className="faqItem" open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details></Reveal>)}</div><Reveal delay={200}><Callout tone="cream"><h3>Still need help?</h3><p>The editorial office can assist with a submission, payment question or published paper record.</p><Link className="button buttonDark" href="/contact">Contact the editorial office</Link></Callout></Reveal></section></>
  );
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  switch (slug) {
    case "about": return <AboutPage />;
    case "publish": return <PublishPage />;
    case "guidelines": return <GuidelinesPage />;
    case "fees": return <FeesPage />;
    case "peer-review": return <PeerReviewPage />;
    case "editorial-board": return <EditorialBoardPage />;
    case "privacy": return <PrivacyPage />;
    case "terms": return <TermsPage />;
    case "faq": return <FaqPage />;
    default: notFound();
  }
}
