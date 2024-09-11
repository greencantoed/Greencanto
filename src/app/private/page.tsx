'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivatePage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-[#2d677d] mb-4">Pagina Privata</h1>
        <p className="text-[#2d677d] mb-4">Benvenuto nella sezione privata di Greencanto.</p>
        <Link href="/" passHref legacyBehavior>
          <Button className="bg-[#d76a03] text-white hover:bg-[#f27d0c]">
            Torna alla Home
          </Button>
        </Link>
      </div>
    </div>
  )
}