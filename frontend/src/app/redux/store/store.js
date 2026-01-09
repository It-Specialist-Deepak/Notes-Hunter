import { configureStore } from "@reduxjs/toolkit";
import previewNotesReducer from "../slices/previewNotes";
import previewPapersReducer from "../slices/previewpaperSlice";
import recommendedSlice from "../slices/recommendedNotes";
import commentsReducer from "../slices/commentSlice";
import recommendedPaperSlice from "../slices/recommendedPapers";
export const store = configureStore({
  reducer: {
    previewNotes: previewNotesReducer, 
    previewPapers: previewPapersReducer,
    recommended: recommendedSlice,
    recommendedPapers: recommendedPaperSlice,
    comments: commentsReducer,
  },
});
