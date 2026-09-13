import { NextResponse } from "next/server"
import {
  createSessionToken,
  verifyAdminPassword,
} from "@/lib/admin-session"

export const dynamic = "force-dynamic"

const COOKIE_NAME = "admin_session"

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin is not configured" }, { status: 503 })
  }

  let password = ""
  try {
    const body = (await request.json()) as { password?: string }
    password = body.password ?? ""
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })
  return response
}
