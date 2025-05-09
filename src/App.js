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
import ProfileEditPage from './pages/mypage/profile-edit/Page';
import FlightSearchPage from "./pages/flight-search/Page";
import FlightDetailPage from "./pages/flight-search/[id]/Page.jsx";
import FlightSearchContent from "./components/flight-search/Flight-search-content";
import FlightSearchHero from "./components/flight-search/Flight-search-hero";
import FlightSearchResultsPage from "./pages/flight-search/results/Page.jsx";
import AIPlannerPage from "./pages/travel-planner/destination/AIPlannerPage";
import { AIPlannerContent } from "./components/travel-planner/AIPlannerContent";
import { PrivateRoute } from './components/PrivateRoute';
import { SettingsContent } from './modules/Settings-content';
import AttractionsContent from './modules/Attractions-content.jsx';
import PlaceDetail from './modules/Place-detail.jsx';
import Layout from "./Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

          <Route path="/attraction-content" element={<AttractionsPage />} />
          <Route path="/flight-search" element={<FlightSearchPage />} />
          <Route path="/flight-detail/:id" element={<FlightDetailPage />} />
          <Route path="/flight-search/content" element={<FlightSearchContent />} />
          <Route path="/flight-search/hero" element={<FlightSearchHero />} />
          <Route path="/flight-search/results" element={<FlightSearchResultsPage />} />

          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/write" element={<WritePage />} />
          <Route path="/community/write/:postId" element={<WritePage />} />
          <Route path="/community/post/:id" element={<CommunityPostPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/travel-planner" element={<TravelPlannerPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route path="/travel-planner/:destination/step1" element={<Step1 />} />
          <Route path="/travel-planner/:destination/step2" element={<Step2 />} />
          <Route path="/travel-planner/:destination/step3" element={<Step3 />} />
          <Route path="/travel-planner/:destination/step4" element={<Step4 />} />
          <Route path="/travel-planner/:destination/step5" element={<Step5 />} />
          <Route path="/ai-planner/:destination" element={<AIPlannerPage />} />

          <Route path="/attractions" element={<AttractionsContent />} />
          <Route path="/place/:placeId" element={<PlaceDetailWrapper />} />

          <Route path="/not-found" element={<div>404 Not Found</div>} />

        </Routes>

        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
