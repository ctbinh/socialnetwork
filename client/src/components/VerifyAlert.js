import { Alert, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserService from "../api/services/User";
import { authActions } from "../store/auth";
import { uiActions } from "../store/ui";

const VerifyAlert = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const verifyEmail = async () => {
    if(loading) return
    setLoading(true);
    const data = await UserService.verifyEmail();
    setLoading(false);
    if (data.status === "success") {
      dispatch(
        uiActions.displayAlert({ message: data.message, status: "success" })
      );
    }
  };
  useEffect(() => {
    const isVerified = async () => {
      const data = await UserService.getUserData("verified");
      if (data.data.user.verified) {
        dispatch(authActions.verifyEmail());
      }
    };
    isVerified();
  }, [dispatch]);

  return (
    <>
      {loading && <LinearProgress />}
      <Alert severity="info">
        Please verify your email{" "}
        <span
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={verifyEmail}
        >
          here!
        </span>
      </Alert>
    </>
  );
};

export default VerifyAlert;
