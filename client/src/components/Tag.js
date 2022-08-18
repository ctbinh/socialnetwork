import { Chip } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleService from "../api/services/Article";
import { homeActions } from "../store/home";

const Tag = ({ size, tagName, variant, sx }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const targetTab = useSelector((state) => state.home.targetTab);
  const filterTag = async (tagName) => {
    if (targetTab !== tagName) {
      dispatch(homeActions.setLoading(true))
      dispatch(homeActions.setTargetTab(tagName));
      const data = await ArticleService.filterByTag(tagName);
      dispatch(homeActions.setArticleCount(data.articleCount))
      dispatch(homeActions.setCurPage(1))
      dispatch(homeActions.setArticles(data.articles));
      dispatch(homeActions.setLoading(false))
      dispatch(homeActions.setIsFilter(true));
    }
    navigate("/", { replace: true });
  };
  return (
    <Chip
      label={tagName}
      size={size}
      variant={variant}
      sx={sx}
      onClick={() => filterTag(tagName)}
    />
  );
};

export default Tag;
