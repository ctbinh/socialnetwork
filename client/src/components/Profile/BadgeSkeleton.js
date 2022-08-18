import React from "react";
import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

const BadgeSkeleton = () => {
  return (
    <Container>
      <Logo>
        <Skeleton
          w="100%"
          h="70px"
          style={{ borderRadius: "20px", marginRight: "10px" }}
        />
      </Logo>
      <Skeleton w="100%" h="40px" style={{ borderRadius: "20px" }} />
    </Container>
  );
};

const Logo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  background-color: white;
  border: 1px solid #e1e1e1;
  width: 49%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default BadgeSkeleton;
