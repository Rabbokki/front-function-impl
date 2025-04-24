import React from 'react';
import NavBar from '../../components/Nav-bar';
import DestinationInfo from './DestinationInfo';
import StepIndicator from './StepIndicator';
import { useParams, Navigate } from 'react-router-dom';

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
      </div>
    </main>
  );
}

export default Step1;
