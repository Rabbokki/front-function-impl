import React, { useState } from 'react';
import { NavBar } from "../../../components/Nav-bar";
import { DestinationInfo } from "../../../components/travel-planner/Destination-info";
import StepIndicator from "../../../components/travel-planner/Step-indicator";
import { useParams, Navigate } from 'react-router-dom';
import { Button } from "../../../modules/Button";


const supportedCities = [
  'osaka', 'tokyo', 'fukuoka', 'paris', 'rome', 'venice', 'bangkok', 'singapore',
];

function Step1() {
  const { destination } = useParams();
  const [flights, setFlights] = useState([]);
  const [isRealTime, setIsRealTime] = useState(false);
  const [error, setError] = useState(null); // 에러 상태 추가

  const handleFlightSearch = async (realTime = false) => {
    setError(null);
    try {
        const response = await fetch("http://localhost:8080/api/flights/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                origin: "seoul",
                destination: destination,
                departureDate: "2025-07-01",
                realTime: realTime,
            }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error?.message || `HTTP error! status: ${response.status}`);
        }

        if (result.success) {
            setFlights(result.data.flights);
            console.log("항공편 리스트:", result.data.flights);
            if (result.data.flights.length === 0) {
                setError("검색된 항공편이 없습니다.");
            }
        } else {
            setError(result.error?.message || "API 호출 실패");
        }
    } catch (err) {
        console.error("항공편 검색 실패:", err.message);
        setError(err.message);
    }
};

  const handleRefresh = () => {
    setIsRealTime(true);
    handleFlightSearch(true);
    setIsRealTime(false);
  };

  if (!supportedCities.includes(destination)) {
    return <Navigate to="/not-found" replace />;

  }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={1} destination={params.destination} />
        <DestinationInfo destination={params.destination} />
      </div>
    </main>
  );
}

export default Step1;

