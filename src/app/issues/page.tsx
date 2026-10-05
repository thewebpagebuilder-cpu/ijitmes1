import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Search } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { articles, issues } from "@/lib/content";

export const metadata: Metadata = {
  title: "Issues & article archive",
  description: "Search IJITMES published articles and browse the issue archive.",
};

type SearchParams = Promise<{ q?: string; issue?: string }>;

export default async function IssuesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().toLowerCase();
  const issueFilter = (params.issue ?? "").trim();
  const filtered = articles.filter((article) => {
    const matchesQuery = !query || [article.paperId, article.title, article.authors.join(" "), article.field, article.abstract]
      .join(" ")
      .toLowerCase()
      .includes(query);
    const matchesIssue = !issueFilter || article.issue === issueFilter;
    return matchesQuery && matchesIssue;
  });

  return (
    <>
      <PageHero
        eyebrow="Digital library"
        title="Issues & article archive"
        description="Search published research by paper ID, title, author or subject, and browse the complete IJITMES issue record."
        aside={
          <div>
            <div className="coverStrip kb" style={{ height: 130, marginBottom: 16 }}>
              <img src="/images/current-issue.jpg" alt="IJITMES current issue cover" />
              <span className="issueLive"><span className="pulseDot" /> Now live</span>
            </div>
            <p><strong>Current issue</strong>Volume 1 · Issue 7 · 2025<br />All listed papers are open access.</p>
          </div>
        }
      />
      <section className="shell contentShell">
        <SectionHeading
          eyebrow={issueFilter ? `Volume 1 · Issue ${issueFilter}` : "Published research"}
          title={issueFilter ? `Papers in Issue ${issueFilter}` : "Search the digital library"}
          description="Article records include publication metadata, an abstract summary and a direct link to the published file."
        />
        <div className="issueTools">
          <form className="searchForm" action="/issues" method="get" role="search">
            {issueFilter && <input type="hidden" name="issue" value={issueFilter} />}
            <input name="q" defaultValue={params.q} placeholder="Paper ID, title, author or subject" aria-label="Search published papers" />
            <button type="submit" aria-label="Search"><Search size={19} /></button>
          </form>
          <p className="resultCount">{filtered.length} {filtered.length === 1 ? "paper" : "papers"} found</p>
        </div>

        {filtered.length > 0 ? (
          <div className="libraryList">
            {filtered.map((article, index) => (
              <Reveal key={article.paperId} delay={Math.min(index, 4) * 80}>
              <article className="paperRecord">
                <div className="paperRecordMeta">
                  <strong>{article.paperId}</strong>
                  Volume {article.volume}<br />Issue {article.issue}<br />{article.published}
                </div>
                <div>
                  <h2>{article.title}</h2>
                  <p className="paperAuthors">{article.authors.join(", ")} · {article.field}</p>
                  <p className="paperAbstract">{article.abstract}</p>
                  <div className="paperActions">
                    <a href={article.fileUrl} target="_blank" rel="noreferrer"><Download size={15} /> Download full text</a>
                    <Link href={`/issues?issue=${article.issue}`}>View Issue {article.issue} <ArrowRight size={14} /></Link>
                  </div>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="emptyState">
            <h2>No matching papers</h2>
            <p>Try a shorter title, an author surname or an IJITMES paper ID.</p>
            <Link className="textLink" href="/issues">Clear search <ArrowRight size={14} /></Link>
          </div>
        )}

        <section className="archiveSection" id="archive">
          <SectionHeading eyebrow="Archive" title="Completed issues" description="Browse the first volume of IJITMES by issue. Article records are added to the library as publication metadata becomes available." />
          <div className="archiveGrid">
            {issues.map((issue, index) => (
              <Reveal key={issue.issue} delay={(index % 4) * 90}>
                <Link className="archiveCard" href={`/issues?issue=${issue.issue}`}>
                  <small>{issue.period}</small>
                  <h3>{issue.label}</h3>
                  <p>{issue.paperCount > 0 ? `${issue.paperCount} ${issue.paperCount === 1 ? "paper" : "papers"} in library` : "Issue record"}</p>
                  <span className="textLink">View issue <ArrowRight size={14} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
