import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MissionService from "../../api/services/Mission";
import Mission from "./Mission";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import MissionSkeleton from "./MissionSkeleton";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";

const ListMission = () => {
  const [missions, setMissions] = useState([]);
  const { username } = useParams();
  const [canView, setCanView] = useState(true);
  const [loadingMissions, setLoadingMissions] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMissions = async () => {
      setLoadingMissions(true);
      const data = await MissionService.getAllMyMission(username);
      if (data.status === "success") {
        setMissions(data.data.missions);
        setCanView(true);
        setLoadingMissions(false);
      } else {
        setCanView(false);
        dispatch(
          uiActions.displayAlert({ message: data.message, status: "error" })
        );
      }
    };
    getMissions();
  }, [username, dispatch]);

  return (
    <Container>
      {canView ? (
        <>
          {!loadingMissions ? (
            missions.map((item) => {
              return <Mission key={item._id} mission={item} />;
            })
          ) : (
            <>
              <MissionSkeleton />
              <MissionSkeleton />
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
`;

export default ListMission;
