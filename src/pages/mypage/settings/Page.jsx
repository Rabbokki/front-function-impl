import { NavBar } from '../../../components/Nav-bar';
import { SettingsContent } from '../../../modules/Settings-content';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#e8f4fc]">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-[#1e3a8a]">계정 설정</h1>
        <SettingsContent />
      </div>
    </main>
  );
}
