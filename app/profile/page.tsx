"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    roll: "",
    program: "",
    year: "",
    phone: "",
  })

  /* ✅ Check login + load profile */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login")
        return
      }

      // always set email from auth
      setProfile((prev) => ({ ...prev, email: user.email || "" }))

      const profileRef = doc(db, "profiles", user.uid)
      const snap = await getDoc(profileRef)

      if (snap.exists()) {
        const data = snap.data() as any
        setProfile((prev) => ({ ...prev, ...data }))

        // if any required field missing → force edit
        if (
          !data.name ||
          !data.roll ||
          !data.program ||
          !data.year ||
          !data.phone
        ) {
          setIsEditing(true)
        }
      } else {
        // new user → must fill profile
        setIsEditing(true)
      }

      setLoading(false)
    })

    return () => unsub()
  }, [router])

  /* ✅ Save profile */
  const saveProfile = async () => {
    const user = auth.currentUser
    if (!user) return

    if (
      !profile.name ||
      !profile.roll ||
      !profile.program ||
      !profile.year ||
      !profile.phone
    ) {
      alert("Please fill all required details ⚠️")
      return
    }

    await setDoc(doc(db, "profiles", user.uid), profile)
    alert("Profile saved successfully ✅")
    setIsEditing(false)
  }

  if (loading) return null

  return (
    <>
      <Header />
      <main className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-foreground/60">
              Manage your campus companion account
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* LEFT CARD */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
                <div className="mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-bold text-primary-foreground">
                      {profile.name
                        ? profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                        : "?"}
                    </span>
                  </div>
                  <h2 className="font-bold text-lg text-center">
                    {profile.name || "Complete your profile"}
                  </h2>
                  <p className="text-sm text-foreground/60 text-center mt-1">
                    {profile.program || "—"}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs text-foreground/60">Roll Number</p>
                    <p className="font-semibold">{profile.roll || "—"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-foreground/60">Year</p>
                    <p className="font-semibold">{profile.year || "—"}</p>
                  </div>
                </div>

                {/* EDIT + LOGOUT */}
                <div className="space-y-3 mt-6">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full px-4 py-2 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>

                  <button
                    onClick={() => signOut(auth)}
                    className="w-full px-4 py-2 bg-destructive/10 text-destructive font-semibold rounded-lg hover:bg-destructive/20 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold mb-6">
                  Personal Information
                </h3>

                <div className="space-y-4">
                  {[
                    { key: "name", label: "Full Name", type: "text" },
                    { key: "roll", label: "Roll Number", type: "text" },
                    { key: "program", label: "Program", type: "text" },
                    { key: "year", label: "Year", type: "text" },
                    { key: "phone", label: "Phone", type: "tel" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-sm font-semibold text-foreground/60 block mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={(profile as any)[field.key]}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            [field.key]: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="text-sm font-semibold text-foreground/60 block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg opacity-50"
                    />
                  </div>

                  {isEditing && (
                    <button
                      onClick={saveProfile}
                      className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
