"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const DrawerPortal = ({ children }: { children: React.ReactNode }) => {
  return React.useMemo(() => <div>{children}</div>, [children])
}
DrawerPortal.displayName = "DrawerPortal"

const DrawerOverlay = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      )}
      {...props}
    />
  ),
)
DrawerOverlay.displayName = "DrawerOverlay"

const DrawerTrigger = ({ children }: { children: React.ReactNode }) => {
  return React.useMemo(() => <>{children}</>, [children])
}
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerClose = ({ children }: { children: React.ReactNode }) => {
  return React.useMemo(() => <>{children}</>, [children])
}
DrawerClose.displayName = "DrawerClose"

const DrawerContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed left-0 top-0 z-50 h-screen w-screen bg-white p-6 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-left-full data-[state=open]:slide-in-from-left-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
  ),
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  ),
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-lg font-semibold", className)} {...props} />,
)
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
DrawerDescription.displayName = "DrawerDescription"

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
  className?: string
}

const Drawer = ({ open, onClose, children, side = "left", className }: DrawerProps) => {
  const [isOpen, setIsOpen] = React.useState(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  // Define animation and positioning based on side
  const getContentClassName = () => {
    const baseClasses = "fixed z-50 bg-white shadow-lg transition-all duration-300 ease-in-out"

    switch (side) {
      case "right":
        return cn(
          baseClasses,
          "top-0 right-0 h-full w-full sm:w-80 md:w-96 transform",
          isOpen ? "translate-x-0" : "translate-x-full",
          className,
        )
      case "left":
        return cn(
          baseClasses,
          "top-0 left-0 h-full w-full sm:w-80 md:w-96 transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )
      case "top":
        return cn(
          baseClasses,
          "top-0 left-0 w-full h-auto max-h-screen transform",
          isOpen ? "translate-y-0" : "-translate-y-full",
          className,
        )
      case "bottom":
        return cn(
          baseClasses,
          "bottom-0 left-0 w-full h-auto max-h-screen transform",
          isOpen ? "translate-y-0" : "translate-y-full",
          className,
        )
      default:
        return ""
    }
  }

  if (!open && !isOpen) return null

  return (
    <DrawerPortal>
      <DrawerOverlay className={isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} onClick={handleClose} />
      <div className={getContentClassName()}>{children}</div>
    </DrawerPortal>
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
