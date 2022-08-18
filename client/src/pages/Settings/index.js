import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Avatar,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserService from "../../api/services/User";
import { authActions } from "../../store/auth";
import { uiActions } from "../../store/ui";
import Button from "../../components/Button";
import {
  BgIcon,
  Container,
  Content,
  Option,
  Options,
  Row,
  Title,
} from "./Settings.css";
import UpdateEmail from "../../components/Settings/UpdateEmail";

const Settings = () => {
  const [targetTab, setTargetTab] = useState("general");
  const user = useSelector((state) => state.auth.user);
  const userUpdate = useSelector((state) => state.auth.userUpdate);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const dispatch = useDispatch();
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const updateInfor = async () => {
    if (loading) return;
    setEmptyFields([]);
    setLoading(true);
    const body = {};
    if (userUpdate.username !== user.username)
      body.username = userUpdate.username;
    if (userUpdate.bio !== user.bio) body.bio = userUpdate.bio;
    if (userUpdate.image !== user.image) body.image = userUpdate.image;
    if (userUpdate.bgImage !== user.bgImage) body.bgImage = userUpdate.bgImage;
    const data = await UserService.updateInfor(body);
    setLoading(false);
    if (data.status === "success") {
      dispatch(
        uiActions.displayAlert({
          message: "Update information successful.",
          status: "success",
        })
      );
      dispatch(authActions.updateInfor({ user: data.data.user }));
    } else {
      dispatch(
        uiActions.displayAlert({
          message: data.message,
          status: "error",
        })
      );
      setEmptyFields(data?.data?.emptyFields ? data?.data?.emptyFields : []);
    }
  };
  const changePassword = async () => {
    if (loading) return;
    setEmptyFields([]);
    if (newPassword !== confirmPassword) {
      dispatch(
        uiActions.displayAlert({
          message: "Passwords are not the same.",
          status: "error",
        })
      );
      return;
    }
    if (newPassword.length < 8) {
      dispatch(
        uiActions.displayAlert({
          message: "Password length must be greater than or equal to 8.",
          status: "error",
        })
      );
      return;
    }
    setLoading(true);
    const body = {
      curPassword: password,
      newPassword,
      confirmPassword,
    };
    const data = await UserService.changePassword(body);
    setLoading(false);
    if (data.status === "success") {
      dispatch(
        uiActions.displayAlert({
          message: "Change password successful.",
          status: "success",
        })
      );
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      dispatch(
        uiActions.displayAlert({
          message: data.message,
          status: "error",
        })
      );
      setEmptyFields(data?.data?.emptyFields ? data?.data?.emptyFields : []);
    }
  };
  useEffect(() => {
    if (isAuthenticated) dispatch(authActions.setUserUpdate(user));
  }, [dispatch, user, isAuthenticated]);

  return (
    <>
      {!isAuthenticated && <Navigate to="/" replace={true} />}
      <Container>
        <Options>
          <Title>Settings</Title>
          <Option
            target={targetTab === "general" ? "true" : "false"}
            onClick={() => setTargetTab("general")}
          >
            General
          </Option>
          <Option
            target={targetTab === "changepass" ? "true" : "false"}
            onClick={() => setTargetTab("changepass")}
          >
            Change password
          </Option>
        </Options>
        <Content>
          <Title>
            {targetTab === "general"
              ? "General Account Settings"
              : "Change Password"}
          </Title>
          <Divider sx={{ mb: 2 }} />
          {targetTab === "general" ? (
            <>
              <Row>
                <Avatar alt="Remy Sharp" src={userUpdate.image} />
                <TextField
                  sx={{ ml: 2 }}
                  id="outlined-basic-url"
                  label="URL of profile picture"
                  variant="outlined"
                  fullWidth
                  defaultValue={userUpdate.image}
                  onChange={(e) =>
                    dispatch(
                      authActions.setUserUpdate({ image: e.target.value })
                    )
                  }
                />
              </Row>
              <Row>
                <BgIcon>
                  <img
                    src={userUpdate.bgImage}
                    alt="bgimg"
                    style={{ width: "100%" }}
                  />
                </BgIcon>
                <TextField
                  sx={{ ml: 2 }}
                  id="outlined-basic-urlbg"
                  label="URL of background picture"
                  variant="outlined"
                  fullWidth
                  defaultValue={userUpdate.bgImage}
                  onChange={(e) =>
                    dispatch(
                      authActions.setUserUpdate({ bgImage: e.target.value })
                    )
                  }
                />
              </Row>
              <TextField
                sx={{ mb: 2 }}
                id="outlined-basic-username"
                label="Your username"
                variant="outlined"
                fullWidth
                error={emptyFields.includes("username")}
                defaultValue={userUpdate.username}
                onChange={(e) =>
                  dispatch(
                    authActions.setUserUpdate({ username: e.target.value })
                  )
                }
              />
              <TextField
                sx={{ mb: 2 }}
                id="outlined-multiline-bio"
                label="Short bio about you"
                multiline
                rows={8}
                onChange={(e) =>
                  dispatch(authActions.setUserUpdate({ bio: e.target.value }))
                }
                variant="outlined"
                fullWidth
                defaultValue={userUpdate.bio}
              />
              <Row>
                <TextField
                  sx={{ mb: 1 }}
                  id="outlined-basic-email"
                  label="Your email"
                  variant="outlined"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  value={user.email}
                />
                <UpdateEmail />
              </Row>
            </>
          ) : (
            <>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  style={{
                    color: emptyFields.includes("curPassword")
                      ? "var(--warning)"
                      : "",
                  }}
                  htmlFor="outlined-adornment-password"
                >
                  Current password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Current password"
                  error={emptyFields.includes("curPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  style={{
                    color: emptyFields.includes("newPassword")
                      ? "var(--warning)"
                      : "",
                  }}
                >
                  New password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-newpassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  error={emptyFields.includes("newPassword")}
                  onChange={(e) => setNewPassword(e.target.value)}
                  label="New password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  style={{
                    color: emptyFields.includes("confirmPassword")
                      ? "var(--warning)"
                      : "",
                  }}
                >
                  Confirm new password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirmnewpassword"
                  type={showNewPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={emptyFields.includes("confirmPassword")}
                  label="Confirm new password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </>
          )}
          <Button
            onClick={targetTab === "general" ? updateInfor : changePassword}
            align="right"
            loading={loading}
            text={
              targetTab === "general" ? "Update Settings" : "Update Password"
            }
          />
        </Content>
      </Container>
    </>
  );
};

export default Settings;
