import React from 'react';
import NavBar from '../../src/components/Nav-bar';
import TravelPlannerHome from './TravelPlannerHome';

function TravelPlannerPage() {
  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-traveling-text">여행 만들기</h1>
        <TravelPlannerHome />
      </div>
    </main>
  );
}

export default TravelPlannerPage;
