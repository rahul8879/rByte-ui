"use client"

import { useEffect, useState } from "react"
import LeadsDashboard from "@/components/admin/leads-dashboard"

// Define types for the leads data
interface Lead {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
  type: "registration" | "enrollment" | "masterclass"
  status: "new" | "contacted" | "converted" | "lost"
  // Additional fields based on lead type
  [key: string]: any
}

export default function LeadsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [leads, setLeads] = useState<Lead[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLeads() {
      try {
        setIsLoading(true)
        const response = await fetch("https://bytex-backend.onrender.com/api/all-leads")

        if (!response.ok) {
          throw new Error("Failed to fetch leads")
        }

        const data = await response.json()
        setLeads(data)
      } catch (err) {
        console.error("Error fetching leads:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [])

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <p>Please check your connection and try again.</p>
        </div>
      </div>
    )
  }

  return <LeadsDashboard isLoading={isLoading} leads={leads} />
}
