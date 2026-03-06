import { NextResponse } from "next/server"

// Stub — backend will implement persistence separately
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, role } = body

    // Basic validation
    if (!name || !email || !phone || !role) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      )
    }

    // TODO: Persist to database via Azure backend
    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demo-register`, { method: "POST", body: JSON.stringify({ name, email, phone, role }) })

    console.log("[demo-register] New lead:", { name, email, phone: phone.slice(-4).padStart(phone.length, "*"), role })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[demo-register] Error:", err)
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
