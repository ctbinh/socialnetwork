import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "../../components/Comment";
import InputComment from "../../components/InputComment";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Author from "../../components/Author";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BoxTags from "../../components/BoxTags";
import { articleActions } from "../../store/article";
import Tag from "../../components/Tag";
import ArticleService from "../../api/services/Article";
import DetailSkeleton from "./DetailSkeleton";
import { uiActions } from "../../store/ui";
import AlertDialog from "../../components/Detail/AlertDialog";
import BackToTopButton from "../../components/BackToTopButton";

const Detail = () => {
  const { slug } = useParams();
  const [offset, setOffset] = useState(1);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingArticle, setLoadingArticle] = useState(true);
  const targetArticle = useSelector((state) => state.article.targetArticle);
  const comments = useSelector((state) => state.article.comments);
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalComment, setTotalComment] = useState(0);
  const favoriteArticle = async () => {
    const data = await ArticleService.favoriteArticle(slug);
    if (data.status === "success") {
      dispatch(articleActions.target(data.data.article));
    } else {
      dispatch(
        uiActions.displayAlert({ message: data.message, status: "error" })
      );
    }
  };

  const editArticle = () => {
    navigate(`/editor/${slug}`);
  };
  const deleteArticle = async () => {
    setLoading(true);
    const data = await ArticleService.deleteArticle(slug);
    setLoading(false);
    if (data.status === 204) {
      navigate("/", { replace: true });
      dispatch(
        uiActions.displayAlert({
          message: "Delete article successful.",
          status: "success",
        })
      );
    } else {
      dispatch(
        uiActions.displayAlert({
          message: data.message,
          status: "error",
        })
      );
    }
  };

  const loadMoreComment = async () => {
    const data = await ArticleService.loadMoreComment(
      targetArticle._id,
      offset + 1
    );
    setOffset(offset + 1);
    dispatch(articleActions.loadMoreComment(data.comments));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(uiActions.setTargetInputComment(""));
    const fetchArticle = async () => {
      setLoadingArticle(true);
      const data = await ArticleService.getArticle(slug, 1);
      dispatch(articleActions.target(data.article));
      dispatch(articleActions.setComments(data.comments));
      setTotalComment(data.countComment);
      setLoadingArticle(false);
    };
    fetchArticle();
  }, [slug, dispatch]);

  return (
    <Container>
      {loadingArticle ? (
        <DetailSkeleton />
      ) : (
        <Content>
          <AlertDialog
            open={openAlert}
            handleClose={() => setOpenAlert(false)}
            submit={deleteArticle}
            loading={loading}
          />
          <Row>
            <Title>{targetArticle?.title}</Title>
            {targetArticle?.author._id === user?._id && (
              <Actions>
                <EditIcon
                  sx={{ ml: 1 }}
                  style={{ color: "var(--primary)", cursor: "pointer" }}
                  onClick={editArticle}
                />
                <DeleteIcon
                  sx={{ ml: 1 }}
                  style={{ color: "var(--warning)", cursor: "pointer" }}
                  onClick={() => setOpenAlert(true)}
                />
              </Actions>
            )}
          </Row>
          <br />
          <Author article={targetArticle} favoriteArticle={favoriteArticle} />
          <br />
          <Thumbnail
            src={targetArticle?.thumbnail}
            style={{
              display: targetArticle?.thumbnail
                ? targetArticle?.thumbnail
                : "none",
            }}
          />
          <Body
            dangerouslySetInnerHTML={{
              __html: targetArticle ? targetArticle.body : "",
            }}
          />
          <Divider sx={{ my: "10px" }} />
          <Tags>
            <strong>Tags: </strong>
            {targetArticle?.tagList.map((tag, idx) => {
              return <Tag tagName={tag} sx={{ ml: 1, my: "2px" }} key={idx} />;
            })}
          </Tags>
          <Divider sx={{ my: "10px" }} />
          {isAuthenticated && (
            <>
              <InputComment />
            </>
          )}
          {comments?.map((cmt) => {
            return <Comment key={cmt._id} comment={cmt} />;
          })}
          {totalComment > comments.length && (
            <div
              onClick={loadMoreComment}
              style={{ color: "gray", cursor: "pointer" }}
            >
              View more comments
            </div>
          )}
          <BackToTopButton />
        </Content>
      )}
      <Right>
        <BoxTags />
      </Right>
    </Container>
  );
};

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;
const Body = styled.div`
  font-family: sans-serif;
  font-size: 17px;
  & img {
    width: 100%;
    height: auto;
  }
  & iframe {
    width: 100%;
    aspect-ratio: 16/9;
  }
`;
const Actions = styled.div`
  display: flex;
  flex-direction: row;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
`;
const Right = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  width: 75%;
  margin-right: 20px;
  box-sizing: border-box;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Title = styled.h1`
  color: #333333;
`;

export default Detail;
