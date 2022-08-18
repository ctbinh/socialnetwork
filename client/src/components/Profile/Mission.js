import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@mui/material";
import ProgressBar from "../../components/ProgressBar";
import MissionService from "../../api/services/Mission";
import { useDispatch } from "react-redux";
import { profileActions } from "../../store/profile";

const Mission = ({ mission }) => {
  const [collected, setCollected] = useState(false);
  const dispatch = useDispatch();
  const claimReward = async (mission) => {
    const data = await MissionService.claimReward(mission);
    if (data.status === "success") {
      setCollected(true);
      dispatch(profileActions.updateInfor(data.data.user));
    }
  };
  return (
    <Container>
      <Badge>
        <Icon sx={{ color: "var(--primary)", fontSize: "30px" }}>
          {mission.reward.icon}
        </Icon>
        <Name>{mission.reward.value ? mission.reward.value : ''} {mission.reward.name}</Name>
      </Badge>
      <Col style={{ width: "80%" }}>
        <Title>{mission.name}</Title>
        {mission.collected || collected ? (
          <Btn
            style={{
              backgroundColor: "var(--secondary)",
              color: "black",
              cursor: "default",
            }}
          >
            Completed
          </Btn>
        ) : mission.achieved === mission.expected ? (
          <Btn onClick={() => claimReward(mission)}>Claim</Btn>
        ) : (
          <ProgressBar
            h="30px"
            fontSize="16px"
            value={mission.achieved}
            max={mission.expected}
          />
        )}
      </Col>
    </Container>
  );
};

const Btn = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--primary);
  font-size: 16px;
  color: white;
`;
const Name = styled.span`
  margin-top: 5px;
`;
const Badge = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 18px;
  margin-bottom: 10px;
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

export default Mission;
