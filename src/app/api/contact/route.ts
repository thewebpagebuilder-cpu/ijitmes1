import { db } from "@/db";
import { enquiries } from "@/db/schema";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = clean(body.name, 200);
    const email = clean(body.email, 320).toLowerCase();
    const mobile = clean(body.mobile, 40);
    const subject = clean(body.subject, 300);
    const message = clean(body.message, 5000);

    if (!name || !email.includes("@") || !subject || message.length < 10) {
      return Response.json({ error: "Please provide your name, a valid email, subject and message." }, { status: 400 });
    }

    await db.insert(enquiries).values({ name, email, mobile: mobile || null, subject, message });
    return Response.json({ ok: true, message: "Thank you. Your message has been sent to the editorial office." }, { status: 201 });
  } catch (error) {
    console.error("Contact error", error);
    return Response.json({ error: "Your message could not be sent. Please try again." }, { status: 500 });
  }
}
