import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../../../components/Nav-bar"; 
import { useEffect } from "react";
import AttractionSelection from "../../../components/travel-planner/Attraction-selection";
import { StepIndicator } from "../../../components/travel-planner/Step-indicator";

const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore", "jeju"];

export default function Step2Page() {
  const { destination } = useParams();
  const navigate = useNavigate();
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");

  useEffect(() => {
    if (!supportedCities.includes(destination) || !startDate || !endDate) {
      console.error("Invalid destination or dates:", { destination, startDate, endDate });
      navigate(`/travel-planner/${destination || "osaka"}/step1`);
    }
  }, [destination, startDate, endDate, navigate]);

  if (!supportedCities.includes(destination)) {
    return <div>404 - 지원하지 않는 도시입니다.</div>;
  }

  if (!startDate || !endDate) {
    return <div>여행 날짜가 선택되지 않았습니다. Step 1로 돌아가세요.</div>;
  }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={2} destination={destination} />
        <AttractionSelection destination={destination} startDate={startDate} endDate={endDate} />
      </div>
    </main>
  );
}