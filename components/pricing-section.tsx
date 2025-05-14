"use client"

import { useState } from "react"
import PricingCard from "./pricing-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, BookOpen, Calendar, Target, Check, X, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function PricingSection() {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)

  const onlineFeatures = [
    "Live online weekend classes",
    "24/7 doubt resolution",
    "Lifetime access to course materials",
    "8+ hands-on projects",
    "Personalized learning path",
    "Career transition support",
    "Placement assistance",
    "Industry expert mentorship",
    "Flexible learning schedule",
    "Recorded sessions for revision",
  ]

  const offlineFeatures = [
    "In-person weekend classes",
    "Direct interaction with instructors",
    "Hands-on lab sessions",
    "Collaborative learning environment",
    "Networking opportunities",
    "10+ hands-on projects",
    "Enhanced placement support",
    "Personalized career coaching",
    "Industry visits and workshops",
    "Exclusive hackathons and events",
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Pricing Options</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose the learning format that works best for you. Both options include our customized curriculum tailored to
          your current knowledge level and learning pace.
        </p>
      </div>

      <div className="mb-12">
        <Card className="border-purple-100">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <Lightbulb className="h-12 w-12 text-purple-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Personalized Learning Experience</h3>
                <p className="text-muted-foreground">
                  Our program offers a customized curriculum based on your current knowledge and learning curve. We
                  assess your skills and adapt the content to ensure optimal learning progress, whether you're a
                  beginner or have some experience in the field.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Personalized Path</h4>
                      <p className="text-sm text-muted-foreground">Curriculum adapted to your skill level</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Adaptive Learning</h4>
                      <p className="text-sm text-muted-foreground">Content adjusts to your progress</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Flexible Pacing</h4>
                      <p className="text-sm text-muted-foreground">Learn at your optimal speed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Targeted Support</h4>
                      <p className="text-sm text-muted-foreground">Extra help where you need it most</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="all">All Options</TabsTrigger>
          <TabsTrigger value="compare">Online vs Offline</TabsTrigger>
          <TabsTrigger value="competitors">Rbyte vs Others</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-3 py-1 text-xs font-medium">
                  Best Value
                </Badge>
              </div>
              <PricingCard
                title="Online Program"
                price="₹69,999"
                originalPrice="₹1,16,665"
                discountPercentage={40}
                description="Comprehensive online AI engineering program with live weekend classes and flexible learning options."
                features={onlineFeatures}
                buttonText="Enroll Now"
                popular={true}
                duration="6 Months"
                audience="Engineering Students & Working Professionals"
              />
            </div>
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1 text-xs font-medium">
                  Premium Experience
                </Badge>
              </div>
              <PricingCard
                title="Offline Program"
                price="₹89,999"
                description="Immersive in-person learning experience with direct mentorship and enhanced networking opportunities."
                features={offlineFeatures}
                buttonText="Enroll Now"
                duration="9 Months"
                audience="Engineering & UG Students and Professionals"
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="compare">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-muted/50">Feature</th>
                  <th className="text-center p-4 bg-muted/50">Online Program</th>
                  <th className="text-center p-4 bg-muted/50">Offline Program</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Price</td>
                  <td className="p-4 text-center">
                    ₹69,999 <span className="text-sm text-green-600">(40% off)</span>
                  </td>
                  <td className="p-4 text-center">₹89,999</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Duration</td>
                  <td className="p-4 text-center">6 Months</td>
                  <td className="p-4 text-center">9 Months</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Class Format</td>
                  <td className="p-4 text-center">Live Online</td>
                  <td className="p-4 text-center">In-Person</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Projects</td>
                  <td className="p-4 text-center">8+</td>
                  <td className="p-4 text-center">10+</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Personalized Curriculum</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Placement Support</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅ Enhanced</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Recorded Sessions</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Industry Networking</td>
                  <td className="p-4 text-center">Virtual</td>
                  <td className="p-4 text-center">In-Person</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Learning Pace</td>
                  <td className="p-4 text-center">Flexible</td>
                  <td className="p-4 text-center">Structured</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Target Audience</td>
                  <td className="p-4 text-center">Working Professionals & Students</td>
                  <td className="p-4 text-center">Engineering & UG Students and Professionals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="competitors">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold mb-2">How Rbyte Compares to Big Brands</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the right learning path for your career growth with a transparent comparison
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4">Feature</th>
                  <th className="text-center p-4">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-purple-600">Rbyte.ai Online</span>
                      <Badge className="mt-1 bg-amber-100 text-amber-800 border-amber-200">Best Value</Badge>
                    </div>
                  </th>
                  <th className="text-center p-4">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-purple-600">Rbyte.ai Offline</span>
                      <Badge className="mt-1 bg-purple-100 text-purple-800 border-purple-200">Premium Experience</Badge>
                    </div>
                  </th>
                  <th className="text-center p-4">
                    <span className="font-bold text-gray-600">Other Brands (Online/Offline)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Price</td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-green-600">₹69,999</span>
                      <span className="text-xs text-green-600">(40% Off)</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-purple-600">₹89,999</span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>₹1,00,000 – ₹2,50,000</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Duration</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>6 Months</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>9 Months</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>8–12 Months</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Format</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Live Online</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>In-Person</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Mostly Online (Few In-Person)</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Projects</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>8+ Real Projects</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>10+ Real Projects</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <X className="h-5 w-5 text-red-500" />
                      <span>3–5 Academic Projects</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Doubt Support</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>1-on-1 Mentoring</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>1-on-1 Mentoring + Labs</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <X className="h-5 w-5 text-red-500" />
                      <span>Group Sessions</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Interview Prep</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Personalized</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>On-Campus & Online</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <X className="h-5 w-5 text-red-500" />
                      <span>Resume Reviews & Mock Calls</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Placement Help</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Yes</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Yes</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Often Conditional</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Access to Mentors</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Direct Access</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Classroom Access</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <X className="h-5 w-5 text-red-500" />
                      <span>Pre-recorded or Assistant-led</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Refund Policy</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Transparent</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Transparent</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <X className="h-5 w-5 text-red-500" />
                      <span>Often Tricky Terms</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <Lightbulb className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-amber-800 mb-2">Why Choose Rbyte.ai?</h4>
                <p className="text-amber-700 mb-4">
                  Our programs are designed to provide maximum value at a fraction of the cost of other bootcamps and
                  courses. We focus on real-world skills, personalized learning, and genuine placement support without
                  hidden conditions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Transparent pricing with no hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Curriculum tailored to your learning pace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Industry-relevant projects, not just theory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Unconditional placement support until you succeed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
