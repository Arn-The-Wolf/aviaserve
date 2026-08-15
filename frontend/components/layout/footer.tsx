import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Plane } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#04101f] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300">
                <Plane className="h-4 w-4" />
              </span>
              <span className="text-2xl font-bold">
                <span className="text-sky-300">AVIA</span>
                <span className="text-white">SERVE</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
              Premium travel with comfort, reliability, and an operations-grade airline experience.
            </p>
            <div className="mt-6 flex space-x-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition hover:bg-sky-500/20 hover:text-sky-300"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li>
                <Link href="/flights" className="hover:text-sky-300">
                  Search Flights
                </Link>
              </li>
              <li>
                <Link href="/dashboard/bookings" className="hover:text-sky-300">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/dashboard/check-in" className="hover:text-sky-300">
                  Check-in
                </Link>
              </li>
              <li>
                <Link href="/dashboard/loyalty" className="hover:text-sky-300">
                  Loyalty Program
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-sky-300">
                  Destinations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">Information</h3>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li>
                <Link href="/about" className="hover:text-sky-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-sky-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-sky-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-sky-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">Contact Us</h3>
            <ul className="mt-4 space-y-4 text-slate-300">
              <li className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-5 w-5 text-sky-400" />
                <span>123 AVIASERVE Tower, Aviation Blvd, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sky-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sky-400" />
                <span>support@aviaserve.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} AVIASERVE Airlines. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400">
              <Link href="/terms" className="hover:text-sky-300">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-sky-300">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
