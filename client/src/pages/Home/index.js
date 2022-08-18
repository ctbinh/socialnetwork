import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArticleService from "../../api/services/Article";
import {
  fetchGlobalFeed,
  fetchMyFeed,
  filterByTag,
  homeActions,
} from "../../store/home";
import Article from "../../components/Article";
import BoxTags from "../../components/BoxTags";
import LoadingArticle from "../../components/LoadingArticle";
import {
  Body,
  BoxTag,
  BtnAdd,
  Container,
  ListArticle,
  TabItem,
  Tabs,
} from "./Home.css";
import { uiActions } from "../../store/ui";
import BackToTopButton from "../../components/BackToTopButton";

const defaultTab = ["Your Feed", "Global Feed"];
const Home = () => {
  const articles = useSelector((state) => state.home.articles);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isFilter = useSelector((state) => state.home.isFilter);
  const targetTab = useSelector((state) => state.home.targetTab);
  const [isFirst, setIsFirst] = useState(true);
  const articleCount = useSelector((state) => state.home.articleCount);
  const curPage = useSelector((state) => state.home.curPage);
  const loading = useSelector((state) => state.home.loading);
  const changeTab = (tabName) => {
    if (targetTab === tabName) {
      return;
    }
    dispatch(homeActions.setTargetTab(tabName));
    dispatch(homeActions.setCurPage(1));
    if (defaultTab.includes(tabName)) {
      dispatch(homeActions.setIsFilter(false));
    }
    if (tabName === "Your Feed") {
      dispatch(fetchMyFeed(1));
    } else if (tabName === "Global Feed") {
      dispatch(fetchGlobalFeed());
    }
  };
  const favoriteArticle = async (slug) => {
    const data = await ArticleService.favoriteArticle(slug);
    if (data.status === "success") {
      dispatch(homeActions.updateArticles(data.data.article));
    } else {
      dispatch(
        uiActions.displayAlert({ message: data.message, status: "error" })
      );
    }
  };

  const changePage = (e, value) => {
    dispatch(homeActions.setCurPage(value));
    if (targetTab === "Global Feed") {
      dispatch(fetchGlobalFeed(value));
    } else if (targetTab === "Your Feed") {
      dispatch(fetchMyFeed(value));
    } else {
      dispatch(filterByTag({ targetTab, value }));
    }
  };

  useEffect(() => {
    if (!isFilter && isFirst) {
      dispatch(homeActions.setTargetTab("Global Feed"));
      dispatch(homeActions.setCurPage(1));
      dispatch(fetchGlobalFeed());
    }
    setIsFirst(false);
  }, [dispatch, isFilter, isFirst]);

  return (
    <Container>
      {isAuthenticated && (
        <BtnAdd as={Link} to="/editor">
          New Article
        </BtnAdd>
      )}
      <Body>
        <ListArticle>
          <Tabs>
            <TabItem
              target={targetTab === "Global Feed" ? "true" : "false"}
              onClick={() => changeTab("Global Feed")}
            >
              Global Feed
            </TabItem>
            {isAuthenticated && (
              <TabItem
                target={targetTab === "Your Feed" ? "true" : "false"}
                onClick={() => changeTab("Your Feed")}
              >
                Your Feed
              </TabItem>
            )}
            {!defaultTab.includes(targetTab) && (
              <TabItem target={"true"} onClick={() => changeTab(targetTab)}>
                #{targetTab}
              </TabItem>
            )}
          </Tabs>
          {loading ? (
            <>
              <LoadingArticle />
              <LoadingArticle />
              <LoadingArticle />
              <LoadingArticle />
              <LoadingArticle />
            </>
          ) : (
            articles?.map((item) => {
              return (
                <Article
                  key={item._id}
                  article={item}
                  favoriteArticle={() => favoriteArticle(item.slug)}
                />
              );
            })
          )}
          <Pagination
            sx={{ mt: 2, mb: 5 }}
            count={Math.ceil(articleCount / 10)}
            color="primary"
            showFirstButton
            showLastButton
            size="medium"
            shape="rounded"
            page={curPage}
            onChange={changePage}
          />
          <BackToTopButton/>
        </ListArticle>
        <BoxTag>
          <BoxTags />
        </BoxTag>
      </Body>
    </Container>
  );
};

export default Home;
