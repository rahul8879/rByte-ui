import { type NextRequest, NextResponse } from "next/server"

// The backend API base URL
const API_BASE_URL = "https://bytex-backend.onrender.com/api"

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    // Construct the path from the path segments
    const path = params.path.join("/")

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const queryString = searchParams.toString()
    const url = `${API_BASE_URL}/${path}${queryString ? `?${queryString}` : ""}`

    console.log(`Proxying GET request to: ${url}`)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    // If the response is not JSON, return the raw response
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      // For non-JSON responses (like PDF), pass through the response
      const blob = await response.blob()
      return new NextResponse(blob, {
        status: response.status,
        headers: {
          "Content-Type": contentType || "application/octet-stream",
        },
      })
    }

    // For JSON responses
    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error(`Error proxying GET request:`, error)
    return NextResponse.json({ error: "Failed to proxy request" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    // Construct the path from the path segments
    const path = params.path.join("/")
    const url = `${API_BASE_URL}/${path}`

    console.log(`Proxying POST request to: ${url}`)

    // Get the request body
    const body = await request.json()
    console.log("Request body:", body)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    // Log response details for debugging
    console.log(`Response status: ${response.status}`)
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()))

    // If the response is not JSON, return an error
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text()
      console.error("Non-JSON response:", text.substring(0, 200) + "...")
      return NextResponse.json(
        { error: "Server returned non-JSON response", details: text.substring(0, 500) },
        { status: 500 },
      )
    }

    // For JSON responses
    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error(`Error proxying POST request:`, error)
    return NextResponse.json(
      { error: "Failed to proxy request", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
