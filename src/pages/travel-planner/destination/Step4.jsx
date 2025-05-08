import { useParams } from 'react-router-dom';

import { NavBar } from "../../../components/Nav-bar";
import TransportationSelection from "../../../components/travel-planner/Transportation-selection";
import { StepIndicator } from "../../../components/travel-planner/Step-indicator";


const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step4Page() {
  const { destination } = useParams();

  if (!supportedCities.includes(destination)) {
    return <div>404 - 지원하지 않는 도시입니다.</div>;
  }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={4} destination={destination} />
        <TransportationSelection destination={destination} />
      </div>
    </main>
  );
}