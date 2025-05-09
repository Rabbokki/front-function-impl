import { Outlet } from 'react-router-dom';
import { NavBar } from './components/Nav-bar';

function Layout() {
  return (
    <>
      <NavBar />
      <main className="px-4 md:px-10 pt-4 pb-12">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
