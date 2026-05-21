import type { StoredBooking } from "./bookings";
import {
  countBookings,
  insertBooking as insertPostgres,
  isDatabaseConfigured,
  listBookings,
} from "./bookings";
import { countBookingsFile, insertBookingFile } from "./file-fallback";

export type StorageBackend = "postgres" | "file";

export async function saveBooking(
  booking: StoredBooking
): Promise<{ storage: StorageBackend }> {
  if (isDatabaseConfigured()) {
    try {
      return await insertPostgres(booking);
    } catch (err) {
      console.error("[bookings/db] Postgres insert failed, using file fallback:", err);
    }
  }

  return insertBookingFile(booking);
}

export async function getBookingCount(): Promise<{
  count: number;
  storage: StorageBackend;
}> {
  if (isDatabaseConfigured()) {
    try {
      const count = await countBookings();
      return { count, storage: "postgres" };
    } catch (err) {
      console.error("[bookings/db] Postgres count failed, using file fallback:", err);
    }
  }

  const count = await countBookingsFile();
  return { count, storage: "file" };
}

export async function getRecentBookings(limit = 50) {
  if (!isDatabaseConfigured()) return null;
  try {
    return await listBookings(limit);
  } catch (err) {
    console.error("[bookings/db] list failed:", err);
    return null;
  }
}
