import { json, type FunctionContext } from "../_lib/env"

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function onRequestPost({ request, env }: FunctionContext): Promise<Response> {
  try {
    const formData = await request.formData()
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const subject = String(formData.get("subject") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()

    if (!name || !email || !message) {
      return json({ success: false, error: "Missing required fields" }, 400)
    }

    if (
      !isValidEmail(email) ||
      name.length > 120 ||
      message.length > 4000 ||
      subject.length > 200
    ) {
      return json({ success: false, error: "Invalid form input" }, 400)
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
      return json({ success: false, error: "Contact inbox is not configured" }, 503)
    }

    const emailSubject = subject || "New Contact Form Submission"

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Digital Tap <contact@dlrdigitaltap.xyz>",
        to: [env.CONTACT_TO_EMAIL],
        subject: emailSubject,
        reply_to: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Contact Form Submission</h2>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Contact Details</h3>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Subject:</strong> ${escapeHtml(emailSubject)}</p>
            </div>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Message</h3>
              <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      console.error("Resend error:", response.status, await response.text())
      return json({ success: false, error: "Failed to send email" }, 502)
    }

    return json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return json({ success: false, error: "Failed to send email" }, 500)
  }
}
