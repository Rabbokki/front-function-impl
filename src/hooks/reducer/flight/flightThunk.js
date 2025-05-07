import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchFlights = createAsyncThunk(
  'flight/searchFlights',
  async ({ origin, destination, departureDate, realTime }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/flights/search', {
        origin,
        destination,
        departureDate,
        realTime
      });
      if (response.data.success) {
        return response.data.flights;
      } else {
        return rejectWithValue(response.data.error?.message || 'Failed to search flights');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to search flights');
    }
  }
);