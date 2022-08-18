import { Divider } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

const DetailSkeleton = () => {
  return (
    <Container>
      <Skeleton w="50%" h="30px" style={{ borderRadius: "20px" }} />
      <Row style={{ marginTop: "20px", justifyContent: "space-between" }}>
        <Row>
          <Skeleton w="40px" h="40px" variant="circular" />
          <Col style={{ marginLeft: "10px" }}>
            <Skeleton w="80px" h="15px" style={{ borderRadius: "10px" }} />
            <Skeleton
              w="100px"
              h="15px"
              style={{ borderRadius: "10px", marginTop: "5px" }}
            />
          </Col>
        </Row>
        <Skeleton w="60px" h="30px" style={{ borderRadius: "10px" }} />
      </Row>
      <Skeleton
        w="100%"
        h="300px"
        style={{ borderRadius: "10px", marginTop: "10px" }}
      />
      <Divider sx={{ my: 1 }} />
      <Row>
        <Skeleton
          w="80px"
          h="30px"
          style={{ borderRadius: "20px", marginRight: "5px" }}
        />
        <Skeleton
          w="80px"
          h="30px"
          style={{ borderRadius: "20px", marginRight: "5px" }}
        />
        <Skeleton
          w="80px"
          h="30px"
          style={{ borderRadius: "20px", marginRight: "5px" }}
        />
      </Row>
      <Divider sx={{ my: 1 }} />
      <Row style={{alignItems: 'stretch'}}>
        <Skeleton w="40px" h="40px" variant="circular" style={{marginRight: '10px'}} />
        <Skeleton h="50px" style={{ borderRadius: "5px", flex: '1' }} />
      </Row>
      <Row style={{alignItems: 'stretch', marginTop: '10px'}}>
        <Skeleton w="40px" h="40px" variant="circular" style={{marginRight: '10px'}} />
        <Skeleton h="50px" style={{ borderRadius: "5px", flex: '1' }} />
      </Row>
    </Container>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  width: 75%;
  margin-right: 20px;
  box-sizing: border-box;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export default DetailSkeleton;
