import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadNum: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    setUnreadNum(state, action) {
      state.unreadNum = action.payload
    }
  },
});

// export const fetchMyFeed = createAsyncThunk(
//   "articles/fetchMyFeed",
//   async (page) => {
//     const data = await ArticleService.fetchMyFeed(page);
//     return data;
//   }
// );

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
