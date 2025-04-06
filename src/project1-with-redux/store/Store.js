import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "../features/CommentSlice";

const store = configureStore({
  reducer: {
    commentsData: commentSlice,
  },
});
export default store;
