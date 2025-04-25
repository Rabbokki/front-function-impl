import { NavBar } from '../../components/Nav-bar';
import { FlightSearchContent } from '../../modules/Flight-search-content';

export default function FlightSearchPage() {
  return (
    <main className="min-h-screen bg-traveling-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-traveling-text">
          항공권 검색 및 예약
        </h1>
        <FlightSearchContent />
      </div>
    </main>
  );
}
