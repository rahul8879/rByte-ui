import Image from "next/image"

interface SocialProofProps {
  heading?: string
  logos?: { src: string; alt?: string }[]
}

export default function SocialProof({ heading, logos = [] }: SocialProofProps) {
  const hasHeading = Boolean(heading?.trim())
  const hasLogos = logos.length > 0

  if (!hasHeading && !hasLogos) {
    return null
  }

  return (
    <div className="w-full border-y bg-white">
      <div className="container px-4 md:px-6 py-6">
        <div className="flex flex-col items-center gap-4">
          {hasHeading ? (
            <p className="text-xs uppercase tracking-wider text-slate-500">{heading}</p>
          ) : null}
          {hasLogos ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center opacity-80">
              {logos.map(({ src, alt }, i) => (
                <div
                  key={alt ?? `logo-${i}`}
                  className="flex items-center justify-center grayscale hover:grayscale-0 transition"
                >
                  <Image src={src} alt={alt ?? `logo-${i}`} width={120} height={36} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
