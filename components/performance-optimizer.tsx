"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface PerformanceOptimizerProps {
  children: React.ReactNode
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true)

    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll("img[data-src]")

      images.forEach((img) => {
        const imgElement = img as HTMLImageElement
        if (imgElement.dataset.src) {
          // Create an observer for lazy loading
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                imgElement.src = imgElement.dataset.src || ""
                observer.unobserve(imgElement)
              }
            })
          })

          observer.observe(imgElement)
        }
      })
    }

    // Defer non-critical CSS
    const deferNonCriticalCSS = () => {
      const nonCriticalStyles = document.querySelectorAll('link[data-critical="false"]')

      nonCriticalStyles.forEach((link) => {
        const linkElement = link as HTMLLinkElement
        linkElement.media = "all"
        linkElement.addEventListener("load", () => {
          linkElement.media = "all"
        })
      })
    }

    // Optimize animations
    const optimizeAnimations = () => {
      const animatedElements = document.querySelectorAll("[data-animate]")

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
            observer.unobserve(entry.target)
          }
        })
      })

      animatedElements.forEach((el) => {
        observer.observe(el)
      })
    }

    // Run optimizations
    optimizeImages()
    deferNonCriticalCSS()
    optimizeAnimations()

    // Add event listener for resize to handle responsive adjustments
    const handleResize = () => {
      // Recalculate any size-dependent optimizations
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <>{children}</>
}
