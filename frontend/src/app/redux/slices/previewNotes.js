import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ===================== FETCH PREVIEW NOTE ===================== */
export const fetchPreviewNote = createAsyncThunk(
  "notes/fetchPreviewNote",
  async (noteId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/preview-notes/${noteId}`
      );

      // ✅ return full response
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch note"
      );
    }
  }
);

/* ===================== LIKE / UNLIKE NOTE ===================== */
export const toggleLikeNote = createAsyncThunk(
  "notes/toggleLikeNote",
  async (noteId, { rejectWithValue }) => {
    try {
      
      const userId = localStorage.getItem("userId"); // ✅ get userId

      if (!userId) {
        throw new Error("User not logged in");
      }

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/likeNotes`,
        { noteId, userId }, // ✅ SEND BOTH
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to like note"
      );
    }
  }
);


/* ===================== SLICE ===================== */
const noteSlice = createSlice({
  name: "notes",
  initialState: {
    previewNote: null,
    previewNoteId: null,
    totalComments: 0,
    loading: false,
    likeLoading: false,
    error: null,
  },
  reducers: {
    setPreviewNoteId: (state, action) => {
      state.previewNoteId = action.payload;
    },
    clearPreviewNote: (state) => {
      state.previewNote = null;
      state.previewNoteId = null;
      state.totalComments = 0;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- FETCH PREVIEW NOTE ---------- */
      .addCase(fetchPreviewNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreviewNote.fulfilled, (state, action) => {
        state.loading = false;
        state.previewNote = action.payload.data;
        state.totalComments = action.payload.totalComments;
        state.previewNoteId = action.payload.data._id;
      })
      .addCase(fetchPreviewNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- LIKE / UNLIKE NOTE ---------- */
      .addCase(toggleLikeNote.pending, (state) => {
        state.likeLoading = true;
      })
      .addCase(toggleLikeNote.fulfilled, (state, action) => {
        state.likeLoading = false;

        // ✅ update likes instantly
        if (state.previewNote) {
          state.previewNote.likes = action.payload.likes;
        }
      })
      .addCase(toggleLikeNote.rejected, (state, action) => {
        state.likeLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPreviewNote, setPreviewNoteId } = noteSlice.actions;
export default noteSlice.reducer;
