"use client";

import { DarkThemeToggle, Button } from "flowbite-react";
import Image from "next/image";
import {
  HiMenu,
  HiHome,
  HiInformationCircle,
  HiCog,
  HiCurrencyDollar,
  HiPhone,
} from "react-icons/hi";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Fixed Logo on the left */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <Image
          src="/logo.jpeg"
          alt="Bookmate logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="text-xl font-semibold text-gray-900 dark:text-white">
          Bookmate
        </span>
      </div>

      {/* Theme toggle and menu button on the right */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <DarkThemeToggle />
        <Button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <HiMenu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar on the right */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-white shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-start border-b border-gray-200 p-4 dark:border-gray-700">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              Menu
            </span>
          </div>

          <ul className="space-y-2 p-4">
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg bg-gray-100 p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700"
              >
                <HiHome className="h-6 w-6" />
                <span className="ml-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <HiInformationCircle className="h-6 w-6" />
                <span className="ml-3">About</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <HiCog className="h-6 w-6" />
                <span className="ml-3">Services</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <HiCurrencyDollar className="h-6 w-6" />
                <span className="ml-3">Pricing</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <HiPhone className="h-6 w-6" />
                <span className="ml-3">Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-30 backdrop-blur-3xl"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
