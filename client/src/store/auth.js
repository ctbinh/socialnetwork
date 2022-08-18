import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userUpdate: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.userUpdate = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateInfor(state, action) {
      state.user = action.payload.user;
    },
    setUserUpdate(state, action) {
      if (action.payload.username !== undefined) {
        state.userUpdate.username = action.payload.username;
      }
      if (action.payload.email !== undefined) {
        state.userUpdate.email = action.payload.email;
      }
      if (action.payload.image !== undefined) {
        state.userUpdate.image = action.payload.image;
      }
      if (action.payload.bgImage !== undefined) {
        state.userUpdate.bgImage = action.payload.bgImage;
      }
      if (action.payload.bio !== undefined) {
        state.userUpdate.bio = action.payload.bio;
      }
    },
    verifyEmail(state) {
      state.user.verified = true
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
