import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-navy-blue text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/aviaserve-logo.png"
                alt="AVIASERVE"
                width={120}
                height={40}
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-gray-300">
              Experience premium travel with AVIASERVE Airlines. Your journey begins here with comfort, reliability, and
              exceptional service.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-sky-blue">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-sky-blue">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-sky-blue">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-sky-blue">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/flights" className="text-gray-300 hover:text-sky-blue">
                  Search Flights
                </Link>
              </li>
              <li>
                <Link href="/dashboard/bookings" className="text-gray-300 hover:text-sky-blue">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/dashboard/check-in" className="text-gray-300 hover:text-sky-blue">
                  Check-in
                </Link>
              </li>
              <li>
                <Link href="/dashboard/loyalty" className="text-gray-300 hover:text-sky-blue">
                  Loyalty Program
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-300 hover:text-sky-blue">
                  Destinations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Information</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-sky-blue">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-sky-blue">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-sky-blue">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-sky-blue">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-sky-blue">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-sky-blue" />
                <span className="text-gray-300">123 AVIASERVE Tower, Aviation Blvd, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sky-blue" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sky-blue" />
                <span className="text-gray-300">support@aviaserve.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} AVIASERVE Airlines. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-sm text-gray-300 hover:text-sky-blue">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-300 hover:text-sky-blue">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-gray-300 hover:text-sky-blue">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
