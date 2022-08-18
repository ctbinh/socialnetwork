import { Avatar, CircularProgress, Divider, Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Skeleton from "../../components/Skeleton";
import UserService from "../../api/services/User";
import TabArticles from "../../components/Profile/TabArticles";
import TabMission from "../../components/Profile/TabMission";
import { profileActions } from "../../store/profile";
import {
  ImageIcon,
  TabItem,
  Tabs,
  BtnAction,
  Action,
  Body,
  Field,
  Col,
  Container,
  Counting,
  CoverImg,
  NumCount,
  Row,
  Name,
  TopProfile,
} from "./Profile.css";
import { uiActions } from "../../store/ui";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams();
  const profile = useSelector((state) => state.profile.profile);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [targetTab, setTargetTab] = useState("Articles");
  const [loadingFollow, setLoadingFollow] = useState(false);
  const changeTab = (tabName) => {
    setTargetTab(tabName);
  };
  const follow = async () => {
    setLoadingFollow(true);
    const data = await UserService.follow(username);
    setLoadingFollow(false);
    if (data.status === "success") {
      dispatch(profileActions.follow());
    } else {
      dispatch(uiActions.displayAlert({ message: data.message, status: "error" }));
    }
  };
  const unfollow = async () => {
    setLoadingFollow(true);
    const data = await UserService.unfollow(username);
    setLoadingFollow(false);
    if (data.status === "success") {
      dispatch(profileActions.unfollow());
    } else {
      dispatch(uiActions.displayAlert({ message: data.message, status: "error" }));
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      const data = await UserService.fetchProfile(username);
      setLoadingProfile(false);
      if (data.status === "success") {
        dispatch(profileActions.setProfile(data.data.profile));
      } else {
        dispatch(uiActions.displayAlert({ message: "Something went wrong!", status: "error" }));
      }
    };
    fetchProfile();
  }, [username, dispatch]);
  return (
    <Container>
      <CoverImg>
        {loadingProfile ? (
          <Skeleton w="100%" h="500px" variant="rectangle" />
        ) : (
          <img
            src={profile?.user.bgImage}
            alt="cover_img"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </CoverImg>
      <Body>
        <TopProfile>
          {loadingProfile ? (
            <Skeleton
              w="180px"
              h="180px"
              variant="circular"
              style={{
                marginTop: "-30px",
                marginRight: "5px",
                marginBottom: "5px",
                border: "5px solid white",
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: "180px",
                height: "180px",
                mt: -5,
                mr: 1,
                mb: 1,
                border: "5px solid white",
              }}
              alt="Remy Sharp"
              src={profile?.user.image}
            />
          )}
          <Col>
            <Row style={{ marginBottom: "20px" }}>
              {loadingProfile ? (
                <Skeleton w="150px" h="30px" style={{ borderRadius: "20px" }} />
              ) : (
                <>
                  <Name>{profile?.user.username}</Name>
                  {profile?.user.badgeDisplay === "Level" &&
                    profile?.user.level !== 0 && (
                      <ImageIcon
                        src={require(`../../asset/images/lv${profile?.user.level}.png`)}
                        alt="badge"
                      />
                    )}
                  {profile?.user.badgeDisplay === "Verified" && (
                    <Icon sx={{ color: "var(--primary)", fontSize: "25px" }}>
                      check_circle_icon
                    </Icon>
                  )}
                </>
              )}
            </Row>
            <Row style={{ justifyContent: "space-between" }}>
              <Row>
                <Counting>
                  {loadingProfile ? (
                    <Skeleton
                      w="100px"
                      h="30px"
                      style={{ borderRadius: "20px" }}
                    />
                  ) : (
                    <>
                      <NumCount>{profile?.following}</NumCount>
                      <Field>Following</Field>
                    </>
                  )}
                </Counting>
                <Counting>
                  {loadingProfile ? (
                    <Skeleton
                      w="100px"
                      h="30px"
                      style={{ borderRadius: "20px" }}
                    />
                  ) : (
                    <>
                      <NumCount>{profile?.followers}</NumCount>
                      <Field>Followers</Field>
                    </>
                  )}
                </Counting>
                <Counting>
                  {loadingProfile ? (
                    <Skeleton
                      w="100px"
                      h="30px"
                      style={{ borderRadius: "20px" }}
                    />
                  ) : (
                    <>
                      <NumCount>{profile?.user.totalLikes}</NumCount>
                      <Field>Likes</Field>
                    </>
                  )}
                </Counting>
              </Row>
              {loadingProfile ? (
                <Skeleton w="170px" h="40px" style={{ borderRadius: "20px" }} />
              ) : (
                <Action>
                  {user?.username === username ? (
                    <BtnAction
                      typ="edit"
                      onClick={() => navigate("/settings", { replace: true })}
                    >
                      <EditIcon fontSize="small" sx={{ mr: "5px" }} />
                      Edit profile
                    </BtnAction>
                  ) : (
                    <>
                      {profile?.followed ? (
                        <BtnAction
                          typ="edit"
                          onClick={user ? unfollow : () => navigate("/login")}
                        >
                          {loadingFollow ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : (
                            <>
                              <AssignmentTurnedInIcon
                                fontSize="small"
                                sx={{ m: 0, mr: "5px", fontWeight: "bold" }}
                              />
                              Following
                            </>
                          )}
                        </BtnAction>
                      ) : (
                        <BtnAction
                          typ="follow"
                          onClick={user ? follow : () => navigate("/login")}
                        >
                          {loadingFollow ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : (
                            <>
                              <AddCircleIcon
                                fontSize="small"
                                sx={{ m: 0, mr: "5px", fontWeight: "bold" }}
                              />
                              Follow
                            </>
                          )}
                        </BtnAction>
                      )}
                    </>
                  )}
                </Action>
              )}
            </Row>
          </Col>
        </TopProfile>
        <Divider />
        <Tabs>
          <TabItem
            target={targetTab === "Articles" ? "true" : "false"}
            onClick={() => changeTab("Articles")}
          >
            Articles
          </TabItem>
          <TabItem
            target={targetTab === "Mission" ? "true" : "false"}
            onClick={() => changeTab("Mission")}
          >
            Mission
          </TabItem>
        </Tabs>
        <br />
        {targetTab === "Articles" ? (
          <TabArticles profile={profile} />
        ) : (
          <TabMission />
        )}
      </Body>
    </Container>
  );
};

export default Profile;
