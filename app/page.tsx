"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Button } from "flowbite-react";
import { useState } from "react"
import { HiOutlineArrowRight } from "react-icons/hi";
import { DarkThemeToggle } from "flowbite-react";
import { Header } from "@/components/ui/navbar";
import { TypingAnimation } from "@/components/typing-animation";
import { BackgroundPattern } from "@/components/background-pattern";

export default function Home() {

  return (
    <main className="flex max-h-screen flex-col items-center justify-center py-24">
      <BackgroundPattern />
      <div className="absolute top-4 right-4">
        <DarkThemeToggle className="cursor-pointer"/>
      </div>

      <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-12">
        <div className="relative flex flex-col items-center gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="relative text-center text-4xl leading-[125%] font-bold text-gray-900 dark:text-gray-200"
          >
            Welcome to <span className="font-bold" >Bookmate </span>
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.51 }}
            className="inline-flex flex-wrap items-center justify-center gap-2.5 text-center"
          >
            <span className="inline text-lg text-gray-600 dark:text-gray-400">
              Your one-shop for all academic  
            </span>
            <span className="relative inline-flex items-center gap-2 text-lg text-gray-600 dark:text-gray-400">              
              <span className="relative w-fit  font-semibold whitespace-nowrap text-[#111928] dark:text-white">
                books
              </span>
              and resources
            </span>
          </motion.span>
        </div>
        <div className="flex gap-4">
          <Button size="lg" color="dark">
            Get Started
          </Button>
          <Button size="lg" color="alternative">
            Login
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mx-auto"
        >
          <TypingAnimation
            messages={[
              "order your books in minutes!",
              "Browse by department, semester or course.",
              "Fast delivery and secure payment!",
              "academic books, study materials and resources",
            ]}
            className="text-lg font-semibold text-[#111928] dark:text-white"
            typingSpeed={40}
            delayBetweenMessages={2000}
          />
        </motion.div>

      </div>
    </main>
  );
}
