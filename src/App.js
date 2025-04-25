import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Home.jsx 파일 경로 확인 필수
import TravelPlannerPage from './pages/travel-planner/TravelMain';
import MyPage from './pages/mypage/MyPage';
import CommunityPage from '../src/pages/community/Community';
import LoginPage from '../src/pages/login/Login';
import SignupPage from '../src/pages/signup/Signup';
import AdminPage from '../src/pages/admin/Page';
import WritePage from '../src/pages/community/write/Page'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/travel-planner" element={<TravelPlannerPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/community/write" element={<WritePage />} />
      </Routes>
    </>
  );
}

export default App;
