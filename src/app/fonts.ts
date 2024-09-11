import { Archivo_Black, Quattrocento_Sans, Lato } from 'next/font/google'

export const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const quattrocentoSans = Quattrocento_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})