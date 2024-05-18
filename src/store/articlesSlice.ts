import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Article } from "../types/types";

interface ArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  filter: {
    category: string;
    author: string;
  };
  sort: string;
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  filter: {
    category: "",
    author: "",
  },
  sort: "date-desc",
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const response = await axios.get(
      "https://dev-storm-rest-api.pantheonsite.io/api/v1/news"
    );
    return response.data;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.loading = false;
      });
  },
});

export const { setFilter, setSort } = articlesSlice.actions;

export default articlesSlice.reducer;
