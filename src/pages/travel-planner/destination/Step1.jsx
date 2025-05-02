import { NavBar } from "@/components/nav-bar";
import { DestinationInfo } from "@/components/travel-planner/destination-info";
import { StepIndicator } from "@/components/travel-planner/step-indicator";
import { notFound } from "next/navigation";

// 지원하는 도시 목록에 새로운 도시들 추가
const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step1Page({ params }) {
  // 지원하지 않는 도시인 경우 404 페이지로 리다이렉트
  if (!supportedCities.includes(params.destination)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={1} destination={params.destination} />
        <DestinationInfo destination={params.destination} />
      </div>
    </main>
  );
}
