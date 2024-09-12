'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Home', 'Mission', 'Team', 'Join', 'Contact']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Zap className={`w-8 h-8 ${isScrolled ? 'text-[#2d677d]' : 'text-white'} mr-2`} />
              <span className={`font-bold text-xl ${isScrolled ? 'text-[#2d677d]' : 'text-white'}`}>Greencanto</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    isScrolled
                      ? 'text-[#2d677d] hover:bg-[#e6f3f7]'
                      : 'text-white hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  {item}
                </Link>
              ))}
              <Link href="/private" passHref>
                <Button variant="outline" className={`ml-4 ${
                  isScrolled
                    ? 'text-[#2d677d] border-[#2d677d] hover:bg-[#2d677d] hover:text-white'
                    : 'text-white border-white hover:bg-white hover:text-[#2d677d]'
                }`}>
                  Area Privata
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-[#2d677d]' : 'text-white'
              } hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${isScrolled ? 'bg-white' : 'bg-[#2d677d]'}`}>
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isScrolled
                    ? 'text-[#2d677d] hover:bg-[#e6f3f7]'
                    : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link href="/private" passHref>
              <Button variant="outline" className={`w-full mt-2 ${
                isScrolled
                  ? 'text-[#2d677d] border-[#2d677d] hover:bg-[#2d677d] hover:text-white'
                  : 'text-white border-white hover:bg-white hover:text-[#2d677d]'
              }`}>
                Area Privata
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar