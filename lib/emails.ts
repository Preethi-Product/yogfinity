interface BookingDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  classChoice?: string;
  createdAt: string;
}

const TEAM_RECIPIENTS = [
  "kumari.preethi18@gmail.com",
  "aditi.singh1024@gmail.com",
];

const FROM_ADDRESS =
  process.env.RESEND_FROM ?? "YOGFINITY <onboarding@resend.dev>";

const PALETTE = {
  obsidian: "#0A0A0A",
  charcoal: "#1A1A1A",
  ivory: "#F5F0E8",
  amber: "#C9893A",
  border: "#2a2a2a",
  muted: "#8a8a82",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function shellHtml(title: string, inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${PALETTE.obsidian};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${PALETTE.ivory};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PALETTE.obsidian};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:${PALETTE.charcoal};border:1px solid ${PALETTE.border};border-radius:6px;overflow:hidden;">
          <tr>
            <td style="padding:32px 36px 16px;border-bottom:1px solid ${PALETTE.border};">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:6px;color:${PALETTE.ivory};text-transform:uppercase;">YOGFINITY</div>
              <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${PALETTE.amber};margin-top:6px;">Engineering the Human Body</div>
            </td>
          </tr>
          ${inner}
          <tr>
            <td style="padding:18px 36px 28px;border-top:1px solid ${PALETTE.border};font-size:11px;color:#5a5a52;letter-spacing:1px;">
              © 2026 YOGFINITY · This email was sent because someone submitted the booking form on yogfinity.com.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildTeamEmail(booking: BookingDetails): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New Founding-Spot Booking — ${booking.name}${
    booking.classChoice ? ` · ${booking.classChoice}` : ""
  }`;

  const detailRow = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${PALETTE.border};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${PALETTE.amber};width:120px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${PALETTE.border};font-size:14px;color:${PALETTE.ivory};">${value}</td>
    </tr>`;

  const inner = `
    <tr>
      <td style="padding:32px 36px 12px;">
        <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${PALETTE.amber};margin-bottom:14px;">New Booking</div>
        <h1 style="font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:30px;line-height:1.2;color:${PALETTE.ivory};margin:0 0 12px;">A new student has claimed a founding spot.</h1>
        <p style="font-size:14px;color:${PALETTE.muted};line-height:1.6;margin:0 0 24px;">Reach out within 24 hours to confirm and schedule their session.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 36px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${detailRow("Name", escapeHtml(booking.name))}
          ${detailRow("Email", `<a href="mailto:${escapeHtml(booking.email)}" style="color:${PALETTE.ivory};text-decoration:underline;">${escapeHtml(booking.email)}</a>`)}
          ${detailRow("Phone", `<a href="tel:${escapeHtml(booking.phone)}" style="color:${PALETTE.ivory};text-decoration:underline;">${escapeHtml(booking.phone)}</a>`)}
          ${booking.classChoice ? detailRow("Class", escapeHtml(booking.classChoice)) : ""}
          ${detailRow("Submitted", escapeHtml(formatDate(booking.createdAt)))}
          ${detailRow("Booking ID", `<code style="font-family:'SF Mono',Menlo,monospace;font-size:12px;color:${PALETTE.muted};">${escapeHtml(booking.id)}</code>`)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 36px 32px;">
        <a href="mailto:${escapeHtml(booking.email)}?subject=Welcome%20to%20YOGFINITY"
           style="display:inline-block;background:${PALETTE.amber};color:${PALETTE.obsidian};text-decoration:none;padding:12px 26px;border-radius:100px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:500;">Reply to ${escapeHtml(booking.name.split(" ")[0])}</a>
      </td>
    </tr>`;

  const text = [
    `New YOGFINITY founding-spot booking`,
    ``,
    `Name:        ${booking.name}`,
    `Email:       ${booking.email}`,
    `Phone:       ${booking.phone}`,
    booking.classChoice ? `Class:       ${booking.classChoice}` : null,
    `Submitted:   ${formatDate(booking.createdAt)}`,
    `Booking ID:  ${booking.id}`,
    ``,
    `Reach out within 24 hours to confirm.`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html: shellHtml(subject, inner), text };
}

