import { Archivo_Black, Quattrocento_Sans, Lato } from 'next/font/google'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo-black',
})

const quattrocentoSans = Quattrocento_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quattrocento-sans',
})

const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
})

export const metadata = {
  title: 'Greencanto',
  description: 'Explore and interact with green spaces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${archivoBlack.variable} ${quattrocentoSans.variable} ${lato.variable}`}>
      <head>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css' rel='stylesheet' />
      </head>
      <body className={`${quattrocentoSans.className} flex flex-col min-h-screen`}>
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
                <Link href="/private" passHref>
                  <Button variant="ghost" className="text-white hover:text-[#d76a03]">
                    Private
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-[#2d677d] text-white py-8">
          <div className="container mx-auto px-8 text-center">
            <p className={lato.className}>&copy; {new Date().getFullYear()} Greencanto. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}