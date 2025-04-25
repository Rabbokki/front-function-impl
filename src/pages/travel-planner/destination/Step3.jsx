// src/pages/travel-planner/destination/Step3.jsx
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { NavBar } from "../../../components/Nav-bar";
import StepIndicator from "../../../components/travel-planner/Step-indicator";
import AccommodationSelection from "../../../components/travel-planner/Accommodation-selection";

const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

function Step3() {
  const { destination } = useParams();

  if (!supportedCities.includes(destination)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={3} destination={destination} />
        <AccommodationSelection destination={destination} />
      </div>
    </main>
  );
}

export default Step3;