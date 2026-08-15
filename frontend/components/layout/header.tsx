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
import { Menu, User, LogOut, ChevronDown, Plane } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
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
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-slate-200/80 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
          : "border-transparent bg-[#071a33]"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/20 text-sky-300 ring-1 ring-sky-300/30">
              <Plane className="h-4 w-4" />
            </span>
            <span className="text-xl font-bold tracking-tight">
              <span className={isScrolled ? "text-sky-600" : "text-sky-300"}>AVIA</span>
              <span className={isScrolled ? "text-slate-900" : "text-white"}>SERVE</span>
            </span>
          </Link>
          <nav className="ml-10 hidden items-center space-x-1 md:flex">
            {navigation.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? isScrolled
                        ? "bg-sky-50 text-sky-700"
                        : "bg-white/10 text-white"
                      : isScrolled
                        ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 ${isScrolled ? "text-slate-800" : "text-white hover:bg-white/10"}`}
                >
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
                <Button
                  variant="ghost"
                  className={isScrolled ? "text-slate-700" : "text-white hover:bg-white/10 hover:text-white"}
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-sky-500 text-white hover:bg-sky-400">Register</Button>
              </Link>
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${isScrolled ? "text-slate-800" : "text-white hover:bg-white/10"}`}
              >
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
                    className={`text-sm font-medium ${
                      pathname === item.href ? "text-sky-600" : "text-slate-600 hover:text-sky-600"
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
                      <Button className="w-full bg-sky-500 text-white hover:bg-sky-400">Register</Button>
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
