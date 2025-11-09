"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DarkThemeToggle } from "flowbite-react";
import { HiArrowCircleLeft } from "react-icons/hi";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log("Creating account with:", { email: formData.email }); // Debug log
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      // On success, redirect to dashboard
      router.push("/create-account");
    } catch (err) {
      console.error("Signup error:", err); // Debug log
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex max-h-screen flex-col items-center justify-center pt-5 pb-38">
      <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <HiArrowCircleLeft className="cursor-pointer text-xl text-[#111928] dark:text-gray-300" />
          <span className="relative w-fit cursor-pointer text-xs font-semibold whitespace-nowrap text-[#111928] dark:text-white">
            Back
          </span>
        </Link>
        <DarkThemeToggle className="cursor-pointer" />
      </div>

      <div className="flex w-full max-w-md min-w-sm flex-col items-center justify-center px-4 py-8 sm:max-w-sm xl:p-0">
        <h1 className="pb-4 text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create your account
        </h1>

        <div className="s:mx-w-sm w-full rounded-xl bg-white/75 px-4 py-6 shadow backdrop-blur-md dark:border-2 dark:border-gray-700/15 dark:bg-gray-800">
          <div className="space-y-2 p-4 sm:p-8 md:space-y-4">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                {error && (
                  <div className="text-center text-red-500">{error}</div>
                )}
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  required
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                {error && (
                  <div
                    className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-800/30 dark:text-red-400"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="group bg-primary-600 hover:bg-primary-500 relative flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Sign up"}
                </button>
              </div>
            </form>

            <div className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
