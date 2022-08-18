import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ArticleService from "../api/services/Article";

const initialState = {
  isFilter: false,
  targetTab: "Global Feed",
  articles: [],
  articleCount: 1,
  curPage: 1,
  loading: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setIsFilter(state, action) {
      state.isFilter = action.payload;
    },
    setTargetTab(state, action) {
      state.targetTab = action.payload;
    },
    setArticles(state, action) {
      state.articles = action.payload;
    },
    updateArticles(state, action) {
      state.articles = state.articles.map((item) => {
        if (item._id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
    setArticleCount(state, action) {
      state.articleCount = action.payload;
    },
    setCurPage(state, action) {
      state.curPage = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("fulfilled"),
        (state, action) => {
          state.articleCount = action.payload.articleCount;
          state.articles = action.payload.articles;
          state.loading = false;
        }
      );
  },
});

export const fetchMyFeed = createAsyncThunk(
  "articles/fetchMyFeed",
  async (page) => {
    const data = await ArticleService.fetchMyFeed(page);
    return data;
  }
);

export const fetchGlobalFeed = createAsyncThunk(
  "articles/fetchGlobalFeed",
  async (page) => {
    const data = await ArticleService.fetchGlobalFeed(page);
    return data;
  }
);

export const filterByTag = createAsyncThunk(
  "articles/filterByTag",
  async ({targetTab, value}) => {
    const data = await ArticleService.filterByTag(targetTab, value);
    return data;
  }
);

export const homeActions = homeSlice.actions;

export default homeSlice.reducer;
