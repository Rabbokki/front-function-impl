import { useParams, useLocation } from 'react-router-dom';
import { NavBar } from "../../../components/Nav-bar"; 
import AccommodationSelection from "../../../components/travel-planner/Accommodation-selection";
import { StepIndicator } from "../../../components/travel-planner/Step-indicator";


const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step3Page() {
  const { destination } = useParams();
  const location = useLocation();              // state에서 날짜 받기
  const startDate = localStorage.startDate;
  const endDate = localStorage.endDate;
    // 날짜 정보 추출 

  if (!supportedCities.includes(destination)) {
    return <div>404 - 지원하지 않는 도시입니다.</div>;
  }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-4">
        <StepIndicator currentStep={3} destination={destination} />
        <div className="mt-3">
          <AccommodationSelection 
          destination={destination} 
          startDate={startDate}
          endDate={endDate}/>
        </div>
      </div>
    </main>
  );
}