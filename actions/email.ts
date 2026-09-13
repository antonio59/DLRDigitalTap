"use server"

import { Resend } from "resend"
import { escapeHtml } from "@/lib/html"

const resend = new Resend(process.env.RESEND_API_KEY)

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function sendContactEmail(formData: FormData) {
  try {
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const subject = String(formData.get("subject") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()
    const toAddress = process.env.CONTACT_TO_EMAIL

    if (!name || !email || !message) {
      return { success: false, error: "Missing required fields" }
    }

    if (!isValidEmail(email) || name.length > 120 || message.length > 4000 || subject.length > 200) {
      return { success: false, error: "Invalid form input" }
    }

    if (!toAddress) {
      return { success: false, error: "Contact inbox is not configured" }
    }

    const emailSubject = subject || "New Contact Form Submission"
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(emailSubject)
    const safeMessage = escapeHtml(message)

    const { data, error } = await resend.emails.send({
      from: "Digital Tap <contact@dlrdigitaltap.xyz>",
      to: [toAddress],
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Contact Details</h3>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
          </div>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Message</h3>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    if (error) {
      console.error("Error sending email:", error)
      return { success: false, error: "Failed to send email" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
