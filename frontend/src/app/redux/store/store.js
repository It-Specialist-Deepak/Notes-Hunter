import { configureStore } from "@reduxjs/toolkit";
import previewNotesReducer from "../slices/previewNotes";
import recommendedSlice from "../slices/recommendedNotes";
import commentsReducer from "../slices/commentSlice";
export const store = configureStore({
  reducer: {
    previewNotes: previewNotesReducer, 
    recommended: recommendedSlice,
    comments: commentsReducer,
  },
});
