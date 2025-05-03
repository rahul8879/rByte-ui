"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface ProjectShowcaseCardProps {
  title: string
  description: string
  imageUrl: string
  tags: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  demoUrl?: string
}

export default function ProjectShowcaseCard({
  title,
  description,
  imageUrl,
  tags,
  difficulty,
  demoUrl,
}: ProjectShowcaseCardProps) {
  const difficultyColor = {
    Beginner: "bg-green-100 text-green-800 border-green-200",
    Intermediate: "bg-amber-100 text-amber-800 border-amber-200",
    Advanced: "bg-purple-100 text-purple-800 border-purple-200",
  }[difficulty]

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
        <img
          src={imageUrl || "/placeholder.svg?height=300&width=500&query=" + encodeURIComponent(title)}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=300&width=500&query=" + encodeURIComponent(title)
          }}
        />
        <div className="absolute top-0 right-0 p-2">
          <img src="/abstract-ai-icon.png" alt="AI icon" className="w-10 h-10 rounded-full bg-white/80 p-1 shadow-md" />
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{title}</h3>
          <Badge className={difficultyColor}>{difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-slate-50">
              {tag}
            </Badge>
          ))}
        </div>
        {demoUrl && (
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.open(demoUrl, "_blank")}>
            View Example
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
