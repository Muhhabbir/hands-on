import { createSlice } from "@reduxjs/toolkit";

export const slicer = createSlice({
  name: "token",
  initialState: {
    value: "",
  },

  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setToken } = slicer.actions;
export default slicer.reducer;