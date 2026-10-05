import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Download,
  Globe2,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { Counter, Reveal } from "@/components/motion";
import { articles, focusAreas, homeCollage, publicationSteps } from "@/lib/content";

export default function HomePage() {
  const featured = articles[0];

  return (
    <>
      <section className="homeHero">
        <div className="heroFx" aria-hidden="true">
          <span className="heroRing" />
          <span className="heroHex h1" />
          <span className="heroHex h2" />
          <span className="heroHex h3" />
        </div>
        <div className="shell homeHeroInner">
          <div className="heroCopy">
            <Reveal delay={0}>
              <p className="eyebrow">Engineering · Technology · Applied Science</p>
              <h1>
                Research that moves ideas into <span className="accentUnder">practice</span>.
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="heroDescription">
                IJITMES is a peer-reviewed, open-access journal for original research,
                reviews, case studies and technical work across modern engineering and science.
              </p>
              <div className="heroButtons">
                <Link className="button buttonPrimary" href="/submit">Submit your manuscript <ArrowRight size={17} /></Link>
                <Link className="button buttonOutline" href="/issues"><Search size={17} /> Explore the journal</Link>
              </div>
              <p className="heroFootnote">
                <span>Double-blind peer review</span>
                <span>Open access</span>
                <span>Monthly publication</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={220} variant="right">
            <aside className="currentIssueCard" aria-label="Current issue">
              <div className="coverStrip kb">
                <img src="/images/current-issue.jpg" alt="IJITMES current issue cover" />
                <span className="issueLive"><span className="pulseDot" /> Issue 7 now live</span>
              </div>
              <div className="issueTopline">
                <span>Current issue</span>
                <b>Volume 1 · Issue 7</b>
              </div>
              <h2>Innovations shaping connected, sustainable systems</h2>
              <p>Published 2025 · Available to read without subscription</p>
              <div className="issueFeature">
                <small>Featured article</small>
                <h3>{featured.title}</h3>
                <p>{featured.authors.join(", ")}</p>
                <a className="textLink" href={featured.fileUrl} target="_blank" rel="noreferrer">
                  Read article <ArrowRight size={14} />
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="journalFacts" aria-label="Journal facts">
        <div className="shell factsGrid">
          <Reveal delay={0}><div className="fact"><strong><Counter to={12} /><em> issues</em></strong><span>Published annually</span></div></Reveal>
          <Reveal delay={100}><div className="fact"><strong><Counter to={2} />+ reviewers</strong><span>Independent experts</span></div></Reveal>
          <Reveal delay={200}><div className="fact"><strong><Counter to={100} /><em>% open</em></strong><span>Free to every reader</span></div></Reveal>
          <Reveal delay={300}><div className="fact"><strong><Counter to={7} /><em> issues</em></strong><span>Archived in 2025</span></div></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell introGrid">
          <Reveal variant="left">
            <div className="introStatement">
              <p className="eyebrow">About the journal</p>
              <h2>A rigorous forum for relevant, interdisciplinary work.</h2>
              <Link className="button buttonDark" href="/about">Discover our aims & scope <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
          <div>
            <Reveal variant="right">
              <div className="introMedia kb">
                <img src="/images/stock/lab.jpg" alt="Researcher working in a laboratory" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="introBody">
                <p>
                  The International Journal of Innovative Technologies and Modern Trends in
                  Engineering and Science connects researchers, academics and practitioners
                  working on consequential technical and scientific questions.
                </p>
                <p>
                  We welcome original articles, reviews, technical notes and applied case
                  studies that demonstrate sound methods, clear communication and a meaningful
                  contribution to their field.
                </p>
                <div className="valueList">
                  <div className="valueItem">
                    <Globe2 size={24} />
                    <h3>Accessible by design</h3>
                    <p>Published work is freely available to readers around the world.</p>
                  </div>
                  <div className="valueItem">
                    <BookOpenCheck size={24} />
                    <h3>Broad, focused scope</h3>
                    <p>Interdisciplinary coverage united by technical relevance and quality.</p>
                  </div>
                  <div className="valueItem">
                    <ShieldCheck size={24} />
                    <h3>Independent assessment</h3>
                    <p>Eligible manuscripts proceed through double-blind peer review.</p>
                  </div>
                  <div className="valueItem">
                    <Scale size={24} />
                    <h3>Publication ethics</h3>
                    <p>Originality, disclosure, attribution and research integrity are required.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section sectionTint">
        <div className="shell">
          <SectionHeading
            eyebrow="Inside the journal"
            title="Where engineering meets applied science"
            description="The journal spans campus and laboratory, data and materials, systems and sustainability."
          />
          <div className="collage">
            {homeCollage.map((item, index) => (
              <Reveal key={item.src} delay={index * 130} variant="scale">
                <figure className="kb">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Recently published"
              title="New research from the journal"
              description="Explore the latest open-access papers across engineering, data systems and environmental science."
            />
          </Reveal>
          <div className="latestLayout">
            <div className="articleList">
              {articles.slice(0, 4).map((article, index) => (
                <Reveal key={article.paperId} delay={index * 90}>
                  <a className="articleRow" href={article.fileUrl} target="_blank" rel="noreferrer">
                    <div className="articleMeta"><span>{article.paperId}</span>Vol. {article.volume} · Issue {article.issue}</div>
                    <div>
                      <h3>{article.title}</h3>
                      <p>{article.authors.join(", ")} · {article.field}</p>
                    </div>
                    <span className="articleArrow"><ArrowRight size={16} /></span>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200} variant="right">
              <aside className="latestAside">
                <h3>Search the digital library</h3>
                <p>Find papers by title, author, subject or IJITMES paper ID.</p>
                <Link className="button buttonDark" href="/issues"><Search size={16} /> Search papers</Link>
                <Link className="button buttonOutline" href="/issues#archive">Browse the archive</Link>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section sectionTint">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Aims & scope"
              title="Areas of research coverage"
              description="IJITMES supports applied and interdisciplinary scholarship across established and emerging fields."
            />
          </Reveal>
          <div className="fieldGrid">
            {focusAreas.map((area, index) => (
              <Reveal key={area} delay={(index % 4) * 100}>
                <div className="fieldItem lift">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{area}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="For authors"
              title="A clear path from manuscript to publication"
              description="Review the requirements before submission and follow each editorial stage with your unique paper ID."
            />
          </Reveal>
          <Reveal>
            <div className="processWrap">
              <span className="processTrack" aria-hidden="true" />
              <div className="processGrid">
                {publicationSteps.map((step, index) => (
                  <div className="processStep" style={{ "--i": index } as CSSProperties} key={step.number}>
                    <span>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="processFooter">
              <p>Submission does not guarantee acceptance. Every editorial decision is based on scope, quality, ethics and reviewer recommendations.</p>
              <div className="heroButtons">
                <Link className="button buttonDark" href="/guidelines">Read author guidelines</Link>
                <a className="button buttonOutline" href="https://ijitmes.com/docs/IJITMES%20paper%20format%20Template%20final.docx">
                  <Download size={16} /> Download template
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ethicsBand">
        <div className="shell ethicsInner">
          <Reveal variant="left">
            <div>
              <p className="eyebrow light">Editorial integrity</p>
              <h2>Trust begins with a transparent process.</h2>
            </div>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <div>
              <div className="policyBadge">
                <img src="/images/plagiarism.jpg" alt="Plagiarism Checker X badge" />
                <span>Originality screening on every manuscript</span>
              </div>
              <p>
                Manuscripts are screened for originality and ethical compliance. Reviewers are
                expected to remain confidential, objective and free from conflicts of interest;
                authors must provide accurate attribution and disclose relevant approvals and
                competing interests.
              </p>
              <div className="ethicsLinks">
                <Link className="button buttonLight" href="/peer-review">Peer review policy</Link>
                <Link className="button buttonOutline" href="/guidelines#ethics">Author responsibilities</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
