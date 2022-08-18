import { Divider, Pagination } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ArticleService from "../../api/services/Article";
import { articleActions } from "../../store/article";
import { uiActions } from "../../store/ui";
import Article from "../Article";
import BackToTopButton from "../BackToTopButton";
import LoadingArticle from "../LoadingArticle";

const TabArticles = ({ profile }) => {
  const [totalPage, setTotalPage] = useState(1);
  const [targetTab, setTargetTab] = useState("My Articles");
  const articles = useSelector((state) => state.article.articles);
  const [pageNum, setPageNum] = useState(1);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const { username } = useParams();
  const dispatch = useDispatch();
  const changePage = (e, value) => {
    setPageNum(value);
    if (targetTab === "Favorited Articles") {
      fetchFavoritedArticle(value);
    } else {
      fetchYourArticles(value);
    }
  };
  const changeTab = (tabName) => {
    setTargetTab(tabName);
    setPageNum(1);
    if (tabName === targetTab) {
      return;
    }
    if (tabName === "Favorited Articles") {
      fetchFavoritedArticle();
    } else {
      fetchYourArticles();
    }
  };
  const fetchFavoritedArticle = useCallback(
    async (page) => {
      setLoadingArticle(true);
      const data = await ArticleService.fetchFavoritedArticles(username, page);
      setTotalPage(Math.ceil(data.articleCount / 10));
      dispatch(articleActions.setArticles(data.articles));
      setLoadingArticle(false);
    },
    [dispatch, username]
  );
  const fetchYourArticles = useCallback(
    async (page) => {
      setLoadingArticle(true);
      const data = await ArticleService.fetchMyArticles(username, page);
      setTotalPage(Math.ceil(data.articleCount / 10));
      dispatch(articleActions.setArticles(data.articles));
      setLoadingArticle(false);
    },
    [dispatch, username]
  );
  const favoriteArticle = async (slug) => {
    const data = await ArticleService.favoriteArticle(slug);
    if(data.status === 'success') {
      dispatch(articleActions.updateArticles(data.data.article));
    }
    else {
      dispatch(uiActions.displayAlert({ message: data.message, status: "error" }));
    }
  };
  useEffect(() => {
    fetchYourArticles();
    setTargetTab("My Articles");
  }, [fetchYourArticles]);

  return (
    <Container>
      <Intro>
        <Title>Intro</Title>
        <Divider sx={{ my: 1 }} />
        <Content>{profile?.user?.bio}</Content>
      </Intro>
      <Articles>
        <Tabs>
          <TabItem
            target={targetTab === "My Articles" ? "true" : "false"}
            onClick={() => changeTab("My Articles")}
          >
            My Articles
          </TabItem>
          <TabItem
            target={targetTab === "Favorited Articles" ? "true" : "false"}
            onClick={() => changeTab("Favorited Articles")}
          >
            Favorited Articles
          </TabItem>
        </Tabs>
        {loadingArticle ? (
          <>
            <LoadingArticle />
            <LoadingArticle />
            <LoadingArticle />
            <LoadingArticle />
            <LoadingArticle />
          </>
        ) : (
          articles.map((item) => {
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
          count={totalPage}
          color="primary"
          showFirstButton
          showLastButton
          size="medium"
          shape="rounded"
          page={pageNum}
          onChange={changePage}
        />
        <BackToTopButton/>
      </Articles>
    </Container>
  );
};
const TabItem = styled.div`
  min-width: 100px;
  font-size: 16px;
  padding: 10px;
  padding-top: 1px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: ${($props) =>
    $props.target === "true" ? "2px solid var(--primary)" : ""};
  color: ${($props) => ($props.target === "true" ? "var(--primary)" : "")};
  cursor: pointer;
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  color: gray;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 10px 20px;
  padding-bottom: 0px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: white;
`;
const Articles = styled.div`
  width: 75%;
  margin-left: 15px;
  border-radius: 5px;
`;
const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
const Intro = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  width: 25%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  height: fit-content;
  background-color: white;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const Content = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default TabArticles;
