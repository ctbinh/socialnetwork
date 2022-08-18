import { Avatar, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentService from "../api/services/Comment";
import { articleActions } from "../store/article";
import { uiActions } from "../store/ui";

const InputComment = (props) => {
  const { slug } = useParams();
  const user = useSelector((state) => state.auth.user);
  const targetArticle = useSelector((state) => state.article.targetArticle);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [textComment, setTextComment] = useState("");
  const postComment = async (bodyComment) => {
    bodyComment = bodyComment.trim();
    if (bodyComment === "") return;
    const body = {
      body: bodyComment,
      author: user._id,
      article: targetArticle._id,
    };
    const data = await CommentService.postComment(slug, body);
    if (data.status === "success") {
      dispatch(articleActions.updateComments(data.data.comment));
    } else {
      dispatch(
        uiActions.displayAlert({ message: data.message, status: "error" })
      );
    }
  };
  const submitEnter = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      if (props.isReply) {
        replyComment(e.target.value);
      } else {
        postComment(e.target.value);
      }
      setTextComment("");
    }
  };
  const replyComment = async (bodyComment) => {
    bodyComment = bodyComment.trim();
    if (bodyComment === "") return;
    const dataComment = {
      body: bodyComment,
      author: user._id,
      article: targetArticle._id,
      isReply: true,
      parent: props.parent?._id ? props.parent?._id : props.rootComment._id,
    };
    const data = await CommentService.replyComment(
      slug,
      props.rootComment._id,
      dataComment
    );
    if (data.status === "success") {
      props.updateReplies("add", data.data.comment);
    } else {
      dispatch(
        uiActions.displayAlert({ message: data.message, status: "error" })
      );
    }
  };

  return (
    <Container>
      <TopComment>
        <Avatar
          alt="Remy Sharp"
          src={user?.image}
          onClick={() => navigate(`/profile/${user?.username}`)}
          style={{ cursor: "pointer" }}
        />
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Write your comment here..."
          autoFocus={props.isReply}
          style={{
            width: "100%",
            marginLeft: "10px",
            border: "1px solid #e1e1e1",
            borderRadius: "5px",
            padding: "10px",
            fontFamily: "arial",
          }}
          onChange={(e) => setTextComment(e.target.value)}
          value={textComment}
          onKeyDown={(e) => submitEnter(e)}
        />
      </TopComment>
    </Container>
  );
};

const TopComment = styled.div`
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export default InputComment;
