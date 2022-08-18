import { Divider } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import ListMission from "./ListMission";
import ListBadge from "./ListBadge";
import Icon from '@mui/material/Icon';
import BoxLevel from "./BoxLevel";

const TabMission = () => {
  const [targetTab, setTargetTab] = useState("Missions");
  const changeTab = (tabName) => {
    setTargetTab(tabName);
  };
  return (
    <Container>
      <Left>
        <BoxLevel/>
        <BoxOptions>
          <Title>Your missions</Title>
          <Divider sx={{ my: 1 }} />
          <Option
            target={targetTab === "Missions" ? "true" : "false"}
            onClick={() => changeTab("Missions")}
          >
            <Icon sx={{ color: "var(--primary)", mr: 1 }}>star</Icon> Missions
          </Option>
          <Option
            target={targetTab === "Badges" ? "true" : "false"}
            onClick={() => changeTab("Badges")}
          >
            <Icon sx={{ color: "var(--primary)", mr: 1 }}>military_tech</Icon>
            Badges
          </Option>
        </BoxOptions>
      </Left>
      <Right>
        {targetTab === "Missions" ? <ListMission /> : <ListBadge />}
      </Right>
    </Container>
  );
};

const Option = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: ${($props) =>
    $props.target === "true" ? "var(--target)" : ""};
`;
const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
const BoxOptions = styled.div`
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 75%;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 500px;
`;

export default TabMission;
