/**
 * API client for RByte.ai frontend
 * Uses Next.js API routes to proxy requests to the backend
 */

// Use the Next.js API route as the base URL
const API_BASE_URL = "/api/proxy"

/**
 * Helper function to handle API responses
 */
async function handleApiResponse(response: Response) {
  // Check if the response is JSON
  const contentType = response.headers.get("content-type")
  if (!contentType || !contentType.includes("application/json")) {
    // Not JSON, try to get the text for better error messages
    const text = await response.text()
    console.error("Non-JSON response:", text.substring(0, 200) + "...")
    throw new Error("Server returned non-JSON response. The API endpoint might be incorrect.")
  }

  // Parse JSON response
  const data = await response.json()

  // Check if response is ok (status 200-299)
  if (!response.ok) {
    throw new Error(data.detail || data.error || `API error: ${response.status}`)
  }

  return data
}

/**
 * Send OTP to a phone number
 */
export async function sendOTP(phone: string, countryCode = "+91") {
  try {
    console.log(`Sending OTP to ${countryCode}${phone}...`)

    const response = await fetch(`${API_BASE_URL}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        country_code: countryCode,
      }),
    })

    return await handleApiResponse(response)
  } catch (error) {
    console.error("Error sending OTP:", error)
    throw error
  }
}

/**
 * Verify OTP
 */
export async function verifyOTP(phone: string, otp: string, countryCode = "+91") {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-otp`, {
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

    return await handleApiResponse(response)
  } catch (error) {
    console.error("Error verifying OTP:", error)
    throw error
  }
}

/**
 * Register user interest
 */
export async function registerInterest(formData: {
  name: string
  email?: string
  phone: string
  country_code: string
  heard_from?: string
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    return await handleApiResponse(response)
  } catch (error) {
    console.error("Error registering interest:", error)
    throw error
  }
}

/**
 * Enroll user in course
 */
export async function enrollUser(formData: {
  name: string
  email: string
  phone: string
  country_code: string
  current_role: string
  experience: string
  programming_experience: string
  goals: string
  heard_from?: string
  preferred_batch: string
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    return await handleApiResponse(response)
  } catch (error) {
    console.error("Error enrolling user:", error)
    throw error
  }
}

/**
 * Register for masterclass
 */
export async function registerForMasterclass(formData: {
  name: string
  phone: string
  country_code: string
  email?: string
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/masterclass-register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    return await handleApiResponse(response)
  } catch (error) {
    console.error("Error registering for masterclass:", error)
    throw error
  }
}

/**
 * Download curriculum PDF
 */
export function downloadCurriculum() {
  window.open(`${API_BASE_URL}/curriculum`, "_blank")
}

/**
 * Test the API connection
 */
export async function testApiConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/debug/status`)
    return await handleApiResponse(response)
  } catch (error) {
    console.error("API connection test failed:", error)
    throw error
  }
}
