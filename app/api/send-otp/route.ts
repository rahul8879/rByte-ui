import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { phone, countryCode } = body

    // Forward the request to the backend
    const response = await fetch("https://bytex-backend.onrender.com/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        country_code: countryCode,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ message: data.detail || "Failed to send OTP" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error sending OTP:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
