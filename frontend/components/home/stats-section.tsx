"use client"

import { motion } from "framer-motion"
import { Plane, Users, Award, Globe } from "lucide-react"

const stats = [
  {
    icon: Plane,
    value: "500+",
    label: "Aircraft Fleet",
    description: "Modern and efficient aircraft",
  },
  {
    icon: Globe,
    value: "150+",
    label: "Destinations",
    description: "Cities worldwide",
  },
  {
    icon: Users,
    value: "50M+",
    label: "Happy Passengers",
    description: "Served annually",
  },
  {
    icon: Award,
    value: "25+",
    label: "Awards Won",
    description: "Industry recognition",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function StatsSection() {
  return (
    <motion.div
      className="container px-4 md:px-6"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.div className="text-center mb-12" variants={fadeInUp}>
        <h2 className="text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl">
          Trusted by Millions Worldwide
        </h2>
        <p className="text-gray-600 mt-4">Leading the aviation industry with excellence and innovation</p>
      </motion.div>

      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8" variants={staggerContainer}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <stat.icon className="w-8 h-8 text-blue-600" />
            </motion.div>
            <motion.div
              className="text-3xl font-bold text-slate-900 mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {stat.value}
            </motion.div>
            <div className="text-lg font-semibold text-slate-700 mb-1">{stat.label}</div>
            <div className="text-sm text-gray-600">{stat.description}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
