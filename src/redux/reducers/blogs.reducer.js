import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const initialState = {
  data: [],
  trending: [],
  showForm: false,
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  try {
    const { data: res } = await api.get(API_URLS.blog.list);
    return res;
  } catch (ex) {}
});

export const fetchTrendingBlogs = createAsyncThunk(
  "blogs/fetchTrendingBlogs",
  async () => {
    try {
      const { data: res } = await api.get(API_URLS.blog.listTrending);
      return res;
    } catch (ex) {}
  }
);

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setShowForm: (state, action) => {
      const { visibility, blogId } = action.payload;
      state.showForm = visibility;
      state.blogId = blogId || null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
    });
    builder.addCase(fetchTrendingBlogs.fulfilled, (state, action) => {
      if (action.payload?.bookMarked) {
        state.trending = action.payload.bookMarked;
      }
    });
  },
});

export const { setShowForm } = blogsSlice.actions;

export default blogsSlice.reducer;
