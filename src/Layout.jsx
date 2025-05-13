import { Outlet } from 'react-router-dom';
import { NavBar } from './components/Nav-bar';

function Layout() {
  return (
    <>
      {/* 헤더는 흰색 배경 */}
      <div className="bg-white">
        <NavBar />
      </div>

      {/* 나머지 본문은 연보라색 배경 */}
      <main className="bg-[#f8f9ff] pt-4 pb-12 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
export default Layout;
