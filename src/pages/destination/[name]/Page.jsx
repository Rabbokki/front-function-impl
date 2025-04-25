import { NavBar } from "../../../components/Nav-bar";
import { DestinationContent } from "../../../modules/Destination-content";
import { notFound } from "next/navigation";

// 지원하는 도시 목록
const supportedCities = ["도쿄", "파리", "로마", "방콕"];

export default function DestinationPage({ params }) {
  const decodedName = decodeURIComponent(params.name);

  // 지원하지 않는 도시인 경우 404 페이지로 리다이렉트
  if (!supportedCities.includes(decodedName)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#e8f4fc]">
      <NavBar />
      <DestinationContent cityName={decodedName} />
    </main>
  );
}
