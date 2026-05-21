import { sql } from "@vercel/postgres";

export interface StoredBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  classChoice?: string;
  createdAt: string;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(
    process.env.POSTGRES_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL
  );
}

let schemaReady = false;

export async function ensureBookingsTable(): Promise<void> {
  if (schemaReady) return;

  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      class_choice TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS bookings_created_at_idx
    ON bookings (created_at DESC)
  `;

  schemaReady = true;
}

export async function insertBooking(
  booking: StoredBooking
): Promise<{ storage: "postgres" }> {
  await ensureBookingsTable();

  await sql`
    INSERT INTO bookings (id, name, email, phone, class_choice, created_at)
    VALUES (
      ${booking.id},
      ${booking.name},
      ${booking.email},
      ${booking.phone},
      ${booking.classChoice ?? null},
      ${booking.createdAt}
    )
  `;

  return { storage: "postgres" };
}

export async function countBookings(): Promise<number> {
  await ensureBookingsTable();
  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*)::text AS count FROM bookings
  `;
  return parseInt(rows[0]?.count ?? "0", 10);
}

export async function listBookings(limit = 50): Promise<StoredBooking[]> {
  await ensureBookingsTable();
  const { rows } = await sql<{
    id: string;
    name: string;
    email: string;
    phone: string;
    class_choice: string | null;
    created_at: Date;
  }>`
    SELECT id, name, email, phone, class_choice, created_at
    FROM bookings
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    classChoice: row.class_choice ?? undefined,
    createdAt: new Date(row.created_at).toISOString(),
  }));
}
