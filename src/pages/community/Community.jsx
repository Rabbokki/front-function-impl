import { NavBar } from '../../components/Nav-bar';
import { CommunityContent } from '../../src/components/Community-content';

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#e8f4fc]">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-[#1e3a8a]">커뮤니티</h1>
        <CommunityContent />
      </div>
    </main>
  );
}
