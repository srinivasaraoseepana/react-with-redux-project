import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  errors: null,
  data: [],
};
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    removeComment: (state, action) => {
      state.data = state.data.filter((cmnt) => cmnt.id !== action.payload);
      console.log(`remove`, action.payload);
    },
    editComment: (state, action) => {
      const index = state.data.findIndex(
        (cmnt) => cmnt.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload.changes };
      }
    },
    fetchComment: (state, action) => {
      console.log(`action`, action.payload);

      state.data = [...state.data, ...action.payload];
    },
  },
});

export const { removeComment, editComment, fetchComment } =
  commentSlice.actions;
export default commentSlice.reducer;
