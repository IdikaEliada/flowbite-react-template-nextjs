"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DarkThemeToggle } from 'flowbite-react'
import { HiArrowCircleLeft } from 'react-icons/hi'
import Link from 'next/link'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'


export default function CreateAccount() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError('')
    setLoading(true)

    try {
      // Create the user in Firebase
      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      // On success, redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex max-h-screen flex-col items-center justify-center pt-5 pb-38">
          <div className="absolute top-4 right-4 left-4 flex items-center justify-between ">
            <Link href="/" className="flex items-center gap-2" >
              <HiArrowCircleLeft className="dark:text-gray-300 text-xl cursor-pointer text-[#111928]"/>
              <span className="relative w-fit text-xs font-semibold whitespace-nowrap text-[#111928] dark:text-white cursor-pointer">
                Back
              </span>
            </Link>
            <DarkThemeToggle className="cursor-pointer"/>
          </div>
    
          <div className="flex flex-col items-center justify-center w-full min-w-sm max-w-md px-4 py-8  sm:max-w-sm xl:p-0 ">
            
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white pb-4">
              Create your account
            </h1>
    
            
    
            <div className="backdrop-blur-md bg-white/75 rounded-xl shadow dark:border-2 s:mx-w-sm dark:bg-gray-800 dark:border-gray-700/15 px-4 py-6">
              <div className="p-4 space-y-2 md:space-y-4 sm:p-8">

                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    {error && (
                      <div className="text-red-500 text-center">{error}</div>
                    )}
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
    
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                  <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              </div>
    
                  
    
                  <div>
                    {error && (
                      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-800/30 dark:text-red-400" role="alert">
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Creating account..." : "Sign up"}
                    </button>
                  </div>
    
                  
                </form>
              
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link href="/login"  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
  )
}