// src/app/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/admin-stats`, {
        withCredentials: true
      });
      console.log('API Response Data:', response.data); // Debug log
      return response.data; // This should be { success, message, stats }
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin stats');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        // The API returns { success, message, stats }, so we need to access action.payload.stats
        state.stats = action.payload.stats || action.payload; // Handle both formats
        state.error = null;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default adminSlice.reducer;