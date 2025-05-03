import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Redirect to the backend curriculum endpoint
    return NextResponse.redirect("https://bytex-backend.onrender.com/api/curriculum")
  } catch (error) {
    console.error("Error downloading curriculum:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
