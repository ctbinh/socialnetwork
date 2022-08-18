import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {},
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    follow(state) {
      state.profile.followed = true;
      state.profile.followers += 1;
    },
    unfollow(state) {
      state.profile.followed = false;
      state.profile.followers -= 1;
    },
    displayBadge(state, action) {
      state.profile.user.badgeDisplay = action.payload
    },
    updateInfor(state, action) {
      state.profile.user = action.payload
    }
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