export function buildCustomerEmail(booking: BookingDetails): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = booking.name.split(" ")[0];
  const subject = `Your YOGFINITY booking is in, ${firstName}.`;

  const inner = `
    <tr>
      <td style="padding:36px 36px 12px;">
        <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${PALETTE.amber};margin-bottom:14px;">Booking Received</div>
        <h1 style="font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:32px;line-height:1.2;color:${PALETTE.ivory};margin:0 0 18px;">Welcome, ${escapeHtml(firstName)}.</h1>
        <p style="font-size:15px;color:${PALETTE.muted};line-height:1.7;margin:0 0 18px;">Thank you for claiming a founding spot at YOGFINITY. We've received your details and will personally reach out within 24 hours to confirm your session and answer any questions.</p>
        ${
          booking.classChoice
            ? `<p style="font-size:15px;color:${PALETTE.muted};line-height:1.7;margin:0 0 18px;">You're booked for <span style="color:${PALETTE.amber};">${escapeHtml(booking.classChoice)}</span>. We'll match you with the right teacher and time.</p>`
            : ""
        }
      </td>
    </tr>
    <tr>
      <td style="padding:8px 36px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PALETTE.obsidian};border:1px solid ${PALETTE.border};border-radius:4px;">
          <tr>
            <td style="padding:20px 22px;">
              <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${PALETTE.amber};margin-bottom:10px;">Your Submission</div>
              <div style="font-size:14px;color:${PALETTE.ivory};line-height:1.8;">
                <strong style="font-weight:500;">${escapeHtml(booking.name)}</strong><br/>
                ${escapeHtml(booking.email)}<br/>
                ${escapeHtml(booking.phone)}
                ${booking.classChoice ? `<br/><span style="color:${PALETTE.amber};">${escapeHtml(booking.classChoice)}</span>` : ""}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 36px 12px;">
        <blockquote style="margin:0;padding:0 0 0 18px;border-left:2px solid ${PALETTE.amber};font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:18px;line-height:1.55;color:${PALETTE.ivory};">
          The body is not a problem to be fixed. It is an architecture to be understood.
        </blockquote>
        <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${PALETTE.amber};margin-top:12px;">— The YOGFINITY Method</div>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 36px 32px;">
        <p style="font-size:13px;color:${PALETTE.muted};line-height:1.7;margin:0;">In the meantime, follow us on Instagram and YouTube for daily movement reflections.<br/>If anything urgent comes up, just reply to this email.</p>
        <p style="font-size:13px;color:${PALETTE.muted};line-height:1.7;margin:18px 0 0;">— Aditi & the YOGFINITY team</p>
      </td>
    </tr>`;

  const text = [
    `Welcome, ${firstName}.`,
    ``,
    `We've received your YOGFINITY booking and will reach out within 24 hours to confirm.`,
    ``,
    `Your submission:`,
    `  Name:  ${booking.name}`,
    `  Email: ${booking.email}`,
    `  Phone: ${booking.phone}`,
    booking.classChoice ? `  Class: ${booking.classChoice}` : null,
    ``,
    `"The body is not a problem to be fixed. It is an architecture to be understood."`,
    `— The YOGFINITY Method`,
    ``,
    `Reply to this email if anything urgent comes up.`,
    `— Aditi & the YOGFINITY team`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html: shellHtml(subject, inner), text };
}

interface SendResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
}

export async function sendBookingEmails(booking: BookingDetails): Promise<{
  team: SendResult;
  customer: SendResult;
}> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[bookings/email] RESEND_API_KEY not set — skipping email send. Booking still saved."
    );
    return {
      team: { ok: false, skipped: true, error: "RESEND_API_KEY missing" },
      customer: { ok: false, skipped: true, error: "RESEND_API_KEY missing" },
    };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const teamEmail = buildTeamEmail(booking);
  const customerEmail = buildCustomerEmail(booking);

  const [teamRes, customerRes] = await Promise.allSettled([
    resend.emails.send({
      from: FROM_ADDRESS,
      to: TEAM_RECIPIENTS,
      replyTo: booking.email,
      subject: teamEmail.subject,
      html: teamEmail.html,
      text: teamEmail.text,
    }),
    resend.emails.send({
      from: FROM_ADDRESS,
      to: [booking.email],
      replyTo: TEAM_RECIPIENTS[0],
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
    }),
  ]);

  const interpret = (res: PromiseSettledResult<unknown>): SendResult => {
    if (res.status === "rejected") {
      return { ok: false, error: String(res.reason) };
    }
    const value = res.value as { error?: { message?: string } | null };
    if (value?.error) {
      return { ok: false, error: value.error.message ?? "Resend returned error" };
    }
    return { ok: true };
  };

  const result = {
    team: interpret(teamRes),
    customer: interpret(customerRes),
  };

  if (!result.team.ok)
    console.error("[bookings/email] team send failed:", result.team.error);
  if (!result.customer.ok)
    console.error("[bookings/email] customer send failed:", result.customer.error);

  return result;
}
