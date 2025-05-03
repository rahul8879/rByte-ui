"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

// Define types for our data
interface Registration {
  id: number
  name: string
  email: string | null
  phone: string
  country_code: string
  heard_from: string | null
  created_at: string
}

interface Enrollment {
  id: number
  name: string
  email: string
  phone: string
  country_code: string
  current_role: string
  experience: string
  programming_experience: string
  goals: string
  heard_from: string | null
  preferred_batch: string
  created_at: string
  payment_status: boolean
}

interface MasterclassRegistration {
  id: number
  name: string
  email: string | null
  phone: string
  country_code: string
  created_at: string
  attended: boolean
}

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

interface AllLeadsResponse {
  counts: {
    registrations: number
    enrollments: number
    masterclass_registrations: number
    total_leads: number
  }
  recent_leads: {
    registrations: Registration[]
    enrollments: Enrollment[]
    masterclass_registrations: MasterclassRegistration[]
  }
  timestamp: string
}

export default function LeadsDashboard() {
  // State for each tab
  const [activeTab, setActiveTab] = useState("overview")
  const [allLeads, setAllLeads] = useState<AllLeadsResponse | null>(null)
  const [registrations, setRegistrations] = useState<PaginatedResponse<Registration> | null>(null)
  const [enrollments, setEnrollments] = useState<PaginatedResponse<Enrollment> | null>(null)
  const [masterclassRegistrations, setMasterclassRegistrations] =
    useState<PaginatedResponse<MasterclassRegistration> | null>(null)

  // Pagination state
  const [registrationsPage, setRegistrationsPage] = useState(1)
  const [enrollmentsPage, setEnrollmentsPage] = useState(1)
  const [masterclassPage, setMasterclassPage] = useState(1)

  // Loading states
  const [loading, setLoading] = useState({
    overview: false,
    registrations: false,
    enrollments: false,
    masterclass: false,
  })

  // Fetch all leads overview
  const fetchAllLeads = async () => {
    setLoading((prev) => ({ ...prev, overview: true }))
    try {
      const response = await fetch("/api/all-leads")
      if (!response.ok) throw new Error("Failed to fetch leads")
      const data = await response.json()
      setAllLeads(data)
    } catch (error) {
      console.error("Error fetching all leads:", error)
    } finally {
      setLoading((prev) => ({ ...prev, overview: false }))
    }
  }

  // Fetch registrations with pagination
  const fetchRegistrations = async (page = 1) => {
    setLoading((prev) => ({ ...prev, registrations: true }))
    try {
      const response = await fetch(`/api/registrations?page=${page}&page_size=10`)
      if (!response.ok) throw new Error("Failed to fetch registrations")
      const data = await response.json()
      setRegistrations(data)
    } catch (error) {
      console.error("Error fetching registrations:", error)
    } finally {
      setLoading((prev) => ({ ...prev, registrations: false }))
    }
  }

  // Fetch enrollments with pagination
  const fetchEnrollments = async (page = 1) => {
    setLoading((prev) => ({ ...prev, enrollments: true }))
    try {
      const response = await fetch(`/api/enrollments?page=${page}&page_size=10`)
      if (!response.ok) throw new Error("Failed to fetch enrollments")
      const data = await response.json()
      setEnrollments(data)
    } catch (error) {
      console.error("Error fetching enrollments:", error)
    } finally {
      setLoading((prev) => ({ ...prev, enrollments: false }))
    }
  }

  // Fetch masterclass registrations with pagination
  const fetchMasterclassRegistrations = async (page = 1) => {
    setLoading((prev) => ({ ...prev, masterclass: true }))
    try {
      const response = await fetch(`/api/masterclass-registrations?page=${page}&page_size=10`)
      if (!response.ok) throw new Error("Failed to fetch masterclass registrations")
      const data = await response.json()
      setMasterclassRegistrations(data)
    } catch (error) {
      console.error("Error fetching masterclass registrations:", error)
    } finally {
      setLoading((prev) => ({ ...prev, masterclass: false }))
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Fetch data for the selected tab if not already loaded
    if (value === "overview" && !allLeads) {
      fetchAllLeads()
    } else if (value === "registrations" && !registrations) {
      fetchRegistrations()
    } else if (value === "enrollments" && !enrollments) {
      fetchEnrollments()
    } else if (value === "masterclass" && !masterclassRegistrations) {
      fetchMasterclassRegistrations()
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchAllLeads()
  }, [])

  // Handle pagination for registrations
  const handleRegistrationsPageChange = (page: number) => {
    setRegistrationsPage(page)
    fetchRegistrations(page)
  }

  // Handle pagination for enrollments
  const handleEnrollmentsPageChange = (page: number) => {
    setEnrollmentsPage(page)
    fetchEnrollments(page)
  }

  // Handle pagination for masterclass registrations
  const handleMasterclassPageChange = (page: number) => {
    setMasterclassPage(page)
    fetchMasterclassRegistrations(page)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Leads Dashboard</h1>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          <TabsTrigger value="masterclass">Masterclass</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          {loading.overview ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : allLeads ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{allLeads.counts.total_leads}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{allLeads.counts.registrations}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{allLeads.counts.enrollments}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Masterclass</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{allLeads.counts.masterclass_registrations}</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center p-8">Failed to load overview data</div>
          )}

          {/* Recent Leads */}
          {allLeads && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Registrations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Registrations</CardTitle>
                  <CardDescription>Latest course registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {allLeads.recent_leads.registrations.map((reg) => (
                      <li key={reg.id} className="border-b pb-2">
                        <p className="font-medium">{reg.name}</p>
                        <p className="text-sm text-gray-500">{reg.email || "No email"}</p>
                        <p className="text-sm text-gray-500">
                          {reg.country_code} {reg.phone}
                        </p>
                        <p className="text-xs text-gray-400">{formatDate(reg.created_at)}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" onClick={() => handleTabChange("registrations")}>
                    View All Registrations
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Enrollments */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Enrollments</CardTitle>
                  <CardDescription>Latest course enrollments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {allLeads.recent_leads.enrollments.map((enroll) => (
                      <li key={enroll.id} className="border-b pb-2">
                        <div className="flex justify-between">
                          <p className="font-medium">{enroll.name}</p>
                          <Badge variant={enroll.payment_status ? "success" : "secondary"}>
                            {enroll.payment_status ? "Paid" : "Unpaid"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{enroll.email}</p>
                        <p className="text-sm text-gray-500">{enroll.current_role}</p>
                        <p className="text-xs text-gray-400">{formatDate(enroll.created_at)}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" onClick={() => handleTabChange("enrollments")}>
                    View All Enrollments
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Masterclass Registrations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Masterclass</CardTitle>
                  <CardDescription>Latest masterclass registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {allLeads.recent_leads.masterclass_registrations.map((reg) => (
                      <li key={reg.id} className="border-b pb-2">
                        <div className="flex justify-between">
                          <p className="font-medium">{reg.name}</p>
                          <Badge variant={reg.attended ? "success" : "secondary"}>
                            {reg.attended ? "Attended" : "Not Attended"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{reg.email || "No email"}</p>
                        <p className="text-sm text-gray-500">
                          {reg.country_code} {reg.phone}
                        </p>
                        <p className="text-xs text-gray-400">{formatDate(reg.created_at)}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" onClick={() => handleTabChange("masterclass")}>
                    View All Masterclass Registrations
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Registrations Tab */}
        <TabsContent value="registrations">
          <Card>
            <CardHeader>
              <CardTitle>Course Registrations</CardTitle>
              <CardDescription>All users who registered interest in the course</CardDescription>
            </CardHeader>
            <CardContent>
              {loading.registrations ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : registrations ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.items.map((reg) => (
                        <TableRow key={reg.id}>
                          <TableCell className="font-medium">{reg.name}</TableCell>
                          <TableCell>{reg.email || "N/A"}</TableCell>
                          <TableCell>
                            {reg.country_code} {reg.phone}
                          </TableCell>
                          <TableCell>{reg.heard_from || "N/A"}</TableCell>
                          <TableCell>{formatDate(reg.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {registrations.total_pages > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handleRegistrationsPageChange(Math.max(1, registrationsPage - 1))}
                            className={registrationsPage <= 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {Array.from({ length: Math.min(5, registrations.total_pages) }, (_, i) => {
                          const pageNumber = i + 1
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                onClick={() => handleRegistrationsPageChange(pageNumber)}
                                isActive={pageNumber === registrationsPage}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        })}

                        {registrations.total_pages > 5 && (
                          <>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                onClick={() => handleRegistrationsPageChange(registrations.total_pages)}
                                isActive={registrations.total_pages === registrationsPage}
                              >
                                {registrations.total_pages}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              handleRegistrationsPageChange(Math.min(registrations.total_pages, registrationsPage + 1))
                            }
                            className={
                              registrationsPage >= registrations.total_pages ? "pointer-events-none opacity-50" : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="text-center p-8">No registrations found</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enrollments Tab */}
        <TabsContent value="enrollments">
          <Card>
            <CardHeader>
              <CardTitle>Course Enrollments</CardTitle>
              <CardDescription>All users who enrolled in the course</CardDescription>
            </CardHeader>
            <CardContent>
              {loading.enrollments ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : enrollments ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollments.items.map((enroll) => (
                        <TableRow key={enroll.id}>
                          <TableCell className="font-medium">{enroll.name}</TableCell>
                          <TableCell>{enroll.email}</TableCell>
                          <TableCell>{enroll.current_role}</TableCell>
                          <TableCell>{enroll.preferred_batch}</TableCell>
                          <TableCell>
                            <Badge variant={enroll.payment_status ? "success" : "secondary"}>
                              {enroll.payment_status ? "Paid" : "Unpaid"}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(enroll.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {enrollments.total_pages > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handleEnrollmentsPageChange(Math.max(1, enrollmentsPage - 1))}
                            className={enrollmentsPage <= 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {Array.from({ length: Math.min(5, enrollments.total_pages) }, (_, i) => {
                          const pageNumber = i + 1
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                onClick={() => handleEnrollmentsPageChange(pageNumber)}
                                isActive={pageNumber === enrollmentsPage}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        })}

                        {enrollments.total_pages > 5 && (
                          <>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                onClick={() => handleEnrollmentsPageChange(enrollments.total_pages)}
                                isActive={enrollments.total_pages === enrollmentsPage}
                              >
                                {enrollments.total_pages}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              handleEnrollmentsPageChange(Math.min(enrollments.total_pages, enrollmentsPage + 1))
                            }
                            className={
                              enrollmentsPage >= enrollments.total_pages ? "pointer-events-none opacity-50" : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="text-center p-8">No enrollments found</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Masterclass Tab */}
        <TabsContent value="masterclass">
          <Card>
            <CardHeader>
              <CardTitle>Masterclass Registrations</CardTitle>
              <CardDescription>All users who registered for the masterclass</CardDescription>
            </CardHeader>
            <CardContent>
              {loading.masterclass ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : masterclassRegistrations ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Attended</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {masterclassRegistrations.items.map((reg) => (
                        <TableRow key={reg.id}>
                          <TableCell className="font-medium">{reg.name}</TableCell>
                          <TableCell>{reg.email || "N/A"}</TableCell>
                          <TableCell>
                            {reg.country_code} {reg.phone}
                          </TableCell>
                          <TableCell>
                            <Badge variant={reg.attended ? "success" : "secondary"}>
                              {reg.attended ? "Yes" : "No"}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(reg.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {masterclassRegistrations.total_pages > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handleMasterclassPageChange(Math.max(1, masterclassPage - 1))}
                            className={masterclassPage <= 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {Array.from({ length: Math.min(5, masterclassRegistrations.total_pages) }, (_, i) => {
                          const pageNumber = i + 1
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                onClick={() => handleMasterclassPageChange(pageNumber)}
                                isActive={pageNumber === masterclassPage}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        })}

                        {masterclassRegistrations.total_pages > 5 && (
                          <>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                onClick={() => handleMasterclassPageChange(masterclassRegistrations.total_pages)}
                                isActive={masterclassRegistrations.total_pages === masterclassPage}
                              >
                                {masterclassRegistrations.total_pages}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              handleMasterclassPageChange(
                                Math.min(masterclassRegistrations.total_pages, masterclassPage + 1),
                              )
                            }
                            className={
                              masterclassPage >= masterclassRegistrations.total_pages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="text-center p-8">No masterclass registrations found</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
