import { NavBar } from "../components/Nav-bar"
import { Hero } from "../components/home/Hero"
import { PopularDestinations } from "../components/home/Popular-destinations"

export default function Home() {
  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <Hero />
      <PopularDestinations />
    </main>
  )
}
