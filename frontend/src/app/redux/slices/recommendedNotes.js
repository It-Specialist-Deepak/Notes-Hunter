// redux/slices/recommendedNotesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to fetch recommended notes
export const fetchRecommendedNotes = createAsyncThunk(
  "recommended/fetchRecommendedNotes",
  async (noteId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/recommended-notes/${noteId}`
      );
      return res.data; // full response with recommendedNotes array
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recommended notes"
      );
    }
  }
);

const recommendedSlice = createSlice({
  name: "recommended",
  initialState: {
    notes: [],
    subcategory: "",
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearRecommended: (state) => {
      state.notes = [];
      state.subcategory = "";
      state.total = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.recommendedNotes;
        state.subcategory = action.payload.subcategory;
        state.total = action.payload.total;
      })
      .addCase(fetchRecommendedNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRecommended } = recommendedSlice.actions;
export default recommendedSlice.reducer;
