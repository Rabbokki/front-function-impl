import { NavBar } from "../../../components/Nav-bar";
import { useNavigate, useParams } from "react-router-dom";
import AccommodationSelection from "../../../components/travel-planner/Accommodation-selection";
import StepIndicator from "../../../components/travel-planner/Step-indicator";


// 지원하는 도시 목록에 새로운 도시들 추가
const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

export default function Step3Page() {
  const navigate = useNavigate();
  const { destination } = useParams();

  useEffect(() => {
    if (!supportedCities.includes(destination)) {
      navigate("/404"); // or any route you want for "Not Found"
    }
  }, [destination, navigate]);

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-4">
        <StepIndicator currentStep={3} destination={destination} />
        <div className="mt-3">
          <AccommodationSelection destination={destination} />
        </div>
      </div>
    </main>
  );
}
