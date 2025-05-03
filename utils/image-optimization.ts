// Image optimization utility functions

/**
 * Returns appropriate image size based on device width
 * @param defaultSize Default image size for desktop
 * @returns Optimized image size
 */
export function getResponsiveImageSize(defaultSize: number): number {
  if (typeof window === "undefined") return defaultSize

  const width = window.innerWidth

  if (width < 640) return Math.floor(defaultSize * 0.5) // Mobile
  if (width < 1024) return Math.floor(defaultSize * 0.75) // Tablet
  return defaultSize // Desktop
}

/**
 * Generates srcSet for responsive images
 * @param src Base image source
 * @returns srcSet string
 */
export function generateSrcSet(src: string): string {
  if (!src) return ""

  // Skip for external URLs or data URLs
  if (src.startsWith("http") || src.startsWith("data:")) return ""

  // Generate srcSet for different sizes
  return `${src} 1x, ${src} 2x`
}

/**
 * Checks if an element is in viewport
 * @param el Element to check
 * @returns Boolean indicating if element is in viewport
 */
export function isInViewport(el: HTMLElement): boolean {
  if (!el) return false

  const rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
