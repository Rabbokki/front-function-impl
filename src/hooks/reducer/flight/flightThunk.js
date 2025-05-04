import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchFlights = createAsyncThunk(
    "flight/searchFlights",
    async (searchParams, { rejectWithValue }) => {
      try {
        const query = new URLSearchParams({
          from: encodeURIComponent(searchParams.from),
          to: encodeURIComponent(searchParams.to),
          date: searchParams.date,
          return: searchParams.return,
          passengers: searchParams.passengers.toString(),
          tripType: searchParams.tripType,
        }).toString();
  
        const response = await fetch(`/api/flights/search?${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
        if (!result.success) {
          return rejectWithValue(result.message || "항공편 검색에 실패했습니다.");
        }
        return result.data.flights;
      } catch (error) {
        return rejectWithValue(error.message || "네트워크 오류가 발생했습니다.");
      }
    }
  );