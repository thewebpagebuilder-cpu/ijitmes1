import { randomBytes } from "node:crypto";
import { db } from "@/db";
import { submissions } from "@/db/schema";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function text(form: FormData, key: string, max = 1000) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const paperTitle = text(form, "paperTitle", 500);
    const researchArea = text(form, "researchArea", 250);
    const abstract = text(form, "abstract", 10000);
    const authorName = text(form, "authorName", 200);
    const designation = text(form, "designation", 200);
    const organization = text(form, "organization", 300);
    const email = text(form, "email", 320).toLowerCase();
    const mobile = text(form, "mobile", 40);
    const postalCode = text(form, "postalCode", 24);
    const country = text(form, "country", 120);
    const state = text(form, "state", 120);
    const city = text(form, "city", 120);
    const paperFile = form.get("paperFile");

    const required = [paperTitle, researchArea, authorName, designation, organization, email, mobile, postalCode, country, state, city];
    if (required.some((value) => !value) || !email.includes("@")) {
      return Response.json({ error: "Please complete all required fields with valid information." }, { status: 400 });
    }
    if (!(paperFile instanceof File)) {
      return Response.json({ error: "Please attach your manuscript as a DOCX file." }, { status: 400 });
    }
    if (!paperFile.name.toLowerCase().endsWith(".docx")) {
      return Response.json({ error: "Only DOCX manuscript files are accepted." }, { status: 400 });
    }
    if (paperFile.size < 1 || paperFile.size > MAX_FILE_SIZE) {
      return Response.json({ error: "The manuscript must be smaller than 10 MB." }, { status: 400 });
    }

    let coAuthors: Array<{ name: string; organization: string; email: string }> = [];
    const rawCoAuthors = text(form, "coAuthors", 20000);
    if (rawCoAuthors) {
      try {
        const parsed: unknown = JSON.parse(rawCoAuthors);
        if (Array.isArray(parsed)) {
          coAuthors = parsed.slice(0, 15).map((item) => {
            const entry = item as Record<string, unknown>;
            return {
              name: String(entry.name ?? "").trim().slice(0, 200),
              organization: String(entry.organization ?? "").trim().slice(0, 300),
              email: String(entry.email ?? "").trim().toLowerCase().slice(0, 320),
            };
          }).filter((item) => item.name && item.organization && item.email.includes("@"));
        }
      } catch {
        return Response.json({ error: "Co-author information could not be read." }, { status: 400 });
      }
    }

    const trackingId = `IJITMES-${new Date().getUTCFullYear()}-${randomBytes(4).toString("hex").toUpperCase()}`;
    const fileData = Buffer.from(await paperFile.arrayBuffer());

    await db.insert(submissions).values({
      trackingId,
      paperTitle,
      researchArea,
      abstract: abstract || null,
      authorName,
      designation,
      organization,
      email,
      mobile,
      coAuthors,
      postalCode,
      country,
      state,
      city,
      fileName: paperFile.name.slice(0, 500),
      fileSize: paperFile.size,
      fileData,
    });

    return Response.json({
      ok: true,
      trackingId,
      message: "Your manuscript has been received by the editorial office.",
    }, { status: 201 });
  } catch (error) {
    console.error("Submission error", error);
    return Response.json({ error: "The submission could not be saved. Please try again." }, { status: 500 });
  }
}
