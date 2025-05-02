import React from 'react';
import { NavBar } from "../../components/Nav-bar";
import AttractionsContent from '../../modules/Attractions-content';

export default function AttractionsPage() {
  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <AttractionsContent />
      </div>
    </main>
  );
}