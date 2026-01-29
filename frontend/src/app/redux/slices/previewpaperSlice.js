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
/* ================= DOWNLOAD PAPER ================= */
export const downloadPaper = createAsyncThunk(
  "papers/downloadPaper",
  async (paperId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/paper/download-paper/${paperId}`,
        { withCredentials: true }
      );
      return response.data; // Should contain downloadUrl
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Download failed");
    }
  }
);
// Add this new thunk to your previewpaperSlice.js
export const toggleLikePaper = createAsyncThunk(
  "papers/toggleLike",
  async ({ paperId }, { rejectWithValue }) => {
    try {
      // Get userId from localStorage
      const userId = localStorage.getItem('userId');

      if (!userId) {
        return rejectWithValue({
          message: "Please login to like this paper",
          status: 401,
          shouldRedirect: true
        });
      }

      if (!paperId) {
        return rejectWithValue({
          message: "Paper ID is required",
          status: 400
        });
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/paper/like-paper`,
        { paperId, userId },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data) {
        throw new Error("Invalid response from server");
      }

      return response.data;

    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to toggle like",
        status: error.response?.status || 500
      });
    }
  }
);
// toggle save paper
export const toggleSavePaper = createAsyncThunk(
  'papers/toggleSave',
  async ({ paperId }, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        return rejectWithValue({
          message: "Please login to like this paper",
          status: 401,
          shouldRedirect: true
        });
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/paper/save-papers`,
        { paperId, userId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error saving paper');
    }
  }
);
/* ================= SLICE ================= */
const previewPapersSlice = createSlice({
  name: "previewPapers",
  initialState: {
    /* Preview paper */
    savedPaperIds: [],
    paper: null,
    loading: false,
    error: null,
    likeStatus: 'idle',
    downloadStatus: {
      loading: false,
      downloadUrl: null,
      error: null,
    },
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
    clearDownloadStatus: (state) => {
      state.downloadStatus = {
        loading: false,
        downloadUrl: null,
        error: null,
      };
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
      /* ---------- DOWNLOAD PAPER ---------- */
      .addCase(downloadPaper.pending, (state) => {
        state.downloadStatus.loading = true;
        state.downloadStatus.error = null;
        state.downloadStatus.downloadUrl = null;
      })
      .addCase(downloadPaper.fulfilled, (state, action) => {
        state.downloadStatus.loading = false;
        state.downloadStatus.downloadUrl = action.payload.downloadUrl;
        // Update the paper's download count in the local state if paper is loaded
        if (state.paper && state.paper._id === action.meta.arg) {
          state.paper.downloads = (state.paper.downloads || 0) + 1;
        }
      })
      .addCase(downloadPaper.rejected, (state, action) => {
        state.downloadStatus.loading = false;
        state.downloadStatus.error = action.payload;
      })
      .addCase(toggleLikePaper.pending, (state) => {
        state.likeStatus = 'pending';
        state.error = null;
      })
      .addCase(toggleLikePaper.fulfilled, (state, action) => {
        state.likeStatus = 'succeeded';

        // Update likes if the paper in state matches
        if (state.paper && state.paper._id === action.meta.arg.paperId) {
          // API returns { success, message, likes }
          state.paper.likes = action.payload.likes;

          // Optional: maintain likedBy if returned by backend
          if (action.payload.likedBy) {
            state.paper.likedBy = action.payload.likedBy;
          }
        }
      })
      .addCase(toggleLikePaper.rejected, (state, action) => {
        state.likeStatus = 'failed';

        // action.payload may be undefined if something went wrong
        state.error = action.payload || { message: "Something went wrong", status: 500 };
      })
      .addCase(toggleSavePaper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSavePaper.fulfilled, (state, action) => {
        state.loading = false;
        const { saved, paperId } = action.payload;
        if (saved) {
          state.savedPaperIds.push(paperId);
        } else {
          state.savedPaperIds = state.savedPaperIds.filter(id => id !== paperId);
        }
      })
      .addCase(toggleSavePaper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to save paper';
      });


  },
});

export const {
  clearPreviewPaper,
  clearDownloadStatus
} = previewPapersSlice.actions;

export default previewPapersSlice.reducer;
