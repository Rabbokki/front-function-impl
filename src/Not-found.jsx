import Link from 'next/link';
import { NavBar } from './components/Nav-bar';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-traveling-background">
      <NavBar />
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-8">
        <div className="mb-8 h-64 w-64">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* 슬픈 비행기 */}
            <path
              d="M100,100 L70,70 L40,90 L30,90 L40,100 L30,110 L40,110 L70,130 L100,100"
              fill="#8ca896"
              stroke="#2d3436"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="80" cy="90" r="5" fill="#2d3436" />
            <circle cx="80" cy="110" r="5" fill="#2d3436" />
            <path
              d="M60,100 Q70,110 80,100"
              stroke="#2d3436"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-traveling-text">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mb-8 text-center text-lg text-traveling-text/70">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link
          href="/"
          className="rounded-full bg-traveling-green px-6 py-3 font-medium text-white hover:bg-traveling-green/90"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
