import React from "react";
import { NavBar } from "../../../components/Nav-bar";
import FlightSearchResults from "../../../components/flight-search/Flight-search-results";

const FlightSearchResultsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />
      <FlightSearchResults />
    </main>
  );
};

export default FlightSearchResultsPage;
