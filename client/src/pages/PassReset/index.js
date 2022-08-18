import React, { useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import UserService from "../../api/services/User";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { uiActions } from "../../store/ui";
import { Container, Left, Right, Title } from "./PassReset.css";

const PassReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { userId, resetString } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const resetPassword = async () => {
    if (loading) return;
    if (password === "" || passwordConfirm === "") {
      dispatch(
        uiActions.displayAlert({
          status: "error",
          message: "Please fill in all the fields",
        })
      );
      return;
    }
    if (password !== passwordConfirm) {
      dispatch(
        uiActions.displayAlert({
          status: "error",
          message: "Password not match",
        })
      );
      return;
    }
    setLoading(true);
    const data = await UserService.resetPassword({
      userId,
      resetString,
      newPassword: password,
    });
    setLoading(false);
    if (data.status === "success") {
      dispatch(
        uiActions.displayAlert({
          status: "success",
          message: data.message,
        })
      );
    } else {
      dispatch(
        uiActions.displayAlert({
          status: "error",
          message: data.message,
        })
      );
    }
    console.log(data);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      {isAuthenticated && <Navigate to="/" replace={true} />}
      <Left>
        <img
          style={{ width: "100%" }}
          alt="img"
          src="http://techydevs.com/demos/themes/html/disilab-demo/disilab/images/undraw-remotely.svg"
        />
      </Left>
      <Right>
        <Title>Reset Password</Title>
        <Divider sx={{ my: 1 }} />
        <p style={{ color: "gray", marginBottom: "15px" }}>
          Enter your new password.
        </p>
        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
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
          <InputLabel htmlFor="outlined-adornment-password-confirm">
            Confirm password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-confirm"
            type={showPassword ? "text" : "password"}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            label="Confirm password"
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
        <Button
          variant="contained"
          size="large"
          style={{
            borderRadius: 5,
            backgroundColor: "var(--primary)",
            padding: "10px",
            fontSize: "16px",
          }}
          endIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <ArrowRightAltIcon />
            )
          }
          fullWidth
          onClick={resetPassword}
        >
          {loading ? "" : "Send"}
        </Button>
      </Right>
    </Container>
  );
};

export default PassReset;
