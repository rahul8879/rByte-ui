"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, Clock, Filter, X, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/components/logo"
import masterclassData from "@/data/masterclasses.json"
import { ConsistentButton } from "@/components/ui/consistent-button"
import EnrollmentDrawer from "@/components/enrollment-drawer"

interface Masterclass {
  id: string
  title: string
  shortDescription: string
  date: string
  time: string
  duration: string
  instructor: {
    name: string
    title: string
    image: string
  }
  image: string
  category: string
  tags: string[]
  isFeatured: boolean
}

export default function MasterclassesPage() {
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>([])
  const [filteredMasterclasses, setFilteredMasterclasses] = useState<Masterclass[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Enrollment drawer state
  const [isEnrollmentDrawerOpen, setIsEnrollmentDrawerOpen] = useState(false)
  const [isRegistrationDrawerOpen, setIsRegistrationDrawerOpen] = useState(false)

  useEffect(() => {
    // Load masterclasses from the JSON file
    const loadedMasterclasses = masterclassData.masterclasses
    setMasterclasses(loadedMasterclasses)
    setFilteredMasterclasses(loadedMasterclasses)

    // Extract unique categories
    const uniqueCategories = Array.from(new Set(loadedMasterclasses.map((mc) => mc.category)))
    setCategories(uniqueCategories)

    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Filter masterclasses based on search query and selected category
    let filtered = masterclasses

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (mc) =>
          mc.title.toLowerCase().includes(query) ||
          mc.shortDescription.toLowerCase().includes(query) ||
          mc.instructor.name.toLowerCase().includes(query) ||
          mc.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((mc) => mc.category === selectedCategory)
    }

    setFilteredMasterclasses(filtered)
  }, [searchQuery, selectedCategory, masterclasses])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
  }

  // Enrollment drawer functions
  const openEnrollmentDrawer = () => {
    setIsEnrollmentDrawerOpen(true)
  }

  const closeEnrollmentDrawer = () => {
    setIsEnrollmentDrawerOpen(false)
  }

  const openRegistrationDrawer = () => {
    setIsRegistrationDrawerOpen(true)
  }

  const closeRegistrationDrawer = () => {
    setIsRegistrationDrawerOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Logo size="sm" />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link
                href="/"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
              >
                Home
              </Link>
              <Link
                href="/masterclasses"
                className="hidden text-sm font-medium text-purple-600 transition-colors hover:text-purple-800 sm:block"
              >
                Masterclasses
              </Link>
              <Link
                href="/#curriculum"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
              >
                Curriculum
              </Link>
              <Link
                href="/#pricing"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
              >
                Pricing
              </Link>
              <ConsistentButton size="sm" variant="gradient" onClick={openEnrollmentDrawer}>
                Enroll Now
              </ConsistentButton>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Free AI Engineering Masterclasses</h1>
                <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Learn directly from industry experts in our live, interactive masterclasses on AI engineering topics
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <ConsistentButton
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-gray-100"
                  onClick={openRegistrationDrawer}
                >
                  Register for Updates
                </ConsistentButton>
                <ConsistentButton
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/20"
                  onClick={() => (window.location.href = "/#curriculum")}
                >
                  Explore Full Course
                </ConsistentButton>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="w-full py-6 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search masterclasses..."
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium flex items-center">
                  <Filter className="mr-1 h-4 w-4" /> Filter by:
                </span>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedCategory === category
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "hover:bg-purple-100 hover:text-purple-800"
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Badge>
                ))}
                {(searchQuery || selectedCategory) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs flex items-center"
                    onClick={clearFilters}
                  >
                    <X className="mr-1 h-3 w-3" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Masterclasses Grid */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              </div>
            ) : filteredMasterclasses.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMasterclasses.map((masterclass) => (
                  <Link
                    key={masterclass.id}
                    href={`/masterclass/${masterclass.id}`}
                    className="group relative overflow-hidden rounded-lg border bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={masterclass.image || "/placeholder.svg"}
                        alt={masterclass.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      {masterclass.isFeatured && (
                        <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {masterclass.category}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {masterclass.duration}
                        </Badge>
                      </div>
                      <h3 className="mb-2 text-xl font-bold leading-tight text-gray-900 group-hover:text-purple-600">
                        {masterclass.title}
                      </h3>
                      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{masterclass.shortDescription}</p>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-700">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-purple-500" />
                          {masterclass.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-purple-500" />
                          {masterclass.time}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                            <Image
                              src={masterclass.instructor.image || "/placeholder.svg"}
                              alt={masterclass.instructor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs font-medium">{masterclass.instructor.name}</span>
                        </div>
                        <span className="text-xs font-medium text-purple-600 flex items-center group-hover:text-purple-800">
                          View Details <ChevronRight className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold mb-2">No masterclasses found</h3>
                <p className="text-gray-600 mb-4">We couldn't find any masterclasses matching your search criteria.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Want to go beyond masterclasses?</h2>
                <p className="text-gray-600 mb-6">
                  Join our comprehensive AI Engineering course and transform your career with in-demand skills. Our
                  6-month program is designed for working professionals.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <ConsistentButton size="lg" variant="gradient" onClick={openEnrollmentDrawer}>
                    Enroll in Full Course
                  </ConsistentButton>
                  <ConsistentButton size="lg" variant="outline" onClick={() => (window.location.href = "/#curriculum")}>
                    Learn More
                  </ConsistentButton>
                </div>
              </div>
              <div className="md:w-1/2 bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-bold mb-4">Why Join Our Masterclasses?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-purple-100 p-1 rounded-full mr-2 mt-0.5">
                      <svg
                        className="h-4 w-4 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Learn directly from industry experts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 p-1 rounded-full mr-2 mt-0.5">
                      <svg
                        className="h-4 w-4 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Interactive Q&A sessions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 p-1 rounded-full mr-2 mt-0.5">
                      <svg
                        className="h-4 w-4 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Access to downloadable resources</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 p-1 rounded-full mr-2 mt-0.5">
                      <svg
                        className="h-4 w-4 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Certificate of participation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900 text-gray-300">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo variant="light" />
              <p className="mt-2 text-sm">Empowering the next generation of AI engineers</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
              <Link href="/" className="text-sm hover:text-white">
                Home
              </Link>
              <Link href="/masterclasses" className="text-sm hover:text-white">
                Masterclasses
              </Link>
              <Link href="/#curriculum" className="text-sm hover:text-white">
                Curriculum
              </Link>
              <Link href="/#pricing" className="text-sm hover:text-white">
                Pricing
              </Link>
              <Link href="#" className="text-sm hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-800 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} RByte.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Enrollment Drawer */}
      <EnrollmentDrawer isOpen={isEnrollmentDrawerOpen} onClose={closeEnrollmentDrawer} mode="enroll" />

      {/* Registration Drawer */}
      <EnrollmentDrawer isOpen={isRegistrationDrawerOpen} onClose={closeRegistrationDrawer} mode="register" />
    </div>
  )
}
