import React from "react";
import { NavBar } from "../../components/Nav-bar";
import FlightSearchHero  from "../../components/flight-search/Flight-search-hero";

const FlightSearchPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <FlightSearchHero />
    </main>
  );
};

export default FlightSearchPage;