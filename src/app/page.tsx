import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronDown, Zap, Leaf, Users } from "lucide-react"
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Navigation */}
      <nav className="bg-[#2d677d] text-white p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Greencanto</h1>
          <div className="space-x-4">
            <Link href="#mission" passHref>
              <Button variant="ghost">La Nostra Missione</Button>
            </Link>
            <Link href="#who" passHref>
              <Button variant="ghost">Chi Siamo</Button>
            </Link>
            <Link href="#join" passHref>
              <Button variant="ghost">Unisciti a Noi</Button>
            </Link>
            <Link href="#contact" passHref>
              <Button variant="ghost">Contattaci</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content sections */}
      <main className="space-y-24">
        {/* Home section */}
        <section id="home" className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center relative" style={{backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d677d] to-transparent opacity-80"></div>
          <div className="relative z-10 text-white max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 leading-tight">Rigeneriamo l'agricoltura Siciliana</h1>
            <p className="text-xl mb-8">
              Greencanto ha come obiettivo il recupero e la messa a produttività di terreni incolti ed abbandonati Siciliani, con il fine ultimo di realizzare progetti agri-voltaici serializzati e sostenibili. Unisciti a noi per immaginare una Sicilia più verde.
            </p>
            <Link href="#mission" passHref>
              <Button className="bg-[#d76a03] text-white hover:bg-[#f27d0c] text-lg px-8 py-3">
                Scopri di Più <ChevronDown className="ml-2" />
              </Button>
            </Link>
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