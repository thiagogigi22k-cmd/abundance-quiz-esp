"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Home() {
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      router.push(`/step2?name=${encodeURIComponent(name.trim())}`)
    }
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/design-20sem-20nome-20-281-29.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center justify-center text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/sem-20nome-20-281080-20x-201080-20px-29-20-281-29.png"
            alt="The Age of Abundance"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-6 text-balance">
          {"If you're here right now..."}
        </h2>

        <p className="text-lg md:text-xl text-[#D4AF37] mb-8 leading-relaxed">
          {"it's no accident. God chose this moment to change your story."}
        </p>

        <div className="flex items-center justify-center gap-2 mb-4 text-[#D4AF37]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <span className="text-sm font-medium">Enter your name</span>
        </div>

        <form onSubmit={handleSubmit} className="w-full mb-6 relative z-30">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onTouchStart={(e) => (e.target as HTMLInputElement).focus()}
            placeholder="Enter your name here"
            autoComplete="off"
            className="w-full bg-[#f5f5f5] border-2 border-[#D4AF37] rounded-lg py-3 px-4 text-center text-lg mb-4 outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#1a1a1a] placeholder-[#888] relative z-30 cursor-text"
          />

          <p className="text-sm md:text-base text-[#D4AF37] mb-6">
            Enter your name to begin your manifestation journey.
          </p>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-[#F9D423] text-[#1a1a1a] font-bold py-4 px-6 rounded-lg text-lg flex items-center justify-center gap-2 hover:bg-[#E5C31F] transition-colors border-2 border-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
            Start my Journey
          </button>
        </form>
      </div>
    </main>
  )
}
