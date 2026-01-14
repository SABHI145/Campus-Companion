"use client"

import { useState } from "react"

export function GeminiChat() {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([])
  const [loading, setLoading] = useState(false)

  // ⚠️ For prototype only — move to env later
  const API_KEY = "AIzaSyCUZBJuAVbehq1JR4tZVpVqkZQnXZsHH0Y"

  const askGemini = async () => {
  if (!question.trim() || loading) return

  const userText = question

  setMessages((prev) => [...prev, { role: "user", text: userText }])
  setQuestion("")
  setLoading(true)

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userText }],
            },
          ],
        }),
      }
    )

    const data: any = await res.json()
    console.log("Gemini Response:", data)

    if (data.error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "API Error: " + data.error.message },
      ])
    } else {
      const aiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI."

      setMessages((prev) => [...prev, { role: "ai", text: aiText }])
    }
  } catch (err) {
    console.error("Network Error:", err)
    setMessages((prev) => [
      ...prev,
      { role: "ai", text: "Network error. Please try again." },
    ])
  }

  setLoading(false)
}

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg hover:scale-105 transition z-50 flex items-center justify-center"
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 max-h-[70vh] bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col overflow-hidden z-50">
          <div className="p-3 font-bold bg-blue-100 text-blue-900">
            Campus Assistant
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm min-h-[200px]">
            {messages.length === 0 && (
              <p className="text-gray-400 text-center mt-4">
                Ask me about campus, labs, food, events...
              </p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  m.role === "user"
                    ? "bg-blue-600 text-white ml-auto text-right"
                    : "bg-gray-100 text-gray-800 mr-auto text-left"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <p className="text-xs text-gray-500 animate-pulse">Thinking...</p>
            )}
          </div>

          <div className="p-2 border-t flex gap-2 bg-white">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askGemini()}
              placeholder="Type here..."
              className="flex-1 px-3 py-2 border rounded-md text-sm outline-none"
            />
            <button
              onClick={askGemini}
              disabled={loading}
              className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
