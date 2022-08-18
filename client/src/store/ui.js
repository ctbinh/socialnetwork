import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  alertBox: {
    isDisplay: false,
    message: "",
    status: "success",
  },
  targetInputComment: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    signup(state) {
      state.isLogin = false;
    },
    displayAlert(state, action) {
      state.alertBox.isDisplay = true;
      state.alertBox.message = action.payload.message;
      state.alertBox.status = action.payload.status;
    },
    closeAlert(state) {
      state.alertBox.isDisplay = false;
    },
    setTargetInputComment(state, action) {
      if(state.targetInputComment === action.payload) {
        state.targetInputComment = null
      }
      else {
        state.targetInputComment = action.payload;
      }
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
