'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Archivo_Black } from 'next/font/google'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo-black',
})

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <li>
    <Link href={href} passHref>
      <Button variant="ghost" className="text-white hover:text-[#d76a03]" onClick={onClick}>
        {children}
      </Button>
    </Link>
  </li>
)

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#2d677d] shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className={`${archivoBlack.className} text-2xl font-bold text-white`}>Greencanto</Link>
        <ul className="hidden md:flex space-x-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="#mission">Mission</NavLink>
          <NavLink href="#team">Team</NavLink>
          <NavLink href="#join">Join</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <NavLink href="/private">Private</NavLink>
        </ul>
        <Button
          variant="ghost"
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#2d677d] py-4"
          >
            <ul className="container mx-auto px-4 flex flex-col space-y-4">
              <NavLink href="/" onClick={closeMenu}>Home</NavLink>
              <NavLink href="#mission" onClick={closeMenu}>Mission</NavLink>
              <NavLink href="#team" onClick={closeMenu}>Team</NavLink>
              <NavLink href="#join" onClick={closeMenu}>Join</NavLink>
              <NavLink href="#contact" onClick={closeMenu}>Contact</NavLink>
              <NavLink href="/private" onClick={closeMenu}>Private</NavLink>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar