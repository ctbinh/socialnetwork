import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ProgressBar from "../../components/ProgressBar";

const BoxLevel = () => {
  const profile = useSelector((state) => state.profile.profile);

  return (
    <Container>
      <Row style={{ justifyContent: "space-between", marginBottom: "5px" }}>
        <Row>
          {profile.user.level !== 0 && (
            <ImageIcon
              src={require(`../../asset/images/lv${profile.user.level}.png`)}
              alt="icon"
              style={{ marginRight: "5px" }}
            />
          )}
          <Title>Level {profile.user.level}</Title>
        </Row>
        <ImageIcon
          src={require(`../../asset/images/lv${
            profile.user.level + 1
          }.png`)}
          alt="icon"
        />
      </Row>
      <ProgressBar value={profile.user.curExp} max={profile.user.expNeeded} />
    </Container>
  );
};
const Title = styled.span`
  font-weight: bold;
`;
const ImageIcon = styled.img`
  width: 30px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Container = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-bottom: 10px;
  padding: 10px;
`;

export default BoxLevel;
