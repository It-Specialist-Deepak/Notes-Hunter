import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ===========================
   ADD COMMENT
=========================== */
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ noteId, text }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/add-comment/${noteId}`,
        { text },
        {
          withCredentials: true, // 👈 important (cookies)
        }
      );
      return res.data.comments;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add comment");
    }
  }
);
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (noteId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/get-comment/${noteId}`,
       
      );

      return res.data.comments;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch comments"
      );
    }
  }
);
/* ===========================
   DELETE COMMENT
=========================== */
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ noteId, commentId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/delete-comment/${noteId}/${commentId}`,
        { withCredentials: true }
      );

      return commentId; // return deleted comment id
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);

/* ===========================
   SLICE
=========================== */
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
  builder

    /* ===== GET COMMENTS ===== */
    .addCase(getComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    })
    .addCase(getComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ===== ADD COMMENT ===== */
    .addCase(addComment.pending, (state) => {
      state.loading = true;
    })
    .addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    })
    .addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ===== DELETE COMMENT ===== */
    .addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    });
}

});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;