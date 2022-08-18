import { Icon } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import UserService from "../../api/services/User";
import { profileActions } from "../../store/profile";
import { uiActions } from "../../store/ui";
import Button from "../Button";

const Badge = ({ name, level, curBadgeDisplay, setCurBadgeDisplay }) => {
  const dispatch = useDispatch()
  const changeBadgeDisplay = async (name) => {
    if (name === curBadgeDisplay) {
      name = "none";
    }
    const data = await UserService.updateInfor({ badgeDisplay: name });
    if(data.status!=='success') {
      dispatch(uiActions.displayAlert({ message: "Something went wrong!", status: "error" }));
    }
    dispatch(profileActions.displayBadge(name))
    setCurBadgeDisplay(name);
  };

  return (
    <Container
      style={{ display: `${name === "Level" && level === 0 ? "none" : ""}` }}
    >
      <Logo>
        {name === "Level" && level > 0 && (
          <ImageIcon
            src={require(`../../asset/images/lv${level}.png`)}
            alt="icon"
          />
        )}
        {name === "Verified" && level > 0 && (
          <Icon sx={{ color: "var(--primary)", fontSize: "30px", p: 1 }}>
            check_circle_icon
          </Icon>
        )}
        <Name>{name} Badge</Name>
      </Logo>
      <Button
        text={curBadgeDisplay === name ? "Hide" : "Show"}
        typ={curBadgeDisplay === name ? "edit" : ""}
        onClick={() => changeBadgeDisplay(name)}
      />
    </Container>
  );
};

const ImageIcon = styled.img`
  width: 50px;
`;
const Name = styled.span`
  margin-top: 5px;
`;
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

export default Badge;
