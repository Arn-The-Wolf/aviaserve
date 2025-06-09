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
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center space-x-1 mb-4">{renderStars()}</div>
        <p className="mb-6 text-gray-700 leading-relaxed">{content}</p>
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image src={avatar || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{name}</p>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
