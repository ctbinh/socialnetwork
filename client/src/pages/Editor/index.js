import { Button, Chip, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { uiActions } from "../../store/ui";
import JoditEditor from "jodit-react";
import CircularProgress from "@mui/material/CircularProgress";
import ArticleService from "../../api/services/Article";
import { BgIcon, Container, ListTag, Row } from "./Editor.css";

const Editor = ({ isEdit }) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [body, setBody] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [newTag, setNewTag] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { slug } = useParams();
  const targetArticle = useSelector((state) => state.article.targetArticle);
  const [loading, setLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();
  const addTag = (e) => {
    if (e.code === "Enter") {
      if (newTag.trim() === "") {
        return;
      } else if (tagList.length === 5) {
        dispatch(
          uiActions.displayAlert({
            status: "warning",
            message: "Max tags is 5",
          })
        );
        return;
      } else if (tagList.includes(newTag.trim())) {
        return;
      }
      setTagList([...tagList, newTag.trim()]);
      setNewTag("");
      e.target.value = "";
    }
  };
  const removeTag = (targetTag) => {
    setTagList(tagList.filter((tag) => tag !== targetTag));
  };
  const publish = async () => {
    if (loading) return;
    const dataArticle = {
      title,
      description,
      body,
      tagList,
      thumbnail,
      author: user._id,
    };
    setLoading(true);
    const data = await ArticleService.publishArticle(dataArticle);
    setLoading(false);
    if (data.status === "success") {
      navigate(`/article/${data.data.article.slug}`, { replace: true });
      dispatch(
        uiActions.displayAlert({
          message: "Create article successful.",
          status: "success",
        })
      );
    } else {
      if (data.data?.emptyFields) setEmptyFields(data.data.emptyFields);
      dispatch(
        uiActions.displayAlert({
          message: data.message,
          status: "error",
        })
      );
    }
  };
  const updateArticle = async () => {
    if (loading) return;
    setLoading(true);
    const dataArticle = {};
    if (title !== null) dataArticle.title = title;
    if (description !== null) dataArticle.description = description;
    if (body !== null) dataArticle.body = body;
    if (thumbnail !== null) dataArticle.thumbnail = thumbnail;
    if (tagList) dataArticle.tagList = tagList;
    const data = await ArticleService.updateArticle(dataArticle, slug);
    setLoading(false);
    if (data.status === "success") {
      navigate(`/article/${data.data.article.slug}`, { replace: true });
      dispatch(
        uiActions.displayAlert({
          message: "Update article successful.",
          status: "success",
        })
      );
    } else {
      if (data.data?.emptyFields) setEmptyFields(data.data.emptyFields);
      dispatch(
        uiActions.displayAlert({
          message: data.message,
          status: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (isEdit) {
      setTagList(targetArticle.tagList);
      setThumbnail(targetArticle.thumbnail);
    }
  }, [targetArticle, isEdit]);

  return (
    <Container>
      <TextField
        sx={{ mb: 2 }}
        id="outlined-basic-title"
        label="Article Title"
        variant="outlined"
        error={emptyFields.includes("title")}
        fullWidth
        defaultValue={isEdit ? targetArticle.title : ""}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Row>
        <BgIcon>
          <img
            src={
              thumbnail
                ? thumbnail
                : "https://ruouvangnt.com/wp-content/plugins/nimble-builder/assets/img/default-img.png"
            }
            alt="thumbnail"
            style={{ width: "100%" }}
          />
        </BgIcon>
        <TextField
          sx={{ ml: 2 }}
          id="outlined-basic-thumbnail"
          label="URL of thumbnail"
          variant="outlined"
          error={emptyFields.includes("thumbnail")}
          fullWidth
          defaultValue={isEdit ? targetArticle.thumbnail : ""}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </Row>
      <TextField
        sx={{ mb: 2 }}
        id="outlined-basic-desc"
        label="What's this article about?"
        error={emptyFields.includes("description")}
        variant="outlined"
        fullWidth
        defaultValue={isEdit ? targetArticle.description : ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <JoditEditor
        value={isEdit ? targetArticle.body : ""}
        tabIndex={1}
        onBlur={(newBody) => setBody(newBody)}
      />
      <span
        style={{
          color: "var(--warning)",
          marginTop: "5px",
          display: emptyFields.includes("body") ? "" : "none",
        }}
      >
        Please enter body article.
      </span>
      <TextField
        sx={{ mb: 1, mt: 2 }}
        id="outlined-basic-title"
        label="Enter tags"
        variant="outlined"
        fullWidth
        onChange={(e) => setNewTag(e.target.value)}
        onKeyUp={(e) => addTag(e)}
      />
      <ListTag>
        {tagList.map((tag, idx) => {
          return (
            <Chip
              label={tag}
              sx={{ mr: "2px" }}
              key={idx}
              onDelete={() => removeTag(tag)}
            />
          );
        })}
      </ListTag>
      <Button
        sx={{ mt: 3, p: 1 }}
        variant="contained"
        onClick={isEdit ? updateArticle : publish}
      >
        {loading ? (
          <CircularProgress color="inherit" size={20} />
        ) : isEdit ? (
          "Update article"
        ) : (
          "Publish article"
        )}
      </Button>
    </Container>
  );
};

export default Editor;
