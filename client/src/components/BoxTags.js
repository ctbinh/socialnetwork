import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TagService from "../api/services/Tag";
import Tag from "./Tag";

const BoxTags = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      const data = await TagService.fetchPopularTags()
      setTags(data.data.tags);
    };
    fetchTags();
  }, []);

  return (
    <Container>
      <span className="header">Popular Tags</span>
      <Divider sx={{ mt: "10px" }} />
      <ListTag>
        {tags.map((tag) => {
          return (
            <TagItem key={tag._id}>
              <Tag tagName={tag.tagName} size="small" />
              <span className="total">x{tag.count}</span>
            </TagItem>
          );
        })}
      </ListTag>
    </Container>
  );
};

const TagItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 5px;
  margin-top: 5px;
  cursor: pointer;
  .total {
    font-size: 13px;
    margin-left: 2px;
  }
`;
const ListTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const Container = styled.div`
  padding: 20px;
  width: 100%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  box-sizing: border-box;
  height: fit-content;
  border-radius: 3px;
  .header {
    font-size: 16px;
    font-weight: 700;
    color: #474747;
  }
`;

export default BoxTags;
