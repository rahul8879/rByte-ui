import TestimonialCard from "@/components/testimonial-card"

export default function TestimonialsSection() {
  const items = [
    {
      quote:
        "The weekend format and hands-on projects helped me switch from a Python role to AI engineering in 3 months.",
      author: "Anita Sharma",
      role: "AI Engineer @ FinTech",
      avatarUrl: "/placeholder-user.jpg",
    },
    {
      quote:
        "Clear roadmap, great mentorship, and real-world GenAI applications. My salary jumped by 90% after placement.",
      author: "Rohit Verma",
      role: "LLM Engineer @ SaaS",
      avatarUrl: "/placeholder-user.jpg",
    },
    {
      quote:
        "I finally understood how to build production-grade RAG and agentic systems. Portfolio made the difference!",
      author: "Priya Nair",
      role: "GenAI Specialist @ HealthTech",
      avatarUrl: "/placeholder-user.jpg",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-600 dark:bg-rose-800/30 dark:text-rose-300">
              Success Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Learners Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Real outcomes from professionals who transitioned into AI roles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          {items.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}

