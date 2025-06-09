"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Plane, Cloud } from "lucide-react"

export default function AnimatedHero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
          alt="Aircraft in flight"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-blue-600/30 to-transparent" />
      </motion.div>

      {/* Floating clouds */}
      <motion.div
        className="absolute"
        style={{ top: "15%", left: "10%", zIndex: 2 }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Cloud className="h-12 w-12 text-white/60" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "25%", right: "15%", zIndex: 2 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <motion.div
          animate={{ x: [0, -15, 0], y: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Cloud className="h-16 w-16 text-white/40" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ bottom: "30%", left: "20%", zIndex: 2 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ duration: 2, delay: 0.7 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Cloud className="h-10 w-10 text-white/50" />
        </motion.div>
      </motion.div>

      {/* Animated airplane icon */}
      <motion.div
        className="absolute"
        style={{
          top: "45%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
        }}
        initial={{ opacity: 0, scale: 0.3, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, 0, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <Plane className="h-20 w-20 text-white drop-shadow-lg" />

            {/* Airplane trail */}
            <motion.div
              className="absolute top-1/2 right-full h-1 bg-gradient-to-r from-white/60 to-transparent"
              style={{ width: "80px" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 2 }}
            />

            {/* Animated trail dots */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 w-1.5 h-1.5 bg-white/70 rounded-full"
                style={{
                  right: `${90 + i * 15}px`,
                  transform: "translateY(-50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 2.5 + i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 1,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Bottom overlay text */}
      <motion.div
        className="absolute bottom-6 left-6 text-white z-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p className="text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
          Experience Premium Aviation
        </p>
      </motion.div>
    </div>
  )
}
