import { Link } from "react-router-dom"
import {TravelPlannerPage} from "../pages/travel-planner/TravelMain"

export function NavBar() {
  return (
    <header className="w-full bg-traveling-bg py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <svg viewBox="0 0 40 40" className="h-full w-full">
              <path d="..." fill="#8ca896" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-traveling-text">트래블링</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link to="/travel-planner" className="text-lg font-medium text-traveling-text hover:opacity-70">여행만들기</Link></li>
            <li><Link to="/community" className="text-lg font-medium text-traveling-text hover:opacity-70">커뮤니티</Link></li>
            <li><Link to="/mypage" className="text-lg font-medium text-traveling-text hover:opacity-70">마이페이지</Link></li>
            <li><Link to="/login" className="text-lg font-medium text-traveling-text hover:opacity-70">로그인</Link></li>
            <li><Link to="/signup" className="text-lg font-medium text-traveling-text hover:opacity-70">회원가입</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}