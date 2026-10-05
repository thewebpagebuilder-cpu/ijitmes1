import type { Metadata } from "next";
import { Clock3, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact the editorial office",
  description: "Contact IJITMES about submissions, published papers, payments or editorial questions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Contact the editorial office" description="Send a question about submission, review, publication records, payments or author services. Include your paper ID when contacting us about an existing manuscript." />
      <section className="shell contentShell contactGrid">
        <Reveal variant="left"><aside className="contactDetails">
          <div className="contactItem"><Mail size={22} /><h2>Email</h2><a href="mailto:editor@ijitmes.com">editor@ijitmes.com</a></div>
          <div className="contactItem"><MapPin size={22} /><h2>Editorial office</h2><p>Mahalaxmi Temple, Pimpalgaon Khamb,<br />Nashik, Maharashtra, India</p></div>
          <div className="contactItem"><Clock3 size={22} /><h2>Correspondence</h2><p>Messages are reviewed by the editorial office. Response time can vary during review and issue preparation periods.</p></div>
        </aside></Reveal>
        <Reveal variant="right" delay={120}>
          <div>
            <p className="eyebrow">Send an enquiry</p>
            <h2 style={{ margin: "0 0 28px", fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 400 }}>How can we help?</h2>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
