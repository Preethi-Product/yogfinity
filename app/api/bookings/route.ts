import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { sendBookingEmails } from "@/lib/emails";

export const runtime = "nodejs";

interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  classChoice?: string;
}

interface StoredBooking extends BookingPayload {
  id: string;
  createdAt: string;
}

// Vercel serverless: only /tmp is writable; local dev uses ./data
const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "yogfinity")
  : path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

function isValid(p: Partial<BookingPayload>): p is BookingPayload {
  if (!p.name || typeof p.name !== "string" || p.name.trim().length < 2) return false;
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return false;
  const digits = (p.phone ?? "").replace(/\D/g, "");
  if (digits.length < 7) return false;
  return true;
}

async function readBookings(): Promise<StoredBooking[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as StoredBooking[];
  } catch {
    return [];
  }
}

async function writeBookings(bookings: StoredBooking[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
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

  try {
    const existing = await readBookings();
    existing.push(booking);
    await writeBookings(existing);
  } catch (err) {
    console.error("[bookings] failed to persist:", err);
    return NextResponse.json(
      { error: "Could not save booking. Please try again." },
      { status: 500 }
    );
  }

  console.log(
    `[bookings] new assessment request — ${booking.name} <${booking.email}> ${booking.phone}${
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
  const bookings = await readBookings();
  return NextResponse.json({ count: bookings.length });
}
