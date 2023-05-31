import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobs = createAsyncThunk(
  "jobs/getData",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://devjobs-web-api.herokuapp.com/jobs"
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: [],
  filter: [],
  isSuccess: false,
  message: "",
  loading: false,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setFilteredJobs: (state, action) => {
      state.filter = action.payload;
      // state.filter = state.data
      console.log(state.data);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.filter = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getJobs.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const { setFilteredJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
