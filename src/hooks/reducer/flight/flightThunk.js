// flightThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

// 기존 검색 플라이트
export const searchFlights = createAsyncThunk(
  'flight/searchFlights',
  async ({ origin, destination, departureDate, realTime }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/flights/search', {
        origin,
        destination,
        departureDate,
        realTime,
      });
      if (response.data.success) {
        return response.data.flights;
      } else {
        return rejectWithValue(response.data.error?.message || 'Failed to search flights');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || 'Failed to search flights'
      );
    }
  }
);

// 새로운 상세 조회 thunk
export const fetchFlightDetail = createAsyncThunk(
  'flight/fetchFlightDetail',
  async (flightId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/flights/detail/by-travel-flight/${flightId}`
      );
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch flight detail');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch flight detail'
      );
    }
  }
);

// 예약 처리 thunk
export const bookFlight = createAsyncThunk(
  'flight/bookFlight',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        '/api/flights/book',
        bookingData
      );
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || 'Booking failed');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Booking failed'
      );
    }
  }
);

export const fetchAirportSuggestions = createAsyncThunk(
  'flight/fetchAirportSuggestions',
  async (term, { rejectWithValue }) => {
    if (!term || term.length < 2) {
      // bail out early no-op
      return [];
    }
    try {
      const resp = await axiosInstance.get('/api/flights/autocomplete', { params: { term } });
      if (resp.data.success) {
        return resp.data.data.map((item) => ({
          label: `${item.detailedName} (${item.iataCode})`,
          value: item.iataCode,
          isAirport: item.subType === 'AIRPORT',
        }));
      } else {
        return rejectWithValue('No suggestions found');
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch suggestions');
    }
  }
);
