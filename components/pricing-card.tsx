import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden transition-all",
        popular ? "border-purple-500 shadow-lg shadow-purple-100 dark:shadow-purple-900/20" : "hover:shadow-md",
      )}
    >
      {popular && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-1 text-center text-sm font-medium text-white">
          Most Popular
        </div>
      )}
      <CardHeader className="pb-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground">/course</span>}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={cn(
            "w-full",
            popular
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              : "",
          )}
          variant={popular ? "default" : "outline"}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
