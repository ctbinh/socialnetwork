import React from "react";
import styled from "styled-components";
import Skeleton from "./Skeleton";

const LoadingArticle = () => {
  return (
    <Container>
      <Row>
        <Skeleton
          w="220px"
          h="130px"
          style={{
            marginRight: "20px",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
        />
        <Col style={{ width: "70%" }}>
          <Row style={{ justifyContent: "space-between" }}>
            <Row>
              <Avatar />
              <Col
                style={{ justifyContent: "space-between", marginLeft: "5px" }}
              >
                <Name />
                <Date />
              </Col>
            </Row>
            <LikeBtn />
          </Row>
          <Title />
          <Row style={{ justifyContent: "space-between" }}>
            <Tag />
            <Row>
              <Tag />
              <Tag style={{ marginLeft: "5px" }} />
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const Tag = styled.div`
  width: 70px;
  height: 25px;
  background-color: var(--load);
  border-radius: 20px;
  margin-top: 10px;
`;
const Title = styled.div`
  width: 80%;
  height: 30px;
  border-radius: 20px;
  margin-top: 15px;
  background-color: var(--load);
`;
const LikeBtn = styled.div`
  background-color: var(--load);
  width: 60px;
  height: 35px;
  border-radius: 10px;
`;
const Date = styled.div`
  background-color: var(--load);
  border-radius: 20px;
  height: 17px;
  width: 150px;
`;
const Name = styled.div`
  background-color: var(--load);
  border-radius: 20px;
  height: 17px;
  width: 100px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
const Avatar = styled.div`
  background-color: var(--load);
  border-radius: 100%;
  height: 40px;
  width: 40px;
`;
const Container = styled.div`
  min-height: 150px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export default LoadingArticle;
