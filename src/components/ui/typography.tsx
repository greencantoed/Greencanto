import { archivoBlack, quattrocentoSans, lato } from '../../fonts'

export function Heading1({ children }: { children: React.ReactNode }) {
  return <h1 className={`${archivoBlack.className} text-4xl mb-4`}>{children}</h1>
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className={`${quattrocentoSans.className} text-base mb-2`}>{children}</p>
}

export function Button({ children }: { children: React.ReactNode }) {
  return <button className={`${lato.className} font-bold text-sm px-4 py-2 bg-blue-500 text-white rounded`}>{children}</button>
}