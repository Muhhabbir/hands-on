import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducer/slicer";

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});