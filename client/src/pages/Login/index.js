import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { Link, Navigate } from "react-router-dom";
import { uiActions } from "../../store/ui";
import UserService from "../../api/services/User";
import { Container, Left, Right, TextClickable, Title } from "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLogin = useSelector((state) => state.ui.isLogin);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const signup = async (e) => {
    e.preventDefault();
    const dataUser = {
      username,
      password,
      email,
      passwordConfirm,
    };
    const data = await UserService.signup(dataUser);
    if (data.status === "success") {
      dispatch(
        uiActions.displayAlert({
          status: "success",
          message: "Create account successful.",
        })
      );
    } else if (data.status === "error") {
      if (data.data?.emptyFields) {
        setEmptyFields(data.data.emptyFields);
      }
      dispatch(
        uiActions.displayAlert({
          status: "error",
          message: data.message,
        })
      );
    }
  };
  const login = async (e) => {
    e.preventDefault();
    const dataUser = {
      email,
      password,
    };
    const data = await UserService.login(dataUser);
    if (data.user) {
      dispatch(authActions.login({ user: data.user }));
      localStorage.setItem("tokenExpireIn", data.tokenExpireIn);
    } else {
      dispatch(
        uiActions.displayAlert({
          status: "warning",
          message: data.message,
        })
      );
    }
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
        <Title>{isLogin ? "Login" : "Create Account"}</Title>
        <Divider sx={{ my: 1 }} />
        <p style={{ color: "gray", marginBottom: "15px" }}>
          {isLogin
            ? "Enter your email address and login to your account."
            : "Give us some of your information to get free access to RealWorld."}
        </p>
        {!isLogin && (
          <TextField
            sx={{ mb: 2 }}
            id="outlined-basic-username"
            label="Username"
            variant="outlined"
            fullWidth
            error={emptyFields.includes("username")}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <TextField
          sx={{ mb: 2 }}
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          fullWidth
          error={emptyFields.includes("email")}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            error={emptyFields.includes("password")}
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
        {!isLogin && (
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-adornment-password-confirm">
              Confirm password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-confirm"
              type={showPassword ? "text" : "password"}
              value={passwordConfirm}
              error={emptyFields.includes("passwordConfirm")}
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
        )}
        <div style={{ marginBottom: "15px", textAlign: "right" }}>
          <TextClickable as={Link} to="/requestPasswordReset">
            Forgot password?
          </TextClickable>
        </div>

        <Button
          variant="contained"
          size="large"
          style={{
            borderRadius: 5,
            backgroundColor: "var(--primary)",
            padding: "10px",
            fontSize: "16px",
          }}
          endIcon={<ArrowRightAltIcon />}
          fullWidth
          onClick={isLogin ? login : signup}
        >
          {isLogin ? "Login" : "Sign up"}
        </Button>
        {isLogin ? (
          <p style={{ marginTop: "10px" }}>
            Don't have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "var(--primary)" }}
              onClick={() => dispatch(uiActions.signup())}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p style={{ marginTop: "10px" }}>
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "var(--primary)" }}
              onClick={() => dispatch(uiActions.login())}
            >
              Log in
            </span>
          </p>
        )}
      </Right>
    </Container>
  );
};
export default Login;
