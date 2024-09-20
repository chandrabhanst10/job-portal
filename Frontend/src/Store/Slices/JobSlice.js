import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../Utils/AxiosConfig';
import { toast } from 'react-toastify';
const initialState = {
    allJobs:[],
  loading: false,
  error: null,
  message: null,
  authentication: false,
  userProfileData: null
}

export const PostNewJob = createAsyncThunk(
    "PostNewJob",
    async(payload, { rejectWithValue }) => {
      console.log(payload);
      
      return axiosInstance.put("/api/user/UpdateProfile",payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        return response.data.user
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
          return rejectWithValue(error.response.data.message);
        } else {
          toast.error('An unexpected error occurred');
          return rejectWithValue('An unexpected error occurred');
        }
  
      });
  });
export const AllJobs = createAsyncThunk(
    "AllJobs",
    async (payload, { rejectWithValue }) => {
      return axiosInstance.put("/api/user/UpdateProfile",payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        return response.data.user
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
          return rejectWithValue(error.response.data.message);
        } else {
          toast.error('An unexpected error occurred');
          return rejectWithValue('An unexpected error occurred');
        }
  
      });
});

export const JobSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(PostNewJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PostNewJob.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobs = action.payload;
      })
      .addCase(AllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobs = action.payload;
      })
  }
})


export default JobSlice.reducer