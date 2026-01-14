"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import emailjs from "@emailjs/browser"

const reportCategories = [
  { id: "safety", label: "Safety Concern", icon: "🚨" },
  { id: "harassment", label: "Harassment", icon: "⚠️" },
  { id: "maintenance", label: "Maintenance Issue", icon: "🔧" },
  { id: "other", label: "Other", icon: "📝" },
]

export default function ReportPage() {
  const [step, setStep] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [anonymousMode, setAnonymousMode] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    emailjs
      .sendForm(
        "service_6888awa",
        "template_msuqvqt",
        e.currentTarget,
        "5zAZtj-SizVxQhVWR"
      )
      .then(
        () => {
          setSubmitted(true)
          setLoading(false)
          setTimeout(() => {
            setStep(0)
            setSelectedCategory("")
            setAnonymousMode(false)
            setSubmitted(false)
          }, 3000)
        },
        (error) => {
          console.error(error)
          alert("Failed to submit report ❌")
          setLoading(false)
        }
      )
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="pt-20 pb-20">
          <div className="max-w-md mx-auto">
            <div className="text-center space-y-4 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <div className="text-6xl animate-bounce">✓</div>
              <h2 className="text-2xl font-bold">Report Submitted</h2>
              <p className="text-foreground/70">
                Thank you for reporting. Your identity is protected and we will investigate this matter.
              </p>
              <div className="pt-4 text-sm text-foreground/60">Redirecting...</div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-20 pb-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Report an Issue</h1>
            <p className="text-foreground/60">Help us maintain a safe and healthy campus environment</p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">

            {/* STEP 1 */}
            {step === 0 && (
              <div className="space-y-6 animate-slide-up">
                <div>
                  <h2 className="text-xl font-bold mb-4">Step 1: Select Category</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {reportCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id)
                          setStep(1)
                        }}
                        className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left group"
                      >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                          {category.icon}
                        </div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {category.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold text-primary">Note:</span> All reports are taken seriously and will
                    be investigated promptly. Your safety and well-being are our priority.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <form className="space-y-6 animate-slide-up" onSubmit={sendReport}>

                {/* hidden field for category */}
                <input type="hidden" name="category" value={selectedCategory} />

                <div>
                  <h2 className="text-xl font-bold mb-4">Step 2: Provide Details</h2>
                  <textarea
                    name="description"
                    placeholder="Please describe what happened in detail..."
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Location</h3>
                  <input
                    name="location"
                    type="text"
                    required
                    placeholder="Where did this occur?"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Date and Time</h3>
                  <input
                    name="datetime"
                    type="datetime-local"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div>
                    <p className="font-semibold">Anonymous Report</p>
                    <p className="text-sm text-foreground/60">Keep your identity private</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnonymousMode(!anonymousMode)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      anonymousMode ? "bg-primary" : "bg-border"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        anonymousMode ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* hidden field to send anonymous flag */}
                <input type="hidden" name="anonymous" value={anonymousMode ? "Yes" : "No"} />

                <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold text-accent">Security Notice:</span> Your identity is protected. All
                    information will be handled confidentially.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="flex-1 px-6 py-3 border border-border text-foreground rounded-lg hover:border-primary/50 transition-colors"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    {loading ? "Submitting..." : "Submit Report"}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
