import { Avatar, Icon, Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InputComment from "./InputComment";
import Moment from "react-moment";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentService from "../api/services/Comment";
import { uiActions } from "../store/ui";

const Reply = ({ comment, rootComment, updateReplies }) => {
  const [isViewParent, setIsViewParent] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const targetInputComment = useSelector(
    (state) => state.ui.targetInputComment
  );
  const { slug } = useParams();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteComment = async () => {
    handleClose();
    const data = await CommentService.deleteComment(
      slug,
      comment._id,
      rootComment._id
    );
    if (data.status === 204) {
      updateReplies("delete", comment);
    } else {
      dispatch(
        uiActions.displayAlert({ message: data.message, status: "error" })
      );
    }
  };
  const displayInputComment = (commentId) => {
    dispatch(uiActions.setTargetInputComment(commentId));
  };
  const likeComment = async () => {
    const data = await CommentService.likeComment(slug, comment._id);
    if (data.status === "success") {
      updateReplies("update", data.data.comment);
    } else {
      dispatch(
        uiActions.displayAlert({ message: data.message, status: "error" })
      );
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Container>
      <Avatar alt="Remy Sharp" src={comment.author.image} />
      <Body>
        <Box>
          <TopBody>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Name>{comment.author.username}</Name>
              {comment.author.badgeDisplay === "Level" &&
                comment.author.level !== 0 && (
                  <ImageIcon
                    src={require(`../asset/images/lv${comment.author.level}.png`)}
                    alt="badge"
                  />
                )}
              {comment.author.badgeDisplay === "Verified" && (
                <Icon sx={{ color: "var(--primary)", fontSize: "13px" }}>
                  check_circle_icon
                </Icon>
              )}
              <Date>
                <Moment fromNow>{comment.createdAt}</Moment>
              </Date>
              <KeyboardArrowDownIcon
                fontSize="small"
                onClick={() => setIsViewParent(!isViewParent)}
              />
            </div>
            {comment.author._id === user?._id && (
              <>
                <MoreHorizIcon
                  fontSize="medium"
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                />
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Typography
                    sx={{ p: 1 }}
                    onClick={deleteComment}
                    style={{ cursor: "pointer" }}
                  >
                    Delete
                  </Typography>
                </Popover>
              </>
            )}
          </TopBody>
          <Content>
            {isViewParent && (
              <BoxReply>
                {comment.parent ? (
                  <>
                    <Name>{comment.parent.author?.username}</Name>
                    <Content>{comment.parent.body}</Content>
                  </>
                ) : (
                  <i style={{ color: "gray" }}>Comment was deleted</i>
                )}
              </BoxReply>
            )}
            {comment.body}
          </Content>
        </Box>
        <Action>
          <BtnAction
            onClick={likeComment}
            style={{
              color: comment.likes.includes(user?._id) ? "var(--primary)" : "",
            }}
          >
            Like
          </BtnAction>
          <BtnAction
            onClick={
              user
                ? () => displayInputComment(comment._id)
                : () => navigate("/login")
            }
          >
            Reply
          </BtnAction>
          <Likes style={{ display: comment.likes.length === 0 ? "none" : "" }}>
            <ThumbUpAltIcon
              sx={{ fontSize: 18, color: "var(--primary)", mr: "2px" }}
            />
            <span style={{ fontSize: "12px", color: "gray" }}>
              {comment.likes.length}
            </span>
          </Likes>
        </Action>
        {targetInputComment === comment._id && (
          <InputComment
            isReply={true}
            rootComment={rootComment}
            parent={comment}
            updateReplies={updateReplies}
          />
        )}
      </Body>
    </Container>
  );
};

const ImageIcon = styled.img`
  width: 17px;
`;
const Likes = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  padding: 2px 4px;
  width: fit-content;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: -20px;
  height: fit-content;
`;
const BoxReply = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 10px 0;
`;
const BtnAction = styled.span`
  font-size: 13px;
  margin-right: 10px;
  color: gray;
  font-weight: bold;
  cursor: pointer;
`;
const Action = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  margin-bottom: 0px;
`;
const Box = styled.div`
  box-sizing: border-box;
  background-color: #f0f2f5;
  width: 100%;
  border-radius: 5px;
  padding: 7px 10px;
`;
const Content = styled.span`
  white-space: pre-line;
`;
const Date = styled.span`
  font-size: 13px;
  color: gray;
  margin: 0 5px;
`;
const TopBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: bold;
  margin-right: 2px;
  cursor: pointer;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export default Reply;
