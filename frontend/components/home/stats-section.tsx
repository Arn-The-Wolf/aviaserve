import { Plane, Users, Award, Globe } from "lucide-react"

const stats = [
  { icon: Plane, value: "500+", label: "Aircraft fleet", description: "Modern and efficient aircraft" },
  { icon: Globe, value: "150+", label: "Destinations", description: "Cities worldwide" },
  { icon: Users, value: "50M+", label: "Happy passengers", description: "Served annually" },
  { icon: Award, value: "25+", label: "Awards won", description: "Industry recognition" },
]

export default function StatsSection() {
  return (
    <div className="container px-4 md:px-6">
      <div className="mb-12 text-center">
        <p className="section-kicker">Network</p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Trusted worldwide</h2>
        <p className="mt-3 text-slate-600">Airline operations and passenger service in one platform.</p>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <stat.icon className="h-7 w-7" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            <div className="mt-1 font-semibold text-slate-700">{stat.label}</div>
            <div className="mt-1 text-sm text-slate-500">{stat.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
