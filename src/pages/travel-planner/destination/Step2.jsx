import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../../components/Nav-bar";
import { AttractionSelection } from "../../../components/travel-planner/Attraction-selection";
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

export default function Step2Page() {
  const navigate = useNavigate();
  const { destination } = useParams();

  useEffect(() => {
    if (!supportedCities.includes(destination)) {
      navigate("/404"); // redirect to your custom 404 page
    }
  }, [destination, navigate]);

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={2} destination={destination} />
        <AttractionSelection destination={destination} />
      </div>
    </main>
  );
}
