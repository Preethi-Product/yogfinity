import { promises as fs } from "fs";
import path from "path";
import type { StoredBooking } from "./bookings";

const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "yogfinity")
  : path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

async function readAll(): Promise<StoredBooking[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as StoredBooking[];
  } catch {
    return [];
  }
}

async function writeAll(bookings: StoredBooking[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export async function insertBookingFile(
  booking: StoredBooking
): Promise<{ storage: "file" }> {
  const existing = await readAll();
  existing.push(booking);
  await writeAll(existing);
  return { storage: "file" };
}

export async function countBookingsFile(): Promise<number> {
  const all = await readAll();
  return all.length;
}
