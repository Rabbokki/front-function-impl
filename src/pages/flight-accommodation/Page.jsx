import { NavBar } from '../../components/Nav-bar';
import { FlightAccommodationContent } from '../../modules/Flight-accommodation-content';

export default function FlightAccommodationPage() {
  return (
    <main className="min-h-screen bg-[#e8f4fc]">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-[#1e3a8a]">항공/숙소</h1>
        <FlightAccommodationContent />
      </div>
    </main>
  );
}
