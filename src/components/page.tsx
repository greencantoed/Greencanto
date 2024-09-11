'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Menu, Zap, Leaf, Users } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'

export function Page() {
  const [activeSection, setActiveSection] = useState('home')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'mission', 'who', 'join', 'contact', 'faq']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'La Nostra Missione', id: 'mission' },
    { label: 'Chi Siamo', id: 'who' },
    { label: 'Unisciti a Noi', id: 'join' },
    { label: 'Contattaci', id: 'contact' },
    { label: 'FAQ', id: 'faq' },
  ]

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Navigation */}
      <nav className="bg-[#2d677d] text-white p-4 sticky top-0 z-10 backdrop-blur-lg bg-opacity-80">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Greencanto</h1>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <ul className={`md:flex space-y-2 md:space-y-0 md:space-x-4 ${menuOpen ? 'block absolute top-full left-0 right-0 bg-[#2d677d] p-4' : 'hidden md:block'}`}>
            {navItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className={`text-white hover:text-[#d76a03] ${activeSection === item.id ? 'bg-[#d76a03] text-white' : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Content sections */}
      <main className="space-y-24">
        {/* Home section */}
        <section id="home" className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center relative overflow-hidden" style={{backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d677d] to-transparent opacity-80"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEuNSIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-20 animate-[grain_8s_steps(10)_infinite]"></div>
          <div className="relative z-10 text-white max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 leading-tight">Rigeneriamo l'agricoltura Siciliana</h1>
            <p className="text-xl mb-8">
              Greencanto ha come obiettivo il recupero e la messa a produttività di terreni incolti ed abbandonati Siciliani, con il fine ultimo di realizzare progetti agri-voltaici serializzati e sostenibili. Unisciti a noi per immaginare una Sicilia più verde.
            </p>
            <Button className="bg-[#d76a03] text-white hover:bg-[#f27d0c] text-lg px-8 py-3" onClick={() => scrollTo('mission')}>
              Scopri di Più <ChevronDown className="ml-2" />
            </Button>
          </div>
        </section>

        {/* Our Mission section */}
        <section id="mission" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-8">
            <div className="flex items-center mb-8">
              <Zap className="w-12 h-12 text-[#d76a03] mr-4" />
              <h2 className="text-4xl font-bold text-[#2d677d]">La Nostra Missione</h2>
            </div>
            <p className="text-[#2d677d] text-xl leading-relaxed">
              La nostra missione è chiara: rigenerare terreni abbandonati e farli rifiorire grazie a investimenti sostenibili. Offriamo agli utenti l'opportunità di acquistare quote di aziende agricole, promuovendo un'agricoltura innovativa e sostenibile. Parallelamente, sosteniamo progetti di riqualificazione ambientale, con un focus speciale sulla Sicilia.
            </p>
          </div>
        </section>

        {/* Who are we section */}
        <section id="who" className="py-24 bg-[#f8f8f8]">
          <div className="max-w-4xl mx-auto px-8">
            <div className="flex items-center mb-8">
              <Users className="w-12 h-12 text-[#d76a03] mr-4" />
              <h2 className="text-4xl font-bold text-[#2d677d]">Chi Siamo</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <div className="w-48 h-48 mx-auto mb-6 bg-gray-300 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=192&width=192"
                    alt="Edoardo Lorenzo Cumitini"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#2d677d] mb-4">Edoardo Lorenzo Cumitini</h3>
                <p className="text-[#2d677d] text-lg">
                  PhD candidate in Social Sciences at University of Hamburg, con expertise in Geografia Economica. La sua visione e conoscenza guidano l'approccio innovativo di Greencanto nel connettere agricoltura sostenibile e energia rinnovabile.
                </p>
              </div>
              <div>
                <div className="w-48 h-48 mx-auto mb-6 bg-gray-300 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=192&width=192"
                    alt="Giuseppe Marletta"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#2d677d] mb-4">Giuseppe Marletta</h3>
                <p className="text-[#2d677d] text-lg">
                  Avvocato e agro-imprenditore. La sua esperienza legale e imprenditoriale nel settore agricolo è fondamentale per guidare Greencanto attraverso le complessità normative e operative dei progetti agrivoltaici.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join us now! section */}
        <section id="join" className="py-24 bg-[#2d677d] text-white">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div className="flex items-center justify-center mb-8">
              <Leaf className="w-12 h-12 text-[#d76a03] mr-4" />
              <h2 className="text-4xl font-bold">Unisciti a Noi</h2>
            </div>
            <p className="text-xl mb-10 leading-relaxed">
              Greencanto non è solo un'opportunità di investimento; è una comunità di persone che credono in un futuro più sostenibile. Con il supporto del nostro team esperto, ci impegniamo a trasformare terreni abbandonati in risorse produttive, offrendo un ritorno economico tangibile ai nostri investitori e un impatto positivo sull'ambiente.
            </p>
            <Link href="/private" passHref>
              <Button className="bg-[#d76a03] text-white hover:bg-[#f27d0c] text-lg px-8 py-3">
                Vai alla Pagina Privata
              </Button>
            </Link>
          </div>
        </section>

        {/* Contacts section */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-[#2d677d] mb-8">Contattaci</h2>
            <form className="space-y-6">
              <input type="text" placeholder="Nome" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d677d]" />
              <input type="email" placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d677d]" />
              <textarea placeholder="Messaggio" required className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-[#2d677d]"></textarea>
              <Button type="submit" className="bg-[#d76a03] text-white hover:bg-[#f27d0c] text-lg px-8 py-3">
                Invia
              </Button>
            </form>
          </div>
        </section>

        {/* FAQ section */}
        <section id="faq" className="py-24 bg-[#f8f8f8]">
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-[#2d677d] mb-8">Domande Frequenti</h2>
            <div className="space-y-6">
              {[
                {
                  question: "Cos'è l'agrivoltaico?",
                  answer: "L'agrivoltaico combina l'energia solare con l'agricoltura, permettendo di utilizzare lo stesso terreno per produrre energia elettrica e coltivare. Questo approccio innovativo massimizza l'uso della terra, genera energia pulita e sostiene l'agricoltura sostenibile."
                },
                {
                  question: "Quali sono i benefici dell'acquisto di quote?",
                  answer: "Acquistando quote, contribuisci allo sviluppo di terreni agricoli abbandonati, supportando l'agricoltura sostenibile e la rigenerazione ambientale. Inoltre, puoi ricevere ritorni finanziari dai profitti generati dall'azienda agricola."
                },
                {
                  question: "Come posso iniziare a investire?",
                  answer: "Per iniziare a investire, basta scaricare l'app, registrarsi, scegliere il progetto agricolo di interesse e acquistare le quote disponibili. Potrai monitorare i tuoi investimenti direttamente dall'app."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-300 pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left font-bold text-[#2d677d] text-xl"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    {openFaq === index ? <ChevronUp className="text-[#d76a03] w-6 h-6" /> : <ChevronDown className="text-[#d76a03] w-6 h-6" />}
                  </button>
                  {openFaq === index && (
                    <p className="mt-4 text-[#2d677d] text-lg">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2d677d] text-white py-8">
        <div className="container mx-auto px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Greencanto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}