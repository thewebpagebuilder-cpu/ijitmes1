"use client";

import { useState, type FormEvent } from "react";
import { LoaderCircle, Send } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<{ loading: boolean; type?: "success" | "error"; message?: string }>({ loading: false });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setState({ loading: true });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const body = await response.json() as { error?: string; message?: string };
      if (!response.ok) throw new Error(body.error || "Your message could not be sent.");
      formElement.reset();
      setState({ loading: false, type: "success", message: body.message });
    } catch (error) {
      setState({ loading: false, type: "error", message: error instanceof Error ? error.message : "Your message could not be sent." });
    }
  }

  return (
    <form className="formCard" onSubmit={handleSubmit}>
      <div className="fieldRow">
        <div className="field"><label htmlFor="contactName">Your name <span>*</span></label><input id="contactName" name="name" required maxLength={200} autoComplete="name" /></div>
        <div className="field"><label htmlFor="contactEmail">Email address <span>*</span></label><input id="contactEmail" name="email" type="email" required maxLength={320} autoComplete="email" /></div>
      </div>
      <div className="field"><label htmlFor="contactMobile">Mobile number</label><input id="contactMobile" name="mobile" type="tel" maxLength={40} autoComplete="tel" /></div>
      <div className="field"><label htmlFor="contactSubject">Subject <span>*</span></label><input id="contactSubject" name="subject" required maxLength={300} placeholder="e.g. Question about paper IJITMES-…" /></div>
      <div className="field"><label htmlFor="contactMessage">Message <span>*</span></label><textarea id="contactMessage" name="message" required minLength={10} maxLength={5000} /></div>
      <div className="formActions">
        <button className="button buttonPrimary" type="submit" disabled={state.loading}>{state.loading ? <><LoaderCircle size={17} className="spin" /> Sending…</> : <><Send size={16} /> Send message</>}</button>
        {state.message && <p className={`formStatus ${state.type === "error" ? "error" : ""}`} role={state.type === "error" ? "alert" : "status"}>{state.message}</p>}
      </div>
    </form>
  );
}
