"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useState } from "react"

interface TypingAnimationProps {
  messages: string[]
  className?: string
  typingSpeed?: number
  delayBetweenMessages?: number
}

export function TypingAnimation({
  messages,
  className = "",
  typingSpeed = 50,
  delayBetweenMessages = 2000,
}: TypingAnimationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const controls = useAnimationControls()

  useEffect(() => {
    const animateText = async () => {
      const currentMessage = messages[currentMessageIndex]
      
      // Reset text and fade in
      setDisplayedText("")
      await controls.start({ opacity: 1 })
      
      // Type out the text
      for (let i = 0; i <= currentMessage.length; i++) {
        setDisplayedText(currentMessage.slice(0, i))
        await new Promise(resolve => setTimeout(resolve, typingSpeed))
      }
      
      // Wait before fading out
      await new Promise(resolve => setTimeout(resolve, delayBetweenMessages))
      
      // Fade out
      await controls.start({ opacity: 0 })
      
      // Move to next message
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }

    animateText()
  }, [currentMessageIndex, messages, typingSpeed, delayBetweenMessages, controls])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={controls}
      className={className}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block ml-[1px] -mr-[1px] w-[2px] h-[1.2em] align-middle bg-current"
      />
    </motion.span>
  )
}