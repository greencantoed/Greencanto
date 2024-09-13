import { Archivo_Black, Quattrocento_Sans, Lato } from 'next/font/google'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Navbar from '@/components/Navbar'

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
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <footer className="bg-[#2d677d] text-white py-8">
          <div className="container mx-auto px-8 text-center">
            <p className={lato.className}>&copy; {new Date().getFullYear()} Greencanto. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}