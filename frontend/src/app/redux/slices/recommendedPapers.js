import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= RECOMMENDED PAPERS ================= */
export const fetchRecommendedPapers = createAsyncThunk(
  "recommendedPapers/fetchRecommendedPapers",
  async (paperId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/paper/recommended-papers/${paperId}`
      );

      return data; // { success, subcategory, total, recommendedPapers }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch recommended papers"
      );
    }
  }
);

const recommendedPaperSlice = createSlice({
  name: "recommendedPapers",
  initialState: {
    recommended: [],
    subcategory: "",
    total: 0,
    loadingRecommended: false,
    errorRecommended: null,
  },
  reducers: {
    clearRecommendedPapers: (state) => {
      state.recommended = [];
      state.subcategory = "";
      state.total = 0;
      state.errorRecommended = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedPapers.pending, (state) => {
        state.loadingRecommended = true;
      })
      .addCase(fetchRecommendedPapers.fulfilled, (state, action) => {
        state.loadingRecommended = false;
        state.recommended = action.payload.recommendedPapers; // ✅ FIX
        state.subcategory = action.payload.subcategory;
        state.total = action.payload.total;
      })
      .addCase(fetchRecommendedPapers.rejected, (state, action) => {
        state.loadingRecommended = false;
        state.errorRecommended = action.payload; // ✅ FIX
      });
  },
});

export const { clearRecommendedPapers } =
  recommendedPaperSlice.actions;

export default recommendedPaperSlice.reducer;
