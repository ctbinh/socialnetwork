import axios from "axios";
const limitArticle = 10
const limitComment = 10
const ArticleService = {
  favoriteArticle: async (slug) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles/${slug}/favorite`,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  fetchMyFeed: async (page) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles/feed?offset=${page}&limit=${limitArticle}`,
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return err.response.data;
    }
  },
  fetchGlobalFeed: async (page) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles?offset=${page}&limit=${limitArticle}`,
      });
      return res.data.data;
    } catch (err) {
      return err.response.data;
    }
  },
  filterByTag: async (tagname, page) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles?tag=${tagname}&offset=${page}&limit=${limitArticle}`,
      });
      return res.data.data;
    } catch (err) {
      return err.response.data;
    }
  },
  fetchMyArticles: async (username, page) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles?author=${username}&offset=${page}&limit=${limitArticle}`,
      });
      return res.data.data;
    } catch (err) {
      return err.response.data;
    }
  },
  fetchFavoritedArticles: async (username, page) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles?favorited=${username}&offset=${page}&limit=${limitArticle}`,
      });
      return res.data.data;
    } catch (err) {
      return err.response.data;
    }
  },
  getArticle: async (slug, offset) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles/${slug}?offset=${offset}&limit=${limitComment}`,
      });
      return res.data.data;
    } catch (err) {
      return err.response.data;
    }
  },
  loadMoreComment: async (id, offset) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles/${id}/loadMoreComment?offset=${offset}&limit=${limitComment}`,
      });
      return res.data.data;
    } catch (err) {
      return err.response.data;
    }
  },
  publishArticle: async (body) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles`,
        data: body,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  updateArticle: async (body, slug) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles/${slug}`,
        data: body,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  deleteArticle: async (slug) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_URL_SERVER}/api/articles/${slug}`,
        withCredentials: true,
      });
      return res
    } catch (err) {
      return err.response.data;
    }
  }
};
export default ArticleService;
