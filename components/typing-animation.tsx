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
    let isMounted = true;
    
    const animateText = async () => {
      if (!isMounted) return;
      
      const currentMessage = messages[currentMessageIndex];
      
      try {
        // Reset text and fade in
        setDisplayedText("");
        if (!isMounted) return;
        await controls.start({ opacity: 1 });
        
        // Type out the text
        for (let i = 0; i <= currentMessage.length; i++) {
          if (!isMounted) return;
          setDisplayedText(currentMessage.slice(0, i));
          await new Promise(resolve => setTimeout(resolve, typingSpeed));
        }
        
        // Wait before fading out
        if (!isMounted) return;
        await new Promise(resolve => setTimeout(resolve, delayBetweenMessages));
        
        // Fade out
        if (!isMounted) return;
        await controls.start({ opacity: 0 });
        
        // Move to next message
        if (isMounted) {
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }
      } catch (error) {
        console.error("Animation error:", error);
      }
    };

    // Start animation after a short delay to ensure mounting is complete
    const timer = setTimeout(() => {
      if (isMounted) {
        animateText();
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
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