import { NavBar } from '../../components/Nav-barr';
import { AccommodationSearchContent } from '../../modules/Accommodation-search-content';

export default function AccommodationSearchPage() {
  return (
    <main className="min-h-screen bg-traveling-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-traveling-brown">
          숙소 검색
        </h1>
        <AccommodationSearchContent />
      </div>
    </main>
  );
}
