"use client";

import { DarkThemeToggle, Button } from "flowbite-react";
import Image from "next/image";
import {
  HiMenu,
  HiHome,
  HiInformationCircle,
  HiCog,
  HiCurrencyDollar,
} from "react-icons/hi";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
        <span className={`text-xl font-semibold text-gray-900 dark:text-white ${isOpen ? "hidden md:block" : "block"}`}>
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
        className={`fixed inset-y-0 right-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="h-full bg-white shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-start border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="flex justify-center items-center gap-2 space-x-3">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={getUserDisplayName()}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-linear-to-b from-primary-500 to-primary-700 outline-2 outline-amber-50 text-white rounded-full flex items-center justify-center font-extrabold text-sm">
                  {getUserInitials()}
                </div>
              )}
              <div className="text-gray-900 dark:text-white text-sm font-bold flex flex-col items-start min-w-40">
                {getUserDisplayName()}
              </div>
            </div>
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
                href="/create-account"
                className="flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <HiInformationCircle className="h-6 w-6" />
                <span className="ml-3">Profile</span>
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
              <button
                onClick={handleLogout}
                className="flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <LogOut className="h-6 w-6" />
                <span className="ml-3">Logout</span>
              </button>
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
