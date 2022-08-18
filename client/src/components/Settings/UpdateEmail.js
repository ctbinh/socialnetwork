import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import UserService from "../../api/services/User";
import { uiActions } from "../../store/ui";
import { authActions } from "../../store/auth";
import Modal from "./Modal";

const UpdateEmail = () => {
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [openReEnterPass, setOpenReEnterPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const enterEmail = () => {
    setOpenReEnterPass(true);
  };
  const changeEmail = async () => {
    if(loading) return
    setLoading(true)
    const data = await UserService.changeEmail({ email, password });
    setLoading(false)
    if (data.status === "success") {
      setOpenEditEmail(false);
      setOpenReEnterPass(false);
      dispatch(
        uiActions.displayAlert({
          message: "Change email successfully.",
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
    }
  };
  return (
    <>
      <EditBtn onClick={() => setOpenEditEmail(true)}>Edit</EditBtn>
      <Modal
        title="Change your email"
        submitBtnText="Change"
        open={openEditEmail}
        contentText={"Enter your new email here."}
        type="email"
        submit={() => enterEmail()}
        setOpen={setOpenEditEmail}
        value={email}
        onChange={setEmail}
      />
      <Modal
        title="Enter your password"
        submitBtnText="Submit"
        open={openReEnterPass}
        contentText={
          "For your security, you must re-enter your password to continue."
        }
        setOpen={setOpenReEnterPass}
        submit={() => changeEmail()}
        type="password"
        value={password}
        onChange={setPassword}
        loading={loading}
      />
    </>
  );
};

const EditBtn = styled.button`
  background-color: white;
  color: var(--primary);
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding: 10px;
`;

export default UpdateEmail;
