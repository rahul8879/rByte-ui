interface FeatureBadgeProps {
  text: string
}

export default function FeatureBadge({ text }: FeatureBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 border border-purple-200">
      {text}
    </span>
  )
}
