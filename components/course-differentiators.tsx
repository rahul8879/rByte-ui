import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, BookOpen, Briefcase, Code, Award, Zap, Target, Layers, Lightbulb } from "lucide-react"

export default function CourseDifferentiators() {
  const differentiators = [
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Designed for Working Professionals",
      description:
        "Weekend classes with flexible schedules that fit around your work commitments, with recordings available for missed sessions.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-indigo-500" />,
      title: "Comprehensive 6-Month Curriculum",
      description:
        "In-depth learning journey from Python fundamentals to advanced GenAI engineering, with adequate time to absorb and practice concepts.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-pink-500" />,
      title: "Industry-Relevant Curriculum",
      description:
        "Constantly updated content based on real industry requirements, focusing on skills that are in high demand right now.",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-amber-500" />,
      title: "Career Transition Focus",
      description:
        "Specialized guidance for professionals transitioning from other fields or traditional data science roles into GenAI.",
    },
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: "Hands-on Project Portfolio",
      description:
        "Build 8+ production-grade projects that showcase your skills to potential employers, not just theoretical knowledge.",
    },
    {
      icon: <Award className="h-8 w-8 text-green-500" />,
      title: "Placement Guarantee",
      description:
        "We support you until you successfully transition to an AI role, with direct connections to hiring partners.",
    },
    {
      icon: <Zap className="h-8 w-8 text-red-500" />,
      title: "Live Interactive Sessions",
      description:
        "Real-time interaction with instructors, not pre-recorded videos, allowing for questions, discussions, and personalized guidance.",
    },
    {
      icon: <Target className="h-8 w-8 text-teal-500" />,
      title: "Specialized in GenAI & NLP",
      description:
        "Focus on the fastest-growing and highest-paying segment of AI, with specialized modules on LLMs, RAG, and agentic systems.",
    },
    {
      icon: <Layers className="h-8 w-8 text-cyan-500" />,
      title: "Full-Stack AI Engineering",
      description:
        "Learn both the AI models AND the software engineering practices needed to deploy them in production environments.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: "Industry Expert Instructors",
      description:
        "Learn from practitioners who are actively building GenAI systems at leading companies, not just academic instructors.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {differentiators.map((item, index) => (
        <Card key={index} className="border-purple-100 hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
