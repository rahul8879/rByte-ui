import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { phone, otp, countryCode } = body

    // Forward the request to the backend
    const response = await fetch("https://bytex-backend.onrender.com/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        otp,
        country_code: countryCode,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ message: data.detail || "Failed to verify OTP" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
