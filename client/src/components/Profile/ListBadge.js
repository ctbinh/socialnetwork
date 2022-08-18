import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserService from "../../api/services/User";
import Badge from "./Badge";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import BadgeSkeleton from "./BadgeSkeleton";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";

const ListBadge = () => {
  const [loadingBadges, setLoadingBadges] = useState(true);
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [curBadgeDisplay, setCurBadgeDisplay] = useState("");
  const [canView, setCanView] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    const getBadges = async () => {
      setLoadingBadges(true);
      const data = await UserService.getMyBadges(username);
      if (data.status === "success") {
        setUser(data.data.user);
        setCurBadgeDisplay(data.data.user.badgeDisplay);
        setCanView(true);
        setLoadingBadges(false);
      } else {
        setCanView(false);
        dispatch(
          uiActions.displayAlert({ message: data.message, status: "error" })
        );
      }
    };
    getBadges();
  }, [username,dispatch]);
  return (
    <Container>
      {canView ? (
        <>
          {!loadingBadges ? (
            user.badges.map((item) => {
              return (
                <Badge
                  key={item}
                  name={item}
                  level={user.level}
                  curBadgeDisplay={curBadgeDisplay}
                  setCurBadgeDisplay={setCurBadgeDisplay}
                />
              );
            })
          ) : (
            <>
              <BadgeSkeleton />
              <BadgeSkeleton />
            </>
          )}
        </>
      ) : (
        <BoxWarning>
          <FlutterDashIcon sx={{ mb: 1, fontSize: "100px" }} />
          You are not allowed to view
        </BoxWarning>
      )}
    </Container>
  );
};

const BoxWarning = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 20px;
  margin-bottom: 15px;
  color: gray;
`;
const Container = styled.div`
  padding: 20px;
  padding-bottom: 5px;
  width: 100%;
  background-color: white;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export default ListBadge;
