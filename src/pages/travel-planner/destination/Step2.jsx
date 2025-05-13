import { useParams, useLocation } from 'react-router-dom';
import { NavBar } from "../../../components/Nav-bar"; 
import  AttractionSelection  from "../../../components/travel-planner/Attraction-selection";
import { StepIndicator } from "../../../components/travel-planner/Step-indicator";


const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step2Page() {
  const { destination } = useParams();
  const location = useLocation();
  const { startDate, endDate } = location.state || {};


  
console.log(" Step2Page 렌더링됨");
console.log(" 받은 날짜:", startDate, endDate);


  if (!supportedCities.includes(destination)) {
    return <div>404 - 지원하지 않는 도시입니다.</div>;
  }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={2} destination={destination} />
        <AttractionSelection destination={destination} startDate={startDate}
          endDate={endDate}/>
      </div>
    </main>
  );
}
