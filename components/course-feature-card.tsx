import type { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface CourseFeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function CourseFeatureCard({ icon, title, description }: CourseFeatureCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
