import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { articleActions } from "../store/article";
import Author from "./Author";
import Tag from "./Tag";

const Article = ({ article, favoriteArticle }) => {
  const dispatch = useDispatch();
  const targetArticle = () => {
    dispatch(articleActions.target(null));
    navigate(`/article/${article.slug}`);
  };
  const navigate = useNavigate();
  return (
    <Container>
      <Thumbnail onClick={targetArticle}>
        <img
          src={
            article.thumbnail
              ? article.thumbnail
              : "https://www.bukandroid.com/wp-content/uploads/2020/04/Cara-Hapus-Data-Thumbnail-Android.png"
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://www.bukandroid.com/wp-content/uploads/2020/04/Cara-Hapus-Data-Thumbnail-Android.png";
          }}
          alt="thumbnail"
          style={{ width: "100%", height: "100%", borderRadius: "5px" }}
        />
      </Thumbnail>
      <Content>
        <Author article={article} favoriteArticle={favoriteArticle} />
        <MidArticle onClick={targetArticle}>
          <Title>{article.title}</Title>
          <Desc>{article.description}</Desc>
        </MidArticle>
        <BottomArticle>
          <Date onClick={targetArticle}>Read more...</Date>
          <ListTag>
            {article.tagList.map((tag, idx) => {
              return (
                <Tag
                  tagName={tag}
                  sx={{ ml: "2px" }}
                  variant="outlined"
                  key={idx}
                  size="small"
                />
              );
            })}
          </ListTag>
        </BottomArticle>
      </Content>
    </Container>
  );
};

const Thumbnail = styled.div`
  width: 220px;
  height: 145px;
  overflow: hidden;
  margin-right: 20px;
  box-sizing: border-box;
  border-radius: 5px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;
const MidArticle = styled.div`
  display: flex;
  flex-direction: column;
`;
const ListTag = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const BottomArticle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const Desc = styled.span`
  color: gray;
  font-size: 13px;
`;
const Title = styled.span`
  font-size: 20px;
  margin-bottom: 5px;
  color: #2b2b2b;
`;

const Date = styled.span`
  color: gray;
  font-size: 13px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export default Article;
