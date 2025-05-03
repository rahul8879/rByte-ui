import { AlertCircle } from "lucide-react"

interface EnrollmentBannerProps {
  seatsLeft: number
}

export default function EnrollmentBanner({ seatsLeft }: EnrollmentBannerProps) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md flex items-center">
      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
      <div>
        <p className="font-medium text-amber-800">
          Only <span className="font-bold text-red-600">{seatsLeft} seats left</span> for the upcoming batch!
        </p>
        <p className="text-sm text-amber-700">Our previous batches sold out within days. Secure your spot now!</p>
      </div>
    </div>
  )
}
