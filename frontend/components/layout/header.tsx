"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth/auth-provider"
import { Menu, User, LogOut, ChevronDown } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Flights", href: "/flights" },
    { name: "Destinations", href: "/destinations" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 bg-white/95 backdrop-blur ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">AVIA</span>
              <span className="text-slate-700">SERVE</span>
            </div>
          </Link>
          <nav className="ml-10 hidden space-x-6 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/loyalty">Loyalty Program</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/operations">Operations Center</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden space-x-2 md:flex">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Register</Button>
              </Link>
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      pathname === item.href ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {!user && (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" className="w-full justify-start">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Register</Button>
                    </Link>
                  </>
                )}
                {user && (
                  <>
                    <div className="h-px bg-gray-200" />
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/profile">
                      <Button variant="ghost" className="w-full justify-start">
                        Profile
                      </Button>
                    </Link>
                    <Link href="/dashboard/bookings">
                      <Button variant="ghost" className="w-full justify-start">
                        My Bookings
                      </Button>
                    </Link>
                    <Link href="/dashboard/loyalty">
                      <Button variant="ghost" className="w-full justify-start">
                        Loyalty Program
                      </Button>
                    </Link>
                    {user.role === "admin" && (
                      <>
                        <Link href="/admin">
                          <Button variant="ghost" className="w-full justify-start">
                            Admin Panel
                          </Button>
                        </Link>
                        <Link href="/operations">
                          <Button variant="ghost" className="w-full justify-start">
                            Operations Center
                          </Button>
                        </Link>
                      </>
                    )}
                    <Button variant="ghost" className="w-full justify-start text-red-600" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
