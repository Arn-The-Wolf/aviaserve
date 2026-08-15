"use client"

import { Plane, Cloud } from "lucide-react"

export default function AnimatedHero() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-3xl border border-white/15 shadow-2xl md:h-[460px]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=800&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04101f] via-[#0b2a4f]/55 to-transparent" />
      <div className="avia-aurora absolute -left-10 top-8 h-40 w-40 rounded-full bg-sky-400/30 blur-3xl" />
      <div className="avia-aurora absolute bottom-4 right-6 h-32 w-32 rounded-full bg-amber-300/20 blur-3xl" />

      <Cloud className="avia-drift absolute left-8 top-10 h-12 w-12 text-white/50" />
      <Cloud className="avia-float absolute right-10 top-16 h-16 w-16 text-white/35" />
      <Cloud className="avia-drift absolute bottom-24 left-16 h-10 w-10 text-white/40" />

      <div className="avia-float absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-full bg-white/15 p-5 shadow-lg ring-1 ring-white/30 backdrop-blur-md">
          <Plane className="h-16 w-16 rotate-12 text-white" />
        </div>
      </div>

      <div className="absolute bottom-6 left-6 rounded-full bg-black/30 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
        Experience premium aviation
      </div>
    </div>
  )
}
