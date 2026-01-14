"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import emailjs from "@emailjs/browser"

const emergencyContacts = [
  { name: "Emergency Services", number: "102", icon: "🚨", isPulse: true },
  { name: "Campus Security", number: "+91-XXX-XXX-0911", icon: "👮" },
  { name: "Health Center", number: "+91-XXX-XXX-0912", icon: "🏥" },
  { name: "Dean Office", number: "+91-XXX-XXX-0913", icon: "👔" },
]

const generalContacts = [
  { name: "Admissions", number: "+91-XXX-XXX-2001", icon: "📝" },
  { name: "Finance", number: "+91-XXX-XXX-2002", icon: "💰" },
  { name: "Library", number: "+91-XXX-XXX-2003", icon: "📚" },
  { name: "Student Affairs", number: "+91-XXX-XXX-2004", icon: "👨‍🎓" },
]

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // ✅ SEND EMAIL FUNCTION
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    emailjs
      .sendForm(
        "service_6888awa",
        "template_x7cwofu",
        e.currentTarget,
        "5zAZtj-SizVxQhVWR"
      )
      .then(
        () => {
          alert("Message sent successfully ✅")
          setLoading(false)
          e.currentTarget.reset()
        },
        (error) => {
          console.error(error)
          alert("Failed to send message ❌")
          setLoading(false)
        }
      )
  }

  return (
    <>
      <Header />
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-foreground/60">Get in touch with us for any assistance</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-2xl font-bold mb-6">Emergency Contacts</h2>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl bg-card border-2 ${
                      contact.isPulse
                        ? "border-destructive/50 hover:border-destructive/80"
                        : "border-border hover:border-primary/50"
                    } transition-all duration-300 group cursor-pointer`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-3xl ${
                          contact.isPulse
                            ? "animate-pulse"
                            : "group-hover:scale-110 transition-transform"
                        }`}
                      >
                        {contact.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground/60">{contact.name}</p>
                        <p className="font-bold text-lg">{contact.number}</p>
                      </div>
                      <a
                        href={`tel:${contact.number}`}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-2xl font-bold mb-6">General Inquiries</h2>
              <div className="space-y-4">
                {generalContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform">
                        {contact.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground/60">{contact.name}</p>
                        <p className="font-bold text-lg">{contact.number}</p>
                      </div>
                      <a
                        href={`tel:${contact.number}`}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all duration-300"
                      >
                        Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ EMAIL FORM (THEME UNCHANGED) */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
            <h3 className="text-xl font-bold mb-4">Send us a message</h3>

            <form className="space-y-4" onSubmit={sendEmail}>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <textarea
                name="message"
                placeholder="Your message"
                rows={4}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
