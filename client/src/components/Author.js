import { Avatar, Button, Icon } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const Author = ({ article, favoriteArticle }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  return (
    <TopArticle>
      <Container
        onClick={() => navigate(`/profile/${article?.author.username}`)}
      >
        <Avatar alt="Remy Sharp" src={article?.author.image} />
        <NameAndDate>
          <Row>
            <Name>{article?.author.username}</Name>
            {article?.author.badgeDisplay === "Level" &&
              article?.author.level !== 0 && (
                <ImageIcon
                  src={require(`../asset/images/lv${article?.author.level}.png`)}
                  alt="badge"
                />
              )}
            {article?.author.badgeDisplay === "Verified" && (
              <Icon sx={{ color: "var(--primary)", fontSize: "16px" }}>
                check_circle_icon
              </Icon>
            )}
          </Row>
          <Date>
            <Moment fromNow>{article?.createdAt}</Moment>
          </Date>
        </NameAndDate>
      </Container>
      <Button
        variant={
          article?.favorites.includes(user?._id) ? "contained" : "outlined"
        }
        size="small"
        sx={{ height: "30px", minWidth: "60px" }}
        endIcon={<FavoriteBorderIcon />}
        onClick={user ? favoriteArticle : () => navigate('/login')}
      >
        {article?.favorites.length}
      </Button>
    </TopArticle>
  );
};
const ImageIcon = styled.img`
  width: 25px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TopArticle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const Name = styled.span`
  font-size: 16px;
  color: var(--primary);
  margin-right: 3px;
  :hover {
    text-decoration: underline;
  }
`;
const Date = styled.span`
  color: gray;
  font-size: 13px;
`;
const NameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    color: var(--primary);
  }
  cursor: pointer;
`;

export default Author;
