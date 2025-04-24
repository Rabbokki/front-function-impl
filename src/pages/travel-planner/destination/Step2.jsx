import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import NavBar from '../../components/Nav-bar';
import StepIndicator from '../destination/step-indicator/StepIndicator';
import AttractionSelection from '../destination/attraction-selection/AttractionSelection';

const supportedCities = ["osaka", "tokyo", "fukuoka", "paris", "rome", "venice", "bangkok", "singapore"];

function Step2() {
  const { destination } = useParams();

  if (!supportedCities.includes(destination)) {
    return <Navigate to="/not-found" replace />;
  }

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

export default Step2;
