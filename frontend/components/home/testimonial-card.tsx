import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, StarHalf } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export default function TestimonialCard({ name, role, content, rating, avatar }: TestimonialCardProps) {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />)
  }
  if (hasHalfStar) {
    stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-amber-400 text-amber-400" />)
  }
  while (stars.length < 5) {
    stars.push(<Star key={`empty-star-${stars.length}`} className="h-4 w-4 text-slate-300" />)
  }

  return (
    <Card className="h-full overflow-hidden border-slate-100 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center space-x-1">{stars}</div>
        <p className="mb-6 leading-relaxed text-slate-700">“{content}”</p>
        <div className="flex items-center space-x-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-sky-100">
            <Image src={avatar || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{name}</p>
            <p className="text-sm text-slate-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
