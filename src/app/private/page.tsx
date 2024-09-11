'use client'

import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const SicilyMap = dynamic(() => import('@/components/SicilyMap'), {
  loading: () => <p>Caricamento mappa...</p>,
  ssr: false
})

export default function PrivatePage() {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-[#2d677d] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Greencanto - Area Privata</h1>
          <Link href="/" passHref>
            <Button variant="outline">Torna alla Home</Button>
          </Link>
        </div>
      </header>
      <main className="flex-grow">
        <SicilyMap />
      </main>
    </div>
  )
}