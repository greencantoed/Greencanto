'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronDown, Zap, Leaf, Users, Send, Menu } from "lucide-react"
import Image from 'next/image'
import EnricoLanding from '@/components/EnricoLanding'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const FadeInSection = ({ children }) => {
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

const NavLink = ({ href, children }) => (
  <Link href={href} className="text-white hover:text-[#d76a03] transition-colors duration-200">
    {children}
  </Link>
)

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#2d677d] shadow-md' : ''}`}>
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">Greencanto</Link>
          <div className="hidden md:flex space-x-6">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#mission">Mission</NavLink>
            <NavLink href="#team">Team</NavLink>
            <NavLink href="#join">Join</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <NavLink href="/private">Private</NavLink>
          </div>
          <Button
            variant="ghost"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#2d677d] py-4"
            >
              <div className="container mx-auto px-4 flex flex-col space-y-4">
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#mission">Mission</NavLink>
                <NavLink href="#team">Team</NavLink>
                <NavLink href="#join">Join</NavLink>
                <NavLink href="#contact">Contact</NavLink>
                <NavLink href="/private">Private</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="bg-gradient-to-b from-[#2d677d] to-[#f4f4f4]">
        {/* Home section */}
        <section id="home" className="h-screen flex items-center relative overflow-hidden snap-start">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="z-10"
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
                  <Link href="#mission" passHref>
                    <Button variant="outline" className="text-[#2d677d] border-[#2d677d] hover:bg-[#2d677d] hover:text-white text-lg px-8 py-3 w-full lg:w-auto transition-all duration-300">
                      Scopri di Più <ChevronDown className="ml-2 animate-bounce" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 hidden lg:block"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <EnricoLanding width={1000} height={1000} className="max-w-none h-auto" />
            </motion.div>
          </div>
        </section>

        {/* Mission section */}
        <FadeInSection>
          <section id="mission" className="min-h-screen py-24 snap-start">
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
          <section id="team" className="min-h-screen py-24 snap-start">
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
                    <h2 className="text-4xl lg:text-6xl font-bold text-[#2d677d]">Il Nostro Team</h2>
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
          <section id="join" className="min-h-screen py-24 snap-start">
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
          <section id="contact" className="min-h-screen py-24 snap-start">
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
      </main>
    </div>
  )
}