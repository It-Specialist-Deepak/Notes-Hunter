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
        return rejectWithValue({
          message: "You need to Login First",
          status: 401,
        });
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
// download notes api call
export const downloadNote = createAsyncThunk(
  "/notes/download",
  async (noteId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/download-notes/${noteId}`,
      );

      return res.data.downloadUrl;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Download failed"
      );
    }
  }
);
/* ---------------- TOGGLE SAVE NOTE ---------------- */
export const toggleSaveNote = createAsyncThunk(
  "notes/toggleSaveNote",
  async ({ noteId }, { rejectWithValue }) => {
    try {
      // ✅ SSR safety
      if (typeof window === "undefined") {
        return rejectWithValue("Client only action");
      }

      const userId = localStorage.getItem("userId");
      console.log(userId)
      if (!userId) {
        return rejectWithValue("You need to login first");
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/save-notes`,
        { noteId, userId },
        { withCredentials: true }
      );

      return {
        noteId,
        saved: res.data.saved,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save note"
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
    savedNoteIds: [],
    loading: false,
    saveLoading: false,
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
        state.error = action.payload || { message: action.error.message };
        console.log(action.payload)
      })
      // download
      .addCase(downloadNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadNote.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- SAVE / UNSAVE NOTE ---------- */
      .addCase(toggleSaveNote.pending, (state) => {
        state.saveLoading = true;
        state.error = null;
      })
      .addCase(toggleSaveNote.fulfilled, (state, action) => {
        const { noteId, saved } = action.payload;

        if (saved) {
          if (!state.savedNoteIds.includes(noteId)) {
            state.savedNoteIds.push(noteId);
          }
        } else {
          state.savedNoteIds = state.savedNoteIds.filter(
            (id) => id !== noteId
          );
        }

        state.saveLoading = false;
      })
      .addCase(toggleSaveNote.rejected, (state, action) => {
        state.saveLoading = false;
        state.error = action.payload;
      });

  },
});

export const { clearPreviewNote, setPreviewNoteId } = noteSlice.actions;
export default noteSlice.reducer;
