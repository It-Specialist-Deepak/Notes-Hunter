// src/app/redux/slices/savedItemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchSavedItems = createAsyncThunk(
  'savedItems/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const [notesResponse, papersResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes/saved-notes`, { withCredentials: true }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/paper/saved-papers`, { withCredentials: true })
      ]);
      
      return {
        notes: notesResponse.data || [],
        papers: papersResponse.data || []
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch saved items');
    }
  }
);


const savedItemsSlice = createSlice({
  name: 'savedItems',
  initialState: {
    notes: [],
    papers: [],
    loading: false,
    error: null
  },
  reducers: {
    clearSavedItems: (state) => {
      state.notes = [];
      state.papers = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.notes;
        state.papers = action.payload.papers;
      })
      .addCase(fetchSavedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
  }
});

export const { clearSavedItems } = savedItemsSlice.actions;
export default savedItemsSlice.reducer;