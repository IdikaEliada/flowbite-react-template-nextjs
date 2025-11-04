"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function CreateAccount() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      // Add your signup API call here
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username
        }),
      })

      if (response.ok) {
        router.push('/login')
      } else {
        setError('Failed to create account')
      }
    } catch (err) {
      setError('An error occurred during sign up')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <input
                type="text"
                required
                className="relative block w-full rounded-md border-0 p-2"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div>
              <input
                type="email"
                required
                className="relative block w-full rounded-md border-0 p-2"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="relative block w-full rounded-md border-0 p-2"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="relative block w-full rounded-md border-0 p-2"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-500">
            Login here
          </Link>
        </div>
      </div>
    </div>
  )
}