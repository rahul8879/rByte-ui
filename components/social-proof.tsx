import Image from "next/image"

interface SocialProofProps {
  heading?: string
}

export default function SocialProof({ heading = "Trusted by professionals from" }: SocialProofProps) {
  const logos = [
    "/placeholder-logo.svg",
    "/placeholder-logo.svg",
    "/placeholder-logo.svg",
    "/placeholder-logo.svg",
    "/placeholder-logo.svg",
  ]

  return (
    <div className="w-full border-y bg-white">
      <div className="container px-4 md:px-6 py-6">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">{heading}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center opacity-80">
            {logos.map((src, i) => (
              <div key={i} className="flex items-center justify-center grayscale hover:grayscale-0 transition">
                <Image src={src} alt={`logo-${i}`} width={120} height={36} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

