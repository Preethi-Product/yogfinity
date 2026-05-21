import { NextResponse } from "next/server";
import { sendBookingEmails } from "@/lib/emails";
import type { StoredBooking } from "@/lib/db/bookings";
import { getBookingCount, saveBooking } from "@/lib/db/store";

export const runtime = "nodejs";

interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  classChoice?: string;
}

function isValid(p: Partial<BookingPayload>): p is BookingPayload {
  if (!p.name || typeof p.name !== "string" || p.name.trim().length < 2) return false;
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return false;
  const digits = (p.phone ?? "").replace(/\D/g, "");
  if (digits.length < 7) return false;
  return true;
}

export async function POST(req: Request) {
  let body: Partial<BookingPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Please provide a valid name, email, and phone." },
      { status: 422 }
    );
  }

  const booking: StoredBooking = {
    id: `bk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone.trim(),
    classChoice:
      typeof body.classChoice === "string" && body.classChoice.trim()
        ? body.classChoice.trim()
        : undefined,
    createdAt: new Date().toISOString(),
  };

  let storage: "postgres" | "file";
  try {
    const result = await saveBooking(booking);
    storage = result.storage;
  } catch (err) {
    console.error("[bookings] failed to persist:", err);
    return NextResponse.json(
      { error: "Could not save booking. Please try again." },
      { status: 500 }
    );
  }

  console.log(
    `[bookings] saved (${storage}) — ${booking.name} <${booking.email}> ${booking.phone}${
      booking.classChoice ? ` · ${booking.classChoice}` : ""
    }`
  );

  const emails = await sendBookingEmails(booking).catch((err) => {
    console.error("[bookings] unexpected email error:", err);
    return null;
  });

  return NextResponse.json(
    {
      ok: true,
      id: booking.id,
      message: "Booking received.",
      storage,
      emails: emails
        ? {
            team: emails.team.ok,
            customer: emails.customer.ok,
            skipped: emails.team.skipped || emails.customer.skipped || false,
          }
        : null,
    },
    { status: 201 }
  );
}

export async function GET() {
  try {
    const { count, storage } = await getBookingCount();
    return NextResponse.json({ count, storage });
  } catch (err) {
    console.error("[bookings] count failed:", err);
    return NextResponse.json({ error: "Could not read bookings." }, { status: 500 });
  }
}
