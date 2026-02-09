"use client"

import PricingCard from "./pricing-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, BookOpen, Calendar, Target, Check, X, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PricingSectionProps {
  onEnroll?: () => void
}

export default function PricingSection({ onEnroll }: PricingSectionProps) {
  const dataScienceFeatures = [
    "Python, SQL, and data wrangling foundations",
    "Statistics, probability, and experiment design",
    "Supervised & unsupervised ML workflows",
    "Feature engineering and model evaluation",
    "Deep learning with TensorFlow/PyTorch",
    "End-to-end data science capstone project",
    "Industry datasets and case studies",
    "Career guidance for ML roles",
  ]

  const genAiAgenticFeatures = [
    "Prompting, retrieval, and RAG design",
    "Agentic workflows with tool calling",
    "Multi-agent systems and orchestration",
    "LLM fine-tuning and evaluation loops",
    "Safety, guardrails, and reliability",
    "Deployable GenAI apps with APIs",
    "Production-ready demos and portfolios",
    "Mentor reviews and hiring prep",
  ]

  const fullStackAiFeatures = [
    "From basics to advanced AI engineering",
    "Data science + GenAI + Agentic AI",
    "End-to-end AI product development",
    "LLMOps & MLOps for production delivery",
    "Real business projects and capstone",
    "Interview prep and placement support",
    "Live weekend cohorts with mentors",
    "Career transition roadmap",
  ]

  const mlopsFeatures = [
    "Data/feature pipelines and orchestration",
    "Model registry, versioning, and CI/CD",
    "Model serving, APIs, and scaling",
    "Monitoring, drift detection, and alerts",
    "LLMOps stack for GenAI reliability",
    "Cloud deployment and infra basics",
    "Production incident playbooks",
    "Portfolio with deployable systems",
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">2026 AI Learning Tracks</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Pick a focused track or go end-to-end. Each pathway is designed for job-ready outcomes in Data Science,
          GenAI + Agentic AI, Full Stack AI, or MLOps.
        </p>
      </div>

      <div className="mb-12">
        <Card className="border-purple-100">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <Lightbulb className="h-12 w-12 text-purple-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Personalized Track Selection</h3>
                <p className="text-muted-foreground">
                  We assess your current level and align you to the right pathway. Whether you're starting from zero
                  or upskilling into agentic AI, the curriculum adapts to your pace and goals.
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
          <TabsTrigger value="all">All Tracks</TabsTrigger>
          <TabsTrigger value="compare">Track Comparison</TabsTrigger>
          <TabsTrigger value="competitors">Rbyte Advantage</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-3 py-1 text-xs font-medium">
                  Best For Foundations
                </Badge>
              </div>
              <PricingCard
                title="Data Science (ML + DL)"
                price="Custom"
                description="Master the data science stack with modern ML/DL projects and industry-grade workflows."
                features={dataScienceFeatures}
                buttonText="Get Pricing"
                duration="12-16 Weeks"
                audience="Students & Analysts"
                onClick={onEnroll}
              />
            </div>
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1 text-xs font-medium">
                  Most Popular
                </Badge>
              </div>
              <PricingCard
                title="GenAI + Agentic AI"
                price="Custom"
                description="Build real agentic systems, RAG copilots, and GenAI applications that run in production."
                features={genAiAgenticFeatures}
                buttonText="Get Pricing"
                popular={true}
                duration="10-14 Weeks"
                audience="Developers & Product Teams"
                onClick={onEnroll}
              />
            </div>
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1 text-xs font-medium">
                  End-to-End Track
                </Badge>
              </div>
              <PricingCard
                title="Full Stack AI (Basics to Advanced)"
                price="Custom"
                description="From fundamentals to production-grade AI and agentic systems with career support."
                features={fullStackAiFeatures}
                buttonText="Get Pricing"
                duration="24-28 Weeks"
                audience="Career Switchers"
                onClick={onEnroll}
              />
            </div>
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-sky-100 text-sky-800 border-sky-200 px-3 py-1 text-xs font-medium">
                  Production Focus
                </Badge>
              </div>
              <PricingCard
                title="MLOps + LLMOps"
                price="Custom"
                description="Own the production layer: pipelines, deployment, monitoring, and reliability."
                features={mlopsFeatures}
                buttonText="Get Pricing"
                duration="8-12 Weeks"
                audience="ML Engineers & DevOps"
                onClick={onEnroll}
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
                  <th className="text-center p-4 bg-muted/50">Data Science</th>
                  <th className="text-center p-4 bg-muted/50">GenAI + Agentic</th>
                  <th className="text-center p-4 bg-muted/50">Full Stack AI</th>
                  <th className="text-center p-4 bg-muted/50">MLOps</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Pricing</td>
                  <td className="p-4 text-center">Custom</td>
                  <td className="p-4 text-center">Custom</td>
                  <td className="p-4 text-center">Custom</td>
                  <td className="p-4 text-center">Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Duration</td>
                  <td className="p-4 text-center">12-16 Weeks</td>
                  <td className="p-4 text-center">10-14 Weeks</td>
                  <td className="p-4 text-center">24-28 Weeks</td>
                  <td className="p-4 text-center">8-12 Weeks</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Class Format</td>
                  <td className="p-4 text-center">Live + async</td>
                  <td className="p-4 text-center">Live + labs</td>
                  <td className="p-4 text-center">Live weekend cohorts</td>
                  <td className="p-4 text-center">Live + infra labs</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Projects</td>
                  <td className="p-4 text-center">6-8</td>
                  <td className="p-4 text-center">4-6</td>
                  <td className="p-4 text-center">10+</td>
                  <td className="p-4 text-center">4-6</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Personalized Curriculum</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅ Agent roadmaps</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Placement Support</td>
                  <td className="p-4 text-center">Career guidance</td>
                  <td className="p-4 text-center">Portfolio review</td>
                  <td className="p-4 text-center">Full support</td>
                  <td className="p-4 text-center">Role-specific prep</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Recorded Sessions</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Industry Networking</td>
                  <td className="p-4 text-center">Virtual</td>
                  <td className="p-4 text-center">Virtual + demo day</td>
                  <td className="p-4 text-center">Hiring demo day</td>
                  <td className="p-4 text-center">Infra & platform labs</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Learning Pace</td>
                  <td className="p-4 text-center">Flexible</td>
                  <td className="p-4 text-center">Accelerated</td>
                  <td className="p-4 text-center">Structured</td>
                  <td className="p-4 text-center">Accelerated</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Target Audience</td>
                  <td className="p-4 text-center">Students & Analysts</td>
                  <td className="p-4 text-center">Developers & Product Teams</td>
                  <td className="p-4 text-center">Career Switchers</td>
                  <td className="p-4 text-center">ML Engineers & DevOps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="competitors">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Why Rbyte.ai Wins in 2026</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Depth, portfolio outcomes, and production readiness—without the fluff.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4">Feature</th>
                  <th className="text-center p-4">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-purple-600">Rbyte.ai Tracks</span>
                      <Badge className="mt-1 bg-amber-100 text-amber-800 border-amber-200">Best Value</Badge>
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
                      <span className="font-bold text-green-600">Custom for each track</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>High & opaque pricing</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Duration</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Optimized by track</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>One-size-fits-all</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Format</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Live + project labs</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Mostly recorded</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Projects</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Production-grade portfolios</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <X className="h-5 w-5 text-red-500" />
                      <span>Template projects</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Doubt Support</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>1-on-1 mentor reviews</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <X className="h-5 w-5 text-red-500" />
                      <span>Group-only sessions</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Interview Prep</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Role-aligned coaching</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <X className="h-5 w-5 text-red-500" />
                      <span>Generic prep</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Placement Help</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Track-specific support</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Often conditional</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Access to Mentors</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Direct access to mentors</span>
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
