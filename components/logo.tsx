import type { FC } from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "light" | "dark"
}

const Logo: FC<LogoProps> = ({ className, size = "md", variant = "dark" }) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Logo container with gradient background */}
        <div className={cn("flex items-center", variant === "light" ? "text-white" : "text-slate-900")}>
          {/* Binary code pattern */}
          <div className="relative mr-2">
            <div
              className={cn(
                "flex flex-col items-center justify-center rounded-md overflow-hidden",
                size === "sm" ? "h-6 w-6" : size === "md" ? "h-8 w-8" : "h-10 w-10",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0",
                  variant === "light"
                    ? "bg-gradient-to-br from-purple-400 to-pink-400"
                    : "bg-gradient-to-br from-purple-600 to-pink-600",
                )}
              ></div>
              <div
                className="relative z-10 text-white font-mono text-opacity-70 leading-none"
                style={{ fontSize: size === "sm" ? "4px" : size === "md" ? "5px" : "6px" }}
              >
                <div>01101</div>
                <div>10011</div>
                <div>01010</div>
                <div>11001</div>
              </div>
            </div>
          </div>

          {/* ByteX text */}
          <span
            className={cn(
              "font-bold tracking-tight",
              size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl",
              variant === "light" ? "text-white" : "text-slate-900",
            )}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">RByte</span>
            <span className={cn(variant === "light" ? "text-white" : "text-slate-900", "font-extrabold")}>.</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">ai</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Logo
