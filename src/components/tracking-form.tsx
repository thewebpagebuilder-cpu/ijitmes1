"use client";

import { useState, type FormEvent } from "react";
import { LoaderCircle, Search } from "lucide-react";

type TrackResult = {
  trackingId: string;
  paperTitle: string;
  researchArea: string;
  authorName: string;
  status: string;
  statusNote: string;
  createdAt: string;
  updatedAt: string;
};

export function TrackingForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TrackResult | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingId: form.get("trackingId"), email: form.get("email") }),
      });
      const body = await response.json() as { error?: string; submission?: TrackResult };
      if (!response.ok || !body.submission) throw new Error(body.error || "The manuscript could not be found.");
      setResult(body.submission);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Status could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="trackFormWrap">
      <form className="trackForm" onSubmit={handleSubmit}>
        <div className="field"><label htmlFor="trackingId">Paper ID</label><input id="trackingId" name="trackingId" required maxLength={32} placeholder="IJITMES-2026-XXXXXXXX" autoCapitalize="characters" /></div>
        <div className="field"><label htmlFor="trackEmail">Corresponding-author email</label><input id="trackEmail" name="email" type="email" required maxLength={320} placeholder="author@institution.edu" /></div>
        <button className="button buttonPrimary" type="submit" disabled={loading}>{loading ? <><LoaderCircle size={17} className="spin" /> Checking…</> : <><Search size={17} /> Check status</>}</button>
        {error && <p className="formStatus error" role="alert">{error}</p>}
      </form>

      <div aria-live="polite">
        {result ? (
          <article className="trackResult">
            <span className="statusBadge">{result.status}</span>
            <h2>{result.paperTitle}</h2>
            <p>{result.statusNote}</p>
            <div className="trackMeta">
              <div><small>Paper ID</small><strong>{result.trackingId}</strong></div>
              <div><small>Corresponding author</small><strong>{result.authorName}</strong></div>
              <div><small>Research area</small><strong>{result.researchArea}</strong></div>
              <div><small>Submitted</small><strong>{new Date(result.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</strong></div>
            </div>
          </article>
        ) : (
          <div className="infoPanel">
            <h2>Private status lookup</h2>
            <p>For author privacy, the email must match the address entered on the original submission. Status information is not available by paper ID alone.</p>
            <p>If you cannot locate your paper ID, search the acknowledgement shown after submission or contact the editorial office from the corresponding-author email.</p>
          </div>
        )}
      </div>
    </div>
  );
}
