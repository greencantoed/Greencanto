import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronDown, Zap, Leaf, Users } from "lucide-react"
import Image from 'next/image'
import EnricoLanding from '@/components/EnricoLanding'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d677d] to-[#f4f4f4]">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Home section */}
        <section id="home" className="min-h-screen flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                Rigeneriamo l'agricoltura Siciliana
              </h1>
              <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8">
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
                    <Button variant="outline" className="text-[#2d677d] border-[#2d677d] hover:bg-[#2d677d] hover:text-white text-lg px-8 py-3 w-full lg:w-auto">
                      Scopri di Più <ChevronDown className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <EnricoLanding width={800} height={800} className="max-w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Mission section */}
        <section id="mission" className="py-24">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-12 h-12 text-[#d76a03] mr-4" />
              <h2 className="text-3xl lg:text-5xl font-bold text-[#2d677d]">La Nostra Missione</h2>
            </div>
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8">
              <div className="grid gap-6 text-[#00264d] text-lg">
                <p>
                  La nostra missione è chiara: rigenerare terreni abbandonati e farli rifiorire grazie a investimenti sostenibili. Offriamo agli utenti l'opportunità di acquistare quote di aziende agricole, promuovendo un'agricoltura innovativa e sostenibile.
                </p>
                <p>
                  Parallelamente, sosteniamo progetti di riqualificazione ambientale, con un focus speciale sulla Sicilia. Il nostro obiettivo è creare un impatto positivo sia sull'economia locale che sull'ambiente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section id="team" className="py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-[#d76a03] mr-4" />
                <h2 className="text-3xl lg:text-5xl font-bold text-[#2d677d]">Il Nostro Team</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gray-300 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Edoardo Lorenzo Cumitini"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#2d677d] mb-4 text-center">Edoardo Lorenzo Cumitini</h3>
                <p className="text-[#00264d] text-lg text-center">
                  PhD candidate in Social Sciences at University of Hamburg, con expertise in Geografia Economica. La sua visione e conoscenza guidano l'approccio innovativo di Greencanto nel connettere agricoltura sostenibile e energia rinnovabile.
                </p>
              </div>
              <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gray-300 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Giuseppe Marletta"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#2d677d] mb-4 text-center">Giuseppe Marletta</h3>
                <p className="text-[#00264d] text-lg text-center">
                  Avvocato e agro-imprenditore. La sua esperienza legale e imprenditoriale nel settore agricolo è fondamentale per guidare Greencanto attraverso le complessità normative e operative dei progetti agrivoltaici.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join section */}
        <section id="join" className="py-24">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="w-12 h-12 text-[#d76a03] mr-4" />
              <h2 className="text-3xl lg:text-5xl font-bold text-[#2d677d]">Unisciti a Noi</h2>
            </div>
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8">
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
                  <Button variant="outline" className="text-[#2d677d] border-[#2d677d] hover:bg-[#2d677d] hover:text-white text-lg px-8 py-3 w-full lg:w-auto">
                    Vai alla Pagina Privata
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#2d677d] mb-6 text-center">Contattaci</h2>
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8">
              <form className="grid gap-6">
                <input type="text" placeholder="Nome" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d677d]" />
                <input type="email" placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d677d]" />
                <textarea placeholder="Messaggio" required className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-[#2d677d]"></textarea>
                <Button type="submit" variant="outline" className="text-[#2d677d] border-[#2d677d] hover:bg-[#2d677d] hover:text-white text-lg px-8 py-3">
                  Invia
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}