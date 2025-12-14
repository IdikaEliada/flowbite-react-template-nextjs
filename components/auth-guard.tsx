"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

// Public routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup", "/create-account", "/forgot-password"];

// Auth routes that should redirect to dashboard if user is already authenticated
const authRoutes = ["/login", "/signup"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // If user is on an auth page and is authenticated, redirect to dashboard
      if (currentUser && authRoutes.includes(pathname)) {
        router.push("/dashboard");
        return;
      }

      // If user is not authenticated and trying to access a protected route
      if (!currentUser && !publicRoutes.includes(pathname)) {
        router.push("/login");
        return;
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
