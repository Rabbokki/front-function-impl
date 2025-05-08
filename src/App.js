import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import FlightSearchPage from "./pages/flight-search/Page";
import FlightDetailContent from "./components/flight-search/Flight-detail-content";
import FlightSearchContent from "./components/flight-search/Flight-search-content";
import FlightSearchHero from "./components/flight-search/Flight-search-hero";
import FlightSearchResultsPage from "./pages/flight-search/results/Page.jsx";
import FlightDetailPage from "./pages/flight-search/[id]/Page.jsx";
import {AIPlannerPage} from "./pages/travel-planner/destination/Ai-planner";
import AIPlannerContent from "./components/travel-planner/Ai-planner-content";
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route path="/flight-search" element={<FlightSearchPage />} />
          <Route path="/flight-detail/:id" element={<FlightDetailPage />} />
          <Route path="/flight-search/content" element={<FlightSearchContent />} />
          <Route path="/flight-search/hero" element={<FlightSearchHero />} />
          <Route path="/flight-search/results" element={<FlightSearchResultsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/attraction-content" element={<AttractionsPage />} />
          <Route path="/travel-planner" element={<TravelPlannerPage />} />
          <Route path="/ai-planner" element={<AIPlannerContent />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/community/write" element={<WritePage />} />
          <Route path="/community/post/:id" element={<CommunityPostPage />} />
          <Route
            path="/travel-planner/:destination/step1"
            element={<Step1 />}
          />
          <Route
            path="/travel-planner/:destination/step2"
            element={<Step2 />}
          />
          <Route
            path="/travel-planner/:destination/step3"
            element={<Step3 />}
          />
          <Route
            path="/travel-planner/:destination/step4"
            element={<Step4 />}
          />
          <Route
            path="/travel-planner/:destination/step5"
            element={<Step5 />}
          />
          <Route path="/not-found" element={<div>404 Not Found</div>} />{' '}
          {/* 임시 404 페이지 */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
