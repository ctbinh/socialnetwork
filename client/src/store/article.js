import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  targetArticle: null,
  comments: [],
  articles: [],
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    target(state, action) {
      state.targetArticle = action.payload;
    },
    setArticles(state, action) {
      state.articles = action.payload;
    },
    updateArticles(state, action) {
      state.articles = state.articles.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
    setComments(state, action) {
      state.comments = action.payload;
    },
    updateComments(state, action) {
      state.comments.unshift(action.payload);
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter(
        (item) => item._id !== action.payload
      );
    },
    replyComment(state, action) {
      const idx = state.comments.findIndex(
        (item) => item._id === action.payload.commentId
      );
      state.comments[idx].replies.push(action.payload.reply);
    },
    deleteReply(state, action) {
      const idx = state.comments.findIndex(
        (item) => item._id === action.payload.commentId
      );
      state.comments[idx].replies = state.comments[idx].replies.filter(
        (reply) => reply._id !== action.payload.replyId
      );
    },
    likeComment(state, action) {
      const idx = state.comments.findIndex(
        (item) => item._id === action.payload.commentId
      );
      if (state.comments[idx].likes.includes(action.payload.userId)) {
        state.comments[idx].likes = state.comments[idx].likes.filter(
          (item) => item !== action.payload.userId
        );
      } else {
        state.comments[idx].likes.push(action.payload.userId);
      }
    },
    likeReply(state, action) {
      const idx = state.comments.findIndex(
        (item) => item._id === action.payload.commentId
      );
      const idxReply = state.comments[idx].replies.findIndex(
        (item) => item._id === action.payload.replyId
      );
      if (
        state.comments[idx].replies[idxReply].likes.includes(
          action.payload.userId
        )
      ) {
        state.comments[idx].replies[idxReply].likes.filter(
          (item) => item !== action.payload.userId
        );
      } else {
        state.comments[idx].replies[idxReply].likes.push(action.payload.userId);
      }
    },
    loadMoreComment(state, action) {
      state.comments = state.comments.concat(action.payload)
    }
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice.reducer;
