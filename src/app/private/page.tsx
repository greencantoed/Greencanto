'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Menu, X, LogIn, LogOut } from 'lucide-react'
import FloatingMenu from '@/components/FloatingMenu'
import CommunityBlog from '@/components/CommunityBlog'

const SicilyMap = dynamic(() => import('@/components/SicilyMap'), {
  loading: () => <p>Caricamento mappa...</p>,
  ssr: false
})

export default function PrivatePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showBlog, setShowBlog] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowBlog(false)
  }

  return (
    <div className="h-screen w-full relative">
      <header className="absolute top-0 left-0 right-0 bg-black/30 text-white p-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Greencanto - Area Privata</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            {isLoggedIn ? (
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            ) : (
              <Button variant="outline" onClick={handleLogin}>
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
            <Link href="/" passHref>
              <Button variant="outline">Torna alla Home</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <aside className={`absolute top-0 right-0 h-full bg-white/90 shadow-lg transition-all duration-300 ease-in-out z-20 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          {isLoggedIn && (
            <Button 
              className="w-full mb-4" 
              onClick={() => {
                setShowBlog(!showBlog)
                setSidebarOpen(false)
              }}
            >
              {showBlog ? 'Nascondi Blog' : 'Mostra Blog'}
            </Button>
          )}
          {/* Add more sidebar content here if needed */}
        </div>
      </aside>
      
      <main className="h-full w-full relative">
        <SicilyMap />
        <FloatingMenu />
        {showBlog && isLoggedIn && (
          <div className="absolute inset-0 bg-white/90 overflow-auto z-30">
            <CommunityBlog />
          </div>
        )}
      </main>
    </div>
  )
}