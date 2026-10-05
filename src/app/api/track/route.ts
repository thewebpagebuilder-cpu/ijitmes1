import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { submissions } from "@/db/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { trackingId?: unknown; email?: unknown };
    const trackingId = typeof body.trackingId === "string" ? body.trackingId.trim().toUpperCase().slice(0, 32) : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 320) : "";

    if (!trackingId || !email.includes("@")) {
      return Response.json({ error: "Enter a valid paper ID and corresponding-author email." }, { status: 400 });
    }

    const [submission] = await db
      .select({
        trackingId: submissions.trackingId,
        paperTitle: submissions.paperTitle,
        researchArea: submissions.researchArea,
        authorName: submissions.authorName,
        status: submissions.status,
        statusNote: submissions.statusNote,
        createdAt: submissions.createdAt,
        updatedAt: submissions.updatedAt,
      })
      .from(submissions)
      .where(and(eq(submissions.trackingId, trackingId), eq(submissions.email, email)))
      .limit(1);

    if (!submission) {
      return Response.json({ error: "No manuscript matched those details. Check the ID and email, then try again." }, { status: 404 });
    }

    return Response.json({ ok: true, submission });
  } catch (error) {
    console.error("Tracking error", error);
    return Response.json({ error: "Status is temporarily unavailable. Please try again." }, { status: 500 });
  }
}
