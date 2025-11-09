"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DarkThemeToggle } from "flowbite-react";
import { HiArrowCircleLeft } from "react-icons/hi";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { faculties } from "@/lib/data/faculties";
import { Departments } from "@/lib/data/departments";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toggleDepartments } from "@/lib/utilis";

export interface UserProfile {
  name: string;
  email: string;
  userName: string;
  registrationNumber: string;
  department: string;
  faculty: string;
  level: string;
}

interface DepartmentOption {
  name: string;
  faculty: string;
}

let departments: DepartmentOption[] = [];

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: auth.currentUser?.email || "",
    userName: "",
    registrationNumber: "",
    department: "",
    faculty: "",
    level: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "faculty") {
      const deptNames = toggleDepartments(value);
      departments = deptNames.map((name) => ({ name, faculty: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await addDoc(collection(db, "users"), formData);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to complete profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center pb-38">
      <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
        <Link href="/signup" className="flex items-center gap-2">
          <HiArrowCircleLeft className="cursor-pointer text-xl text-[#111928] dark:text-gray-300" />
          <span className="relative w-fit cursor-pointer text-xs font-semibold whitespace-nowrap text-[#111928] dark:text-white">
            Back
          </span>
        </Link>
        <DarkThemeToggle className="cursor-pointer" />
      </div>

      <div className="flex w-full max-w-md min-w-sm flex-col items-center justify-center px-4 py-8 sm:max-w-sm xl:p-0">
        <h1 className="pb-4 text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Complete Your Profile
        </h1>

        <div className="s:mx-w-sm w-full rounded-xl bg-white/75 px-4 py-6 shadow backdrop-blur-md dark:border-2 dark:border-gray-700/15 dark:bg-gray-800">
          <div className="space-y-2 p-4 sm:p-8 md:space-y-4">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  readOnly={!!auth.currentUser?.email}
                />
              </div>
              <div>
                <label
                  htmlFor="userName"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Username"
                  required
                  value={formData.userName}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="registrationNumber"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  id="registrationNumber"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="202•••••0342"
                  required
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="faculty"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Faculty
                </label>
                <Select
                  name="faculty"
                  required
                  value={formData.faculty}
                  onValueChange={(val) => handleInputChange("faculty", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700">
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty} value={faculty}>
                        {faculty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="department"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <Select
                  name="department"
                  required
                  value={formData.department}
                  onValueChange={(val) => handleInputChange("department", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700">
                    {departments.map((dept) => (
                      <SelectItem key={dept.name} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="level"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Level
                </label>
                <select
                  name="level"
                  id="level"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  value={formData.level}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                >
                  <option value="">Select Level</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                </select>
              </div>
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
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Completing..." : "Complete Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
