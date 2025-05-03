"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false)
  const phoneNumber = "+919152091676" // Updated WhatsApp number
  const message = "Hi! I'm interested in the AI Engineering course. Can you provide more information?"

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-white p-3 rounded-lg shadow-lg mb-2 w-48 text-sm font-medium animate-fade-in">
          Chat with us on WhatsApp
        </div>
      )}
      <button
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}

export default WhatsAppButton
