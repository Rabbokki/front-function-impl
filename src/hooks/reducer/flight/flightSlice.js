import { createSlice } from "@reduxjs/toolkit";
import { searchFlights } from "./flightThunk";

const initialState = {
  searchParams: {
    from: "서울 (SEOUL)",
    to: "",
    date: "",
    return: "",
    passengers: 1,
    tripType: "roundtrip",
  },
  flights: [],
  loading: false,
  error: null,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.flights = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "항공편 검색에 실패했습니다.";
      });
  },
});

export const { setSearchParams, clearError } = flightSlice.actions;
export default flightSlice.reducer;