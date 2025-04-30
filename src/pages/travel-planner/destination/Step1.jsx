import React from 'react';
import {NavBar} from "../../../components/Nav-bar";
import {DestinationInfo} from "../../../components/travel-planner/Destination-info";
import StepIndicator from "../../../components/travel-planner/Step-indicator";
import { useParams, Navigate } from 'react-router-dom';
import {Button} from "../../../modules/Button";

const supportedCities = [
  'osaka',
  'tokyo',
  'fukuoka',
  'paris',
  'rome',
  'venice',
  'bangkok',
  'singapore',
];

const handleFlightSearch = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/flights/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: "ICN", // 출발 공항 코드 (예: 인천)
        destination: "JFK", // 도착 공항 코드 (예: 뉴욕)
        departureDate: "2025-07-01", // 선택된 날짜
      }),
    });

    const result = await response.json();
    console.log("항공편 리스트:", result.flights);
    // 이 데이터를 리스트 형태로 화면에 렌더링하면 됨
  } catch (err) {
    console.error("항공편 검색 실패:", err);
  }
};

function Step1() {
  const { destination } = useParams();

  if (!supportedCities.includes(destination)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={1} destination={destination} />
        <DestinationInfo destination={destination} />
        <Button onClick={handleFlightSearch} className="bg-traveling-purple text-white mt-4">
            항공편 검색
        </Button>
      </div>
    </main>
  );
}

export default Step1;
