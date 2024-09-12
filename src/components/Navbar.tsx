import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Archivo_Black } from 'next/font/google'

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo-black',
})

const Navbar = () => {
  return (
    <header className="bg-[#2d677d] text-white p-4 sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className={`${archivoBlack.className} text-2xl font-bold`}>Greencanto</Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" passHref>
              <Button variant="ghost" className="text-white hover:text-[#d76a03]">
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link href="#mission" passHref>
              <Button variant="ghost" className="text-white hover:text-[#d76a03]">
                Mission
              </Button>
            </Link>
          </li>
          <li>
            <Link href="#team" passHref>
              <Button variant="ghost" className="text-white hover:text-[#d76a03]">
                Team
              </Button>
            </Link>
          </li>
          <li>
            <Link href="#join" passHref>
              <Button variant="ghost" className="text-white hover:text-[#d76a03]">
                Join
              </Button>
            </Link>
          </li>
          <li>
            <Link href="#contact" passHref>
              <Button variant="ghost" className="text-white hover:text-[#d76a03]">
                Contact
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/private" passHref>
              <Button variant="ghost" className="text-white hover:text-[#d76a03]">
                Private
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar