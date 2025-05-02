import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { NavBar } from "../../../components/Nav-bar";
import { ItineraryGeneration } from "../../../components/travel-planner/Itinerary-generation";
import StepIndicator from "../../../components/travel-planner/Step-indicator";


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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Step5Page() {
  const navigate = useNavigate();
  const { destination } = useParams();
  const query = useQuery();

  const isAiMode = query.get("ai") === "true";

  useEffect(() => {
    if (!supportedCities.includes(destination)) {
      navigate("/404"); // 404 리다이렉션
    }
  }, [destination, navigate]);

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={5} destination={destination} />
        <ItineraryGeneration destination={destination} isAiMode={isAiMode} />
      </div>
    </main>
  );
}
