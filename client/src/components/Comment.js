import {
  Avatar,
  CircularProgress,
  Icon,
  Popover,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Reply from "./Reply";
import InputComment from "./InputComment";
import Moment from "react-moment";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { articleActions } from "../store/article";
import CommentService from "../api/services/Comment";
import { uiActions } from "../store/ui";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Comment = ({ comment }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [displayReplies, setDisplayReplies] = useState(false);
  const [replies, setReplies] = useState(null);
  const [loading, setLoading] = useState(false);

  const targetInputComment = useSelector(
    (state) => state.ui.targetInputComment
  );

  const displayInputComment = (commentId) => {
    loadReplies();
    dispatch(uiActions.setTargetInputComment(commentId));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteComment = async () => {
    handleClose();
    const data = await CommentService.deleteComment(slug, comment._id);
    if (data.status === 204) {
      dispatch(articleActions.deleteComment(comment._id));
    } else {
      dispatch(
        uiActions.displayAlert({ message: data.message, status: "error" })
      );
    }
  };

  const likeComment = async () => {
    const data = await CommentService.likeComment(slug, comment._id);
    if (data.status === "success") {
      dispatch(
        articleActions.likeComment({ commentId: comment._id, userId: user._id })
      );
    } else {
      dispatch(
        uiActions.displayAlert({ message: data.message, status: "error" })
      );
    }
  };

  const loadReplies = async () => {
    setLoading(true);
    const data = await CommentService.loadReplies(slug, comment._id);
    setDisplayReplies(true);
    setLoading(false);
    setReplies(data.data.replies);
  };

  const handleDisplayReplies = () => {
    if (!displayReplies) {
      if (!replies) loadReplies();
      else setDisplayReplies(true);
    } else {
      setDisplayReplies(false);
    }
  };

  const updateReplies = (type, reply = null) => {
    if (type === "delete") {
      setReplies(replies.filter((item) => item._id !== reply._id));
    } else if (type === "update") {
      setReplies(
        replies.map((item) => {
          if (item._id === reply._id) {
            return reply;
          } else return item;
        })
      );
    } else if (type === "add") {
      setReplies([...replies, reply]);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Container>
      <Avatar
        alt="Remy Sharp"
        src={comment.author.image}
        onClick={() => navigate(`/profile/${comment.author.username}`)}
        style={{ cursor: "pointer" }}
      />
      <Body>
        <Box>
          <TopBody>
            <Row>
              <Name
                onClick={() => navigate(`/profile/${comment.author.username}`)}
              >
                {comment.author.username}
              </Name>
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
            </Row>
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
          <Content>{comment.body}</Content>
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
        <ReplyComment>
          {comment.replies.length > 0 && (
            <>
              {displayReplies ? (
                <ShortReplies onClick={() => handleDisplayReplies()}>
                  <ArrowDropUpIcon />
                  <span>Hide replies</span>
                </ShortReplies>
              ) : (
                <ShortReplies onClick={() => handleDisplayReplies()}>
                  {loading ? (
                    <CircularProgress
                      size={12}
                      sx={{ mr: 1 }}
                      color="inherit"
                    />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                  <span>View replies</span>
                </ShortReplies>
              )}
            </>
          )}
          {targetInputComment === comment._id && (
            <InputComment
              isReply={true}
              rootComment={comment}
              updateReplies={updateReplies}
            />
          )}
          {displayReplies &&
            replies?.map((rep, idx) => {
              return (
                <Reply
                  key={idx}
                  comment={rep}
                  rootComment={comment}
                  updateReplies={updateReplies}
                />
              );
            })}
        </ReplyComment>
      </Body>
    </Container>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
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
const ShortReplies = styled.div`
  display: flex;
  flex-direction: row;
  color: gray;
  align-items: center;
  cursor: pointer;
`;
const ReplyComment = styled.div`
  border-left: 1px solid #e1e1e1;
  padding-left: 10px;
  margin-top: 10px;
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
  margin-left: 5px;
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
  :hover {
    color: var(--primary);
  }
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

export default Comment;
