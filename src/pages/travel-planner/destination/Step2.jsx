import { NavBar } from "../../../components/Nav-bar";
import { AttractionSelection } from "../../../components/travel-planner/Attraction-selection";
import StepIndicator  from "../../../components/travel-planner/Step-indicator";


// 지원하는 도시 목록에 새로운 도시들 추가
const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step2Page({ params }) {
  // 지원하지 않는 도시인 경우 404 페이지로 리다이렉트
  // if (!supportedCities.includes(params.destination)) {
  //   notFound();
  // }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={2} destination={params.destination} />
        <AttractionSelection destination={params.destination} />
      </div>
    </main>
  );
}
