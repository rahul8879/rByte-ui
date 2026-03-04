"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, CreditCard, IndianRupee } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import EnrollmentDrawer from "./enrollment-drawer"

interface PricingCardProps {
  title: string
  price: string
  originalPrice?: string
  discountPercentage?: number
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
  duration?: string
  audience?: string
  onClick?: () => void
}

export default function PricingCard({
  title,
  price,
  originalPrice,
  discountPercentage,
  description,
  features,
  buttonText,
  popular = false,
  duration,
  audience,
  onClick,
}: PricingCardProps) {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)

  const handleButtonClick = () => {
    if (onClick) {
      onClick()
    } else {
      setIsEnrollmentOpen(true)
    }
  }

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
        {originalPrice && discountPercentage && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              {discountPercentage}% OFF
            </span>
          </div>
        )}
        {duration && <div className="text-sm font-medium text-purple-600 mt-1">{duration}</div>}
        {audience && <div className="text-sm text-blue-600 mt-1">For {audience}</div>}
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
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
      <CardFooter className="flex flex-col gap-3">
        <Button
          className={cn(
            "w-full",
            popular
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              : "",
          )}
          variant={popular ? "default" : "outline"}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
        <div className="w-full flex flex-col gap-1.5">
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <CreditCard className="h-3.5 w-3.5 text-green-500" />
            <span className="text-green-700 font-medium">No-cost EMI available</span>
            <span className="text-slate-400">· 3, 6, 12-month options</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <IndianRupee className="h-3 w-3" />
            <span>Pricing personalised to your track & background</span>
          </div>
        </div>
      </CardFooter>
      {isEnrollmentOpen && <EnrollmentDrawer isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} />}
    </Card>
  )
}
