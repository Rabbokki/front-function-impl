import React from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "../../../components/Nav-bar";
import FlightSearchResults from "../../../components/flight-search/Flight-search-results";

const FlightSearchResultsPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const searchParams = {
    from: params.get("from") || "",
    to: params.get("to") || "",
    date: params.get("date") || "",
    return: params.get("return") || "",
    passengers: params.get("passengers") || "",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />
      <FlightSearchResults searchParams={searchParams} />
    </main>
  );
};

export default FlightSearchResultsPage;
