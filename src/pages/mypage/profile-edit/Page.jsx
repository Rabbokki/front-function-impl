import { NavBar } from '../../../components/Nav-bar';
import { ProfileEditContent } from '../../../modules/Profile-edit-content';

export default function ProfileEditPage() {
  return (
    <main className="min-h-screen bg-[#e8f4fc]">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-[#1e3a8a]">프로필 수정</h1>
        <ProfileEditContent />
      </div>
    </main>
  );
}
