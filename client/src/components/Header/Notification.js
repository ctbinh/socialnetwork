import { Avatar } from "@mui/material";
import React from "react";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Notification = ({ notification }) => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() =>
        navigate(`${notification.path}/${notification.article.slug}`)
      }
    >
      <Row>
        <Avatar
          alt="Remy Sharp"
          src={notification.user.image}
          sx={{ width: "50px", height: "50px" }}
        />
        <Content>
          <p>
            <strong>{notification.user.username}</strong> favorited your
            article: "{notification.article.title}"
          </p>
          <Date>
            <Moment fromNow>{notification.createdAt}</Moment>
          </Date>
        </Content>
      </Row>
    </Container>
  );
};

const Date = styled.span`
  color: gray;
  font-size: 13px;
`;
const Content = styled.div`
  flex: 1;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: var(--target);
  }
`;

export default Notification;
