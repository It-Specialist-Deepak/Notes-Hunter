// src/app/redux/slices/savedItemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchSavedItems = createAsyncThunk(
  'savedItems/fetch',
  async ({ type }, { rejectWithValue }) => {
    try {
      if (type === 'papers') {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/paper/saved-papers`,
          { withCredentials: true }
        );
        return { type: 'papers', data: res.data || [] };
      }

      if (type === 'notes') {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/saved-notes`,
          { withCredentials: true }
        );
        return { type: 'notes', data: res.data || [] };
      }

      // fallback → fetch both
      const [notesRes, papersRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes/saved-notes`, { withCredentials: true }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/paper/saved-papers`, { withCredentials: true })
      ]);

      return {
        type: 'all',
        notes: notesRes.data || [],
        papers: papersRes.data || []
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch saved items');
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

        const { type } = action.payload;

        if (type === 'papers') {
          state.papers = action.payload.data;
        }

        if (type === 'notes') {
          state.notes = action.payload.data;
        }

        if (type === 'all') {
          state.notes = action.payload.notes;
          state.papers = action.payload.papers;
        }
      })

      .addCase(fetchSavedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  }
});

export const { clearSavedItems } = savedItemsSlice.actions;
export default savedItemsSlice.reducer;