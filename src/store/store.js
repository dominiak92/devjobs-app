import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "../store/jobsSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    jobs: jobsSlice,
    theme: themeSlice,
  },
});

export default store;
