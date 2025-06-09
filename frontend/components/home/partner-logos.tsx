import Image from "next/image"

export default function PartnerLogos() {
  const partners = [
    { name: "Delta Airlines", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Emirates", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Lufthansa", logo: "/placeholder.svg?height=40&width=120" },
    { name: "British Airways", logo: "/placeholder.svg?height=40&width=120" },
    { name: "Singapore Airlines", logo: "/placeholder.svg?height=40&width=120" },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
      {partners.map((partner) => (
        <div key={partner.name} className="flex items-center justify-center">
          <Image
            src={partner.logo || "/placeholder.svg"}
            alt={partner.name}
            width={120}
            height={40}
            className="grayscale transition-all duration-200 hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  )
}
