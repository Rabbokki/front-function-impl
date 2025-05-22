import { NavBar } from '../../../components/Nav-bar';
import { PrivacyContent } from '../../modules/Privacy-content';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <PrivacyContent />
      </div>
    </main>
  );
}
