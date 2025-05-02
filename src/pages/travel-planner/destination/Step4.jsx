import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../../components/Nav-bar";
import TransportationSelection from "../../../components/travel-planner/Transportation-selection";
import  StepIndicator  from "../../../components/travel-planner/Step-indicator";

// 지원하는 도시 목록
const supportedCities = [
  "osaka",
  "tokyo",
  "fukuoka",
  "paris",
  "rome",
  "venice",
  "bangkok",
  "singapore",
];

export default function Step4Page() {
  const navigate = useNavigate();
  const { destination } = useParams();

  useEffect(() => {
    if (!supportedCities.includes(destination)) {
      navigate("/404"); // 404 리다이렉션
    }
  }, [destination, navigate]);

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
