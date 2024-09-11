'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

type Project = {
  id: string
  name: string
}

const projects: Project[] = [
  { id: '1', name: 'Progetto Agrivoltaico Siracusa' },
  { id: '2', name: 'Riqualificazione Terreni Catania' },
  { id: '3', name: 'Energia Solare Palermo' },
]

export function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-20 right-4 z-10">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 bg-[#2d677d] text-white"
      >
        {isOpen ? 'Chiudi Progetti' : 'Progetti Attivi'}
      </Button>
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Progetti Attivi</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.id} className="mb-2">
                <Link href={`/community/${project.id}`} passHref>
                  <Button variant="link" className="text-[#2d677d]">
                    {project.name}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}