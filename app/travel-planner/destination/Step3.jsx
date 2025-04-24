import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import NavBar from '../../components/Nav-bar';
import StepIndicator from '../destination/step-indicator/StepIndicator';
import AccommodationSelection from '../destination/accommodation-selection/AccommodationSelection';

const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

function Step3() {
  const { destination } = useParams();

  if (!supportedCities.includes(destination)) {
    return <Navigate to="/not-found" replace />;
  }

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

export default Step3;
