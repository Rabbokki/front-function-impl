import { useParams, useSearchParams,useLocation } from 'react-router-dom';
import { NavBar } from "../../../components/Nav-bar";
import  ItineraryGeneration  from "../../../components/travel-planner/Itinerary-generation";
import { StepIndicator } from "../../../components/travel-planner/Step-indicator";


const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step5Page() {
  const { destination } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { startDate, endDate } = location.state || {};
  console.log("🧪 Step5 startDate:", startDate, "endDate:", endDate);

  if (!supportedCities.includes(destination)) {
    return <div>404 - 지원하지 않는 도시입니다.</div>;
  }

  const isAiMode = searchParams.get('ai') === "true";

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={5} destination={destination} />
        <ItineraryGeneration 
        destination={destination} 
        isAiMode={isAiMode}
        startDate={startDate}
        endDate={endDate}
         />
      </div>
    </main>
  );
}
