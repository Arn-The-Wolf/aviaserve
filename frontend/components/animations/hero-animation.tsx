"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function HeroAnimation() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="relative h-[300px] w-full sm:h-[400px] md:h-[500px]">
      <div
        className={`absolute transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          top: "10%",
          left: "10%",
          zIndex: 3,
          transitionDelay: "0.2s",
        }}
      >
        <Image
          src="/placeholder.svg?height=100&width=100"
          alt="Cloud"
          width={100}
          height={100}
          className="opacity-80"
        />
      </div>
      <div
        className={`absolute transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          top: "20%",
          right: "15%",
          zIndex: 3,
          transitionDelay: "0.4s",
        }}
      >
        <Image
          src="/placeholder.svg?height=120&width=120"
          alt="Cloud"
          width={120}
          height={120}
          className="opacity-80"
        />
      </div>
      <div
        className={`absolute transition-all duration-1000 ${
          loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
        }`}
        style={{
          top: "50%",
          left: "50%",
          transform: loaded ? "translate(-50%, -50%)" : "translate(-60%, -50%)",
          zIndex: 4,
          transitionDelay: "0.6s",
        }}
      >
        <Image
          src="/placeholder.svg?height=300&width=500"
          alt="Airplane"
          width={500}
          height={300}
          className="object-contain"
        />
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-b from-sky-100 to-transparent rounded-3xl transition-opacity duration-1000 ${
          loaded ? "opacity-60" : "opacity-0"
        }`}
        style={{ zIndex: 1 }}
      ></div>
    </div>
  )
}
