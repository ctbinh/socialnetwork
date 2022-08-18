import React from "react";
import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

const MissionSkeleton = () => {
  return (
    <Container>
      <Badge>
        <Skeleton w="100%" h="70px" style={{ borderRadius: "20px" }} />
      </Badge>
      <Col style={{ width: "80%" }}>
        <Skeleton
          w="80%"
          h="30px"
          style={{ borderRadius: "20px", marginBottom: "10px" }}
        />
        <Skeleton w="100%" h="30px" style={{ borderRadius: "20px" }} />
      </Col>
    </Container>
  );
};

const Badge = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  background-color: white;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #e1e1e1;
  padding: 10px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default MissionSkeleton;
