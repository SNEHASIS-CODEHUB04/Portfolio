"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: {
  name: string;
  email: string;
  project: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    return { error: "Email service not configured." };
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "sdutta04.kir@gmail.com",
      replyTo: data.email,
      subject: `New message from ${data.name} — Portfolio`,
      html: `
        <div style="font-family:monospace;max-width:560px;margin:0 auto;padding:32px;background:#0a0a0a;color:#f0f0ea;border-radius:12px;border:1px solid #222;">
          <h2 style="color:#00ffff;margin:0 0 24px;">📬 New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#888;width:80px;">Name</td>
              <td style="padding:8px 0;font-weight:bold;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#888;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#00ffff;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#888;vertical-align:top;">Message</td>
              <td style="padding:8px 0;white-space:pre-wrap;">${data.project}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #222;margin:24px 0;" />
          <p style="color:#555;font-size:12px;margin:0;">Sent from your portfolio contact form</p>
        </div>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Failed to send. Please try again." };
  }
}
