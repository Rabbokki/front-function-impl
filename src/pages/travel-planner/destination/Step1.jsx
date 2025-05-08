import { useParams } from 'react-router-dom';
import { NavBar } from "../../../components/Nav-bar";
import { DestinationInfo } from "../../../components/travel-planner/Destination-info";
import StepIndicator from "../../../components/travel-planner/Step-indicator";

// 지원하는 도시 목록에 새로운 도시들 추가
const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step1Page() {
  const { destination } = useParams();

  // 지원하지 않는 도시인 경우 404 처리
  if (!supportedCities.includes(destination)) {
    return <div>404 - 지원하지 않는 도시입니다.</div>;
  }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={1} destination={destination} />
        <DestinationInfo destination={destination} />
      </div>
    </main>
  );
}
