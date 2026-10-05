"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, LoaderCircle, Plus, Trash2 } from "lucide-react";

type CoAuthor = { name: string; organization: string; email: string };

export function SubmissionForm() {
  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([]);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "error"; message?: string }>({ type: "idle" });
  const [trackingId, setTrackingId] = useState("");

  function updateCoAuthor(index: number, key: keyof CoAuthor, value: string) {
    setCoAuthors((current) => current.map((author, authorIndex) => authorIndex === index ? { ...author, [key]: value } : author));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading" });
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("coAuthors", JSON.stringify(coAuthors));

    try {
      const response = await fetch("/api/submissions", { method: "POST", body: data });
      const result = await response.json() as { error?: string; trackingId?: string };
      if (!response.ok || !result.trackingId) throw new Error(result.error || "Submission failed.");
      setTrackingId(result.trackingId);
      setStatus({ type: "idle" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Submission failed. Please try again." });
    }
  }

  if (trackingId) {
    return (
      <section className="successPanel" aria-live="polite">
        <CheckCircle2 size={38} />
        <h2>Manuscript received</h2>
        <p>Your submission is now in the editorial queue. Save this paper ID—you will need it together with the corresponding-author email to check status.</p>
        <div className="trackingCode">{trackingId}</div>
        <div className="heroButtons">
          <Link className="button buttonDark" href="/track">Track this manuscript</Link>
          <button className="button buttonOutline" type="button" onClick={() => { setTrackingId(""); setCoAuthors([]); }}>Submit another paper</button>
        </div>
      </section>
    );
  }

  return (
    <form className="formCard" onSubmit={handleSubmit} noValidate={false}>
      <section className="formSection">
        <div className="formSectionTitle"><span>1</span><div><h2>Paper details</h2><p>Tell the editorial office what you are submitting.</p></div></div>
        <div className="field"><label htmlFor="paperTitle">Paper title <span>*</span></label><input id="paperTitle" name="paperTitle" required maxLength={500} /></div>
        <div className="field"><label htmlFor="researchArea">Research area <span>*</span></label><input id="researchArea" name="researchArea" required maxLength={250} placeholder="e.g. Renewable energy systems" /></div>
        <div className="field"><label htmlFor="abstract">Abstract</label><textarea id="abstract" name="abstract" maxLength={10000} placeholder="A concise summary of the objective, methods, results and conclusion" /></div>
        <div className="field fileField"><label htmlFor="paperFile">Manuscript file <span>*</span></label><input id="paperFile" name="paperFile" type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required /><small>DOCX only · Maximum file size 10 MB</small></div>
      </section>

      <section className="formSection">
        <div className="formSectionTitle"><span>2</span><div><h2>Corresponding author</h2><p>This person will receive all editorial communication.</p></div></div>
        <div className="fieldRow"><div className="field"><label htmlFor="authorName">Full name <span>*</span></label><input id="authorName" name="authorName" required maxLength={200} /></div><div className="field"><label htmlFor="designation">Designation <span>*</span></label><input id="designation" name="designation" required maxLength={200} /></div></div>
        <div className="field"><label htmlFor="organization">Institution / organization <span>*</span></label><input id="organization" name="organization" required maxLength={300} /></div>
        <div className="fieldRow"><div className="field"><label htmlFor="email">Email <span>*</span></label><input id="email" name="email" type="email" required maxLength={320} /></div><div className="field"><label htmlFor="mobile">Mobile number <span>*</span></label><input id="mobile" name="mobile" type="tel" required maxLength={40} /></div></div>
      </section>

      <section className="formSection">
        <div className="formSectionTitle"><span>3</span><div><h2>Co-authors</h2><p>Add every contributing author in the intended publication order.</p></div></div>
        {coAuthors.map((author, index) => (
          <div className="coAuthor" key={index}>
            <button className="removeButton" type="button" onClick={() => setCoAuthors((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove co-author ${index + 1}`}><Trash2 size={15} /></button>
            <div className="field"><label htmlFor={`coName-${index}`}>Co-author name</label><input id={`coName-${index}`} value={author.name} onChange={(event) => updateCoAuthor(index, "name", event.target.value)} required /></div>
            <div className="fieldRow"><div className="field"><label htmlFor={`coOrg-${index}`}>Institution</label><input id={`coOrg-${index}`} value={author.organization} onChange={(event) => updateCoAuthor(index, "organization", event.target.value)} required /></div><div className="field"><label htmlFor={`coEmail-${index}`}>Email</label><input id={`coEmail-${index}`} type="email" value={author.email} onChange={(event) => updateCoAuthor(index, "email", event.target.value)} required /></div></div>
          </div>
        ))}
        <button className="addButton" type="button" disabled={coAuthors.length >= 15} onClick={() => setCoAuthors((current) => [...current, { name: "", organization: "", email: "" }])}><Plus size={15} /> Add co-author</button>
      </section>

      <section className="formSection">
        <div className="formSectionTitle"><span>4</span><div><h2>Correspondence address</h2><p>Provide the primary author’s institutional or mailing location.</p></div></div>
        <div className="fieldRow"><div className="field"><label htmlFor="postalCode">Postal code <span>*</span></label><input id="postalCode" name="postalCode" required maxLength={24} /></div><div className="field"><label htmlFor="country">Country <span>*</span></label><input id="country" name="country" required maxLength={120} /></div></div>
        <div className="fieldRow"><div className="field"><label htmlFor="state">State / province <span>*</span></label><input id="state" name="state" required maxLength={120} /></div><div className="field"><label htmlFor="city">City <span>*</span></label><input id="city" name="city" required maxLength={120} /></div></div>
      </section>

      <div className="formActions">
        <button className="button buttonPrimary" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? <><LoaderCircle size={17} className="spin" /> Submitting…</> : "Submit manuscript"}
        </button>
        {status.type === "error" && <p className="formStatus error" role="alert">{status.message}</p>}
      </div>
    </form>
  );
}
