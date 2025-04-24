import { Routes, Route } from "react-router-dom"
import CommunityPage  from "../src/pages/community/Community"
import LoginPage  from "../src/pages/login/Login"
import SignupPage  from "../src/pages/signup/Signup"

function App() {
  return (
    <main className="min-h-screen bg-[#e8f4fc]">
      <Routes>
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </main>
  )
}

export default App;