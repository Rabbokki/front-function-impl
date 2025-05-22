import { useParams, useLocation } from 'react-router-dom';
import { NavBar } from "../../../components/Nav-bar";
import ItineraryGeneration from "../../../components/travel-planner/Itinerary-generation";
import { StepIndicator } from "../../../components/travel-planner/Step-indicator";
import { getFromLocalStorage } from "../../../utils";
const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step5Page() {
  const { destination } = useParams();
  const location = useLocation();

  // localStorage에서 travelPlan 가져오기
  const travelPlan = getFromLocalStorage("travelPlan") || {};
  let { startDate, endDate, plannerType = "manual" } = travelPlan;

  // location.state에서 복구 시도
  const { destination: stateDestination, startDate: stateStartDate, endDate: stateEndDate } = location.state || {};

  // destination 유효성 검사
  const finalDestination = destination || stateDestination || travelPlan.destination;
  if (!finalDestination || !supportedCities.includes(finalDestination.toLowerCase())) {
    console.error("Invalid or missing destination:", { destination, stateDestination, travelPlan });
    return <div>404 - 지원하지 않는 도시입니다.</div>;
  }

  // startDate, endDate 복구
  startDate = startDate || stateStartDate || localStorage.getItem("startDate");
  endDate = endDate || stateEndDate || localStorage.getItem("endDate");

  if (!startDate || !endDate) {
    console.error("Missing startDate or endDate:", { startDate, endDate, travelPlan, locationState: location.state });
    return <div>오류: 여행 날짜가 설정되지 않았습니다. Step 1부터 다시 시작해 주세요.</div>;
  }

  console.log("🧪 Step5 (localStorage) destination:", finalDestination, "startDate:", startDate, "endDate:", endDate, "plannerType:", plannerType);

  const isAiMode = plannerType === "ai";

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={5} destination={finalDestination} />
        <ItineraryGeneration
          destination={finalDestination}
          isAiMode={isAiMode}
          startDate={startDate}
          endDate={endDate}
          plannerType={plannerType}
        />
      </div>
    </main>
  );
}