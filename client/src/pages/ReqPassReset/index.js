import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import UserService from "../../api/services/User";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui";
import { Container, Left, Right, Title } from "./ReqPassReset.css";

const ReqPassReset = () => {
  const [email, setEmail] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isEmpty, setIsEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const sendResetPassword = async () => {
    if(loading) return
    if(email === '') {
      setIsEmpty(true)
      return
    }
    setIsEmpty(false)
    setLoading(true)
    const data = await UserService.sendResetPassword({email, redirectUrl: `${process.env.REACT_APP_URL_CLIENT}/passwordReset`})
    setLoading(false)
    if(data.status === 'success') {
      dispatch(
        uiActions.displayAlert({
          status: "success",
          message: data.message,
        })
      );
    }
    else {
      dispatch(
        uiActions.displayAlert({
          status: "error",
          message: data.message,
        })
      );
    }
    console.log(data)
  }

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
          Enter email address to reset your password.
        </p>
        <TextField
          sx={{ mb: 2 }}
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          fullWidth
          error={isEmpty}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          style={{
            borderRadius: 5,
            backgroundColor: "var(--primary)",
            padding: "10px",
            fontSize: "16px",
          }}
          endIcon={loading ? <CircularProgress size={20} color="inherit"/> : <ArrowRightAltIcon />}
          fullWidth
          onClick={sendResetPassword}
        >
          {loading ? '' : "Send"}
        </Button>
      </Right>
    </Container>
  );
};


export default ReqPassReset;
