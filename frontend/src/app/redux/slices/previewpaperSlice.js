import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= PREVIEW PAPER ================= */
export const fetchPreviewPaper = createAsyncThunk(
  "previewPapers/fetchPreviewPaper",
  async (paperId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/paper/preview-paper/${paperId}`
      );

      return res.data.data; // ✅ single paper
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch paper"
      );
    }
  }
);


/* ================= SLICE ================= */
const previewPapersSlice = createSlice({
  name: "previewPapers",
  initialState: {
    /* Preview paper */
    paper: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearPreviewPaper: (state) => {
      state.paper = null;
      state.error = null;
    },
    clearRecommendedPapers: (state) => {
      state.recommended = [];
      state.subcategory = "";
      state.total = 0;
      state.errorRecommended = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- PREVIEW PAPER ---------- */
      .addCase(fetchPreviewPaper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreviewPaper.fulfilled, (state, action) => {
        state.loading = false;
        state.paper = action.payload;
      })
      .addCase(fetchPreviewPaper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  
  },
});

export const {
  clearPreviewPaper,
} = previewPapersSlice.actions;

export default previewPapersSlice.reducer;
