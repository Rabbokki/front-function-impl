import { NavBar } from "../../../components/Nav-bar";
import { ItineraryGeneration } from "../../../components/travel-planner/Itinerary-generation";
import  StepIndicator  from "../../../components/travel-planner/Step-indicator";
import { notFound } from "next/navigation";

// 지원하는 도시 목록에 새로운 도시들 추가
const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step5Page({ params, searchParams }) {
  // 지원하지 않는 도시인 경우 404 페이지로 리다이렉트
  if (!supportedCities.includes(params.destination)) {
    notFound();
  }

  // AI 모드 여부 확인
  const isAiMode = searchParams.ai === "true";

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={5} destination={params.destination} />
        <ItineraryGeneration destination={params.destination} isAiMode={isAiMode} />
      </div>
    </main>
  );
}
