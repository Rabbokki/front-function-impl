import { Routes, Route } from "react-router-dom"
import { NavBar } from "./components/Nav-bar"
import Home from "./pages/Home" // Home.jsx 파일 경로 확인 필수
import { CommunityContent } from "./components/community/Community-content"
import TravelPlannerPage from "./pages/travel-planner/TravelMain"
import CommunityPage  from "../src/pages/community/Community"
import LoginPage  from "../src/pages/login/Login"
import SignupPage  from "../src/pages/signup/Signup"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={
          <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold text-[#1e3a8a]">커뮤니티</h1>
            <CommunityContent />
          </div>
        } />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/travel-planner" element={<TravelPlannerPage />} />
      </Routes>
    </>
  )
}

export default App;