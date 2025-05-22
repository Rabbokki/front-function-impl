import { AdminDashboard } from '../../modules/Admin-dashboard';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-traveling-text">
          관리자 대시보드
        </h1>
        <AdminDashboard />
      </div>
    </main>
  );
}
