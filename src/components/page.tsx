'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Menu, Zap, Leaf, Users, Send } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import EnricoLanding from '@/components/EnricoLanding'

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default function Page() {
  const [activeSection, setActiveSection] = useState('home')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
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
    <div className="min-h-screen bg-gradient-to-b from-[#2d677d] to-[#f4f4f4] overflow-y-auto snap-y snap-mandatory">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#2d677d] shadow-md' : ''}`}>
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">Greencanto</Link>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`text-white hover:text-[#d76a03] ${activeSection === item.id ? 'bg-[#d76a03] text-white' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </Button>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#2d677d] py-4"
            >
              <div className="container mx-auto px-4 flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`text-white hover:text-[#d76a03] ${activeSection === item.id ? 'bg-[#d76a03] text-white' : ''}`}
                    onClick={() => scrollTo(item.id)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Home section */}
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden snap-start">
          <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                  Rigeneriamo l'agricoltura Siciliana
                </h1>
                <motion.div
                  className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="grid gap-6 text-[#00264d] text-lg lg:text-xl">
                    <p>
                      Greencanto ha come obiettivo il recupero e la messa a produttività di terreni incolti ed abbandonati Siciliani, con il fine ultimo di realizzare progetti agri-voltaici serializzati e sostenibili.
                    </p>
                    <p>
                      Unisciti a noi per immaginare una Sicilia più verde. Insieme possiamo trasformare l'agricoltura e l'energia rinnovabile in un'opportunità di crescita sostenibile.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Button
                      variant="outline"
                      className="text-[#2d677d] border-[#2d677d] hover:bg-[#2d677d] hover:text-white text-lg px-8 py-3 w-full lg:w-auto transition-all duration-300"
                      onClick={() => scrollTo('mission')}
                    >
                      Scopri di Più <ChevronDown className="ml-2 animate-bounce" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <motion.div
                className="relative w-full h-[450px]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <EnricoLanding className="absolute top-0 right-0 w-full h-full object-contain" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission section */}
        <FadeInSection>
          <section id="mission" className="py-24 snap-start">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-center mb-12">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Zap className="w-16 h-16 text-[#d76a03] mr-6" />
                  </motion.div>
                  <h2 className="text-4xl lg:text-6xl font-bold text-[#2d677d]">La Nostra Missione</h2>
                </div>
                <motion.div
                  className="grid md:grid-cols-2 gap-8"
                  whileHover={{ boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}
                >
                  <Card className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-semibold text-[#2d677d] mb-4">Rigenerazione Sostenibile</h3>
                      <p className="text-[#00264d] text-lg leading-relaxed">
                        La nostra missione è chiara: rigenerare terreni abbandonati e farli rifiorire grazie a investimenti sostenibili. Offriamo agli utenti l'opportunità di acquistare quote di aziende agricole, promuovendo un'agricoltura innovativa e sostenibile.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-semibold text-[#2d677d] mb-4">Impatto Ambientale</h3>
                      <p className="text-[#00264d] text-lg leading-relaxed">
                        Parallelamente, sosteniamo progetti di riqualificazione ambientale, con un focus speciale sulla Sicilia. Il nostro obiettivo è creare un impatto positivo sia sull'economia locale che sull'ambiente, promuovendo una crescita sostenibile e responsabile.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Team section */}
        <FadeInSection>
          <section id="who" className="py-24 snap-start">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Users className="w-16 h-16 text-[#d76a03] mr-4" />
                    </motion.div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-[#2d677d]">Chi Siamo</h2>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                  {['Edoardo Lorenzo Cumitini', 'Giuseppe Marletta'].map((name, index) => (
                    <motion.div
                      key={name}
                      className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8"
                      whileHover={{ y: -10 }}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <div className="w-32 h-32 mx-auto mb-6 bg-gray-300 rounded-full overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=128&width=128"
                          alt={name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-[#2d677d] mb-4 text-center">{name}</h3>
                      <p className="text-[#00264d] text-lg text-center">
                        {index === 0 ? 
                          "PhD candidate in Social Sciences at University of Hamburg, con expertise in Geografia Economica. La sua visione e conoscenza guidano l'approccio innovativo di Greencanto nel connettere agricoltura sostenibile e energia rinnovabile." :
                          "Avvocato e agro-imprenditore. La sua esperienza legale e imprenditoriale nel settore agricolo è fondamentale per guidare Greencanto attraverso le complessità normative e operative dei progetti agrivoltaici."
                        }
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Join section */}
        <FadeInSection>
          <section id="join" className="py-24 snap-start">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Leaf className="w-16 h-16 text-[#d76a03] mr-4" />
                  </motion.div>
                  <h2 className="text-4xl lg:text-6xl font-bold text-[#2d677d]">Unisciti a Noi</h2>
                </div>
                <motion.div
                  className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="grid gap-6 text-[#00264d] text-lg">
                    <p>
                      Greencanto non è solo un'opportunità di investimento; è una comunità di persone che credono in un futuro più sostenibile. Con il supporto del nostro team esperto, ci impegniamo a trasformare terreni abbandonati in risorse produttive.
                    </p>
                    <p>
                      Offriamo un ritorno economico tangibile ai nostri investitori e un impatto positivo sull'ambiente. Unisciti a noi per essere parte di questa rivoluzione verde in Sicilia.
                    </p>
                  </div>
                  <div className="mt-8 text-center">
                    <Link href="/private" passHref>
                      <Button variant="outline" className="text-[#2d677d] border-[#2d677d] hover:bg-[#2d677d] hover:text-white text-lg px-8 py-3 w-full lg:w-auto transition-all duration-300">
                        Vai alla Pagina Privata
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Contact section */}
        <FadeInSection>
          <section id="contact" className="py-24 snap-start">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl lg:text-6xl font-bold text-[#2d677d] mb-6 text-center">Contattaci</h2>
                <motion.div
                  className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8"
                  whileHover={{ boxShadow: "0 0 20px rgba(0,0,0,0.1)" }}
                >
                  <form className="grid gap-6">
                    <Input type="text" placeholder="Nome" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d677d]" />
                    <Input type="email" placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d677d]" />
                    <Textarea placeholder="Messaggio" required className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-[#2d677d]" />
                    <Button type="submit" variant="outline" className="text-[#2d677d] border-[#2d677d] hover:bg-[#2d677d] hover:text-white text-lg px-8 py-3 transition-all duration-300">
                      Invia <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* FAQ section */}
        <FadeInSection>
          <section id="faq" className="py-24 snap-start">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl lg:text-6xl font-bold text-[#2d677d] mb-8 text-center">Domande Frequenti</h2>
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
                    <motion.div
                      key={index}
                      className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-lg p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        className="flex justify-between items-center w-full text-left font-bold text-[#2d677d] text-xl"
                        onClick={() => toggleFaq(index)}
                      >
                        {faq.question}
                        {openFaq === index ? <ChevronUp className="text-[#d76a03] w-6 h-6" /> : <ChevronDown className="text-[#d76a03] w-6 h-6" />}
                      </button>
                      <AnimatePresence>
                        {openFaq === index && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 text-[#2d677d] text-lg"
                          >
                            {faq.answer}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>
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