import React from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../../../components/Nav-bar";
import FlightDetailContent  from "../../../components/flight-search/Flight-detail-content";

const FlightDetailPage = () => {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-traveling-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-traveling-text">항공권 상세 정보</h1>
        <FlightDetailContent flightId={id} />
      </div>
    </main>
  );
};

export default FlightDetailPage;
