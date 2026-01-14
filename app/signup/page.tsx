"use client"

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/profile")
    } catch (err: any) {
      alert(err.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSignup} className="bg-card p-8 rounded-xl border w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          required
          className="w-full p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-primary text-primary-foreground py-3 rounded">
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  )
}
