import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Home from './pages/Home';
import TravelPlannerPage from './pages/travel-planner/TravelMain';
import Step1 from './pages/travel-planner/destination/Step1';
import Step2 from './pages/travel-planner/destination/Step2';
import Step3 from './pages/travel-planner/destination/Step3';
import Step4 from './pages/travel-planner/destination/Step4';
import Step5 from './pages/travel-planner/destination/Step5';

import MyPage from './pages/mypage/MyPage';
import AttractionsPage from './pages/attractions/Attractions';
import CommunityPage from './pages/community/Community';
import WritePage from './pages/community/write/Page';
import CommunityPostPage from './pages/community/post/[id]/Page';

import LoginPage from './pages/login/Login';
import SignupPage from './pages/signup/Signup';
import AdminPage from './pages/admin/Page';

import FlightSearchPage from './pages/flight-search/Page';
import FlightSearchResultsPage from './pages/flight-search/results/Page.jsx';
import FlightDetailPage from './pages/flight-search/[id]/Page.jsx';
import FlightSearchContent from './components/flight-search/Flight-search-content';
import FlightSearchHero from './components/flight-search/Flight-search-hero';
import FlightDetailContent from './components/flight-search/Flight-detail-content';

import { PrivateRoute } from './components/PrivateRoute';
import { SettingsContent } from './modules/Settings-content';
import { ProfileEditContent } from './modules/Profile-edit-content.jsx';
import AttractionsContent from './modules/Attractions-content.jsx';
import  PlaceDetail  from './modules/Place-detail.jsx';
import Layout from "./Layout"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 상세페이지용 Wrapper 컴포넌트
function PlaceDetailWrapper() {
  const { placeId } = useParams();
  return <PlaceDetail placeId={placeId} />;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* 마이페이지/보안 페이지 */}
          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsContent />
              </PrivateRoute>
            }
          />
          <Route path="/profile-edit" element={<ProfileEditContent />} />

          {/* 여행 플래너 */}
          <Route path="/travel-planner" element={<TravelPlannerPage />} />
          <Route path="/travel-planner/:destination/step1" element={<Step1 />} />
          <Route path="/travel-planner/:destination/step2" element={<Step2 />} />
          <Route path="/travel-planner/:destination/step3" element={<Step3 />} />
          <Route path="/travel-planner/:destination/step4" element={<Step4 />} />
          <Route path="/travel-planner/:destination/step5" element={<Step5 />} />

          {/* 명소 */}
          <Route path="/attraction-content" element={<AttractionsPage />} />
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/place/:placeId" element={<PlaceDetail />} />
          </Route>

          {/* 커뮤니티 */}
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/write" element={<WritePage />} />
          <Route path="/community/post/:id" element={<CommunityPostPage />} />

          {/* 항공 검색 */}
          <Route path="/flight-search" element={<FlightSearchPage />} />
          <Route path="/flight-search/results" element={<FlightSearchResultsPage />} />
          <Route path="/flight-detail/:id" element={<FlightDetailPage />} />
          <Route path="/flight-search/content" element={<FlightSearchContent />} />
          <Route path="/flight-search/hero" element={<FlightSearchHero />} />

          {/* 로그인/회원가입 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 관리자 */}
          <Route path="/admin" element={<AdminPage />} />

          {/* 테스트용 AttractionsContent 직접 보기 */}
          <Route path="/attractions" element={<AttractionsContent />} />

          {/* 404 페이지 */}
          <Route path="/not-found" element={<div>404 Not Found</div>} />
        </Routes>

        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
