import { NavBar } from "../../../../components/Nav-bar";
import { AIPlannerContent } from "../components/travel-planner/ai-planner-content";

export default function AIPlannerPage(props) {
  const destination = props?.params?.destination || "";

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <AIPlannerContent destination={destination} />
      </div>
    </main>
  );
}
