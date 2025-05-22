import { NavBar } from "../components/Nav-bar"
import { Hero } from "../components/home/Hero"
import { PopularDestinations } from "../components/home/Popular-destinations"

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#cceeff] 
                      via-[#fce6fc] 
                      via-30% 
                      via-[#ffe4e1] 
                      via-60% 
                      via-[#bea9de]
                      to-[#2e4482] min-h-screen">
      <NavBar />
      <Hero />
      <div className="w-full max-w-7xl">
        {/* <PopularDestinations /> */}
      </div>
    </div>
  );
}

// ㅎㅇ