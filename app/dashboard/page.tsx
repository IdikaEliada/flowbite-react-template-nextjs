"use client"

import Link from 'next/link'
import { AnimatePresence, motion } from "framer-motion"
import { Card, Button } from "flowbite-react";
import { useState } from "react"
import { HiOutlineArrowRight, HiArrowSmLeft, HiChartPie, HiBookOpen, HiUserGroup, HiClock } from "react-icons/hi";
import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import { TypingAnimation } from "@/components/typing-animation";

interface DashboardCard {
  id: number;
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const dashboardCards: DashboardCard[] = [
  {
    id: 1,
    title: "Books Available",
    value: "1,234",
    description: "Total books in our library",
    icon: HiBookOpen,
    color: "text-blue-600 dark:text-blue-500"
  },
  {
    id: 2,
    title: "Active Readers",
    value: "892",
    description: "Currently reading users",
    icon: HiUserGroup,
    color: "text-green-600 dark:text-green-500"
  },
  {
    id: 3,
    title: "Reading Time",
    value: "4.2h",
    description: "Average daily reading time",
    icon: HiClock,
    color: "text-purple-600 dark:text-purple-500"
  },
  {
    id: 4,
    title: "Categories",
    value: "25+",
    description: "Different book categories",
    icon: HiChartPie,
    color: "text-orange-600 dark:text-orange-500"
  }
];
import { BackgroundPattern } from "@/components/background-pattern";

export default function UserDashboard() {
  
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const isAuthenticated = apiService.isAuthenticated()
  //       if (isAuthenticated) {
  //         router.push("/dashboard")
  //       }
  //     } catch (error) {
  //       console.error("Auth check error:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   checkAuth()
  // }, [router])

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center ">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  //     </div>
  //   )
  // }

  return (
    <main className="py-24">
      <BackgroundPattern />
      <div className="absolute top-4 right-4 left-4 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Image
            className=""
            alt="Pattern Light"
            src="/logo.jpeg"
            width={28}
            height={28}
          />
          <span className="relative w-fit text-xl font-semibold whitespace-nowrap text-[#111928] dark:text-white">
            Bookmate
          </span>
        </div>
        <DarkThemeToggle className="cursor-pointer"/>
      </div>
      

      <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-12">
        <div className="relative flex flex-col items-center gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="relative text-center text-5xl leading-[95%] tracking-tight font-semibold text-gray-900 dark:text-gray-200"
          >
            Hey, Enjoy your <span className="hidden dark:inline font-black tracking-wider bg-gradient-to-br from-primary-400 via-primary-500 to-primary-200  text-transparent [background-clip:text] [-webkit-background-clip:text]" >Dashboard </span><span className='dark:hidden font-black tracking-wider bg-gradient-to-br from-primary-500 via-primary-800 to-primary-700 text-transparent [background-clip:text] [-webkit-background-clip:text]'>Dashboard</span>
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.51 }}
            className=" flex-wrap items-center justify-center text-center"
          >
            <span className="inline text-lg text-gray-600 dark:text-gray-400 mt-8">
              Your one-shop for all academic  
            </span>
            <span className="relative inline-flex items-center gap-2 text-lg text-gray-600 dark:text-gray-400">              
              <span className="relative w-fit  font-semibold whitespace-nowrap text-[#111928] dark:text-white">
                &nbsp; books
              </span>
              and resources
            </span>
          </motion.span>
        </div>
        
        <div className="relative flex w-full flex-col items-start gap-6 self-stretch">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence>
              {dashboardCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 dark:border-gray-700">
                    <div className="flex items-center justify-between p-2">
                      <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {card.value}
                        </p>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {card.description}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${card.color}`}>
                        <card.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  );
}
