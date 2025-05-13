import { useParams, useSearchParams } from 'react-router-dom';
import { NavBar } from "../../../components/Nav-bar";
import ItineraryGeneration from "../../../components/travel-planner/Itinerary-generation";
import { StepIndicator } from "../../../components/travel-planner/Step-indicator";

const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step5Page() {
  const { destination } = useParams();
  const [searchParams] = useSearchParams();

  // ✅ 날짜를 localStorage에서 읽어오기
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");

  console.log("🧪 Step5 (localStorage) startDate:", startDate, "endDate:", endDate);

  if (!supportedCities.includes(destination)) {
    return <div>404 - 지원하지 않는 도시입니다.</div>;
  }

  const isAiMode = searchParams.get("ai") === "true";

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
