import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function NavBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken') || !!sessionStorage.getItem('accessToken')
  );

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다!');
    navigate('/');
  };

  useEffect(() => {
    const checkLogin = () => {
      const token =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };

    checkLogin();
  }, []);

  return (
    <header className="w-full bg-traveling-bg py-4 ">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <svg viewBox="0 0 40 40" className="h-full w-full">
              {/* <path
                d="M10 30 L20 10 L30 30 Z"
                fill="#8ca896"
              /> */}
            </svg>
          </div>
          <span className="text-2xl font-bold text-traveling-text">트래블링</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link to="/flight-search" className="text-lg font-medium text-traveling-text hover:opacity-70">항공권</Link>
            </li>
            <li>
              <Link to="/travel-planner" className="text-lg font-medium text-traveling-text hover:opacity-70">여행만들기</Link>
            </li>
            <li>
              <Link to="/attraction-content" className="text-lg font-medium text-traveling-text hover:opacity-70">추천 명소</Link>
            </li>
            <li>
              <Link to="/community" className="text-lg font-medium text-traveling-text hover:opacity-70">커뮤니티</Link>
            </li>
            <li>
              <Link to="/mypage" className="text-lg font-medium text-traveling-text hover:opacity-70">마이페이지</Link>
            </li>

            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="text-lg font-medium text-traveling-text hover:opacity-70">로그아웃</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-lg font-medium text-traveling-text hover:opacity-70">로그인</Link>
                </li>
                <li>
                  <Link to="/signup" className="text-lg font-medium text-traveling-text hover:opacity-70">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}