import { useParams, Navigate } from "react-router-dom";
import { NavBar } from "../../../components/Nav-bar";
import AccommodationSelection  from "../../../components/travel-planner/Accommodation-selection";
import StepIndicator  from "../../../components/travel-planner/Step-indicator";


// 지원하는 도시 목록에 새로운 도시들 추가
const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step3Page({ params }) {
  // 지원하지 않는 도시인 경우 404 페이지로 리다이렉트
  if (!supportedCities.includes(params.destination)) {
    return <Navigate to="/404" replace />;
  }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-4">
        <StepIndicator currentStep={3} destination={params.destination} />
        <div className="mt-3">
          <AccommodationSelection destination={params.destination} />
        </div>
      </div>
    </main>
  );
}
