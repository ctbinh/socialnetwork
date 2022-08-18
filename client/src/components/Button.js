import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const Button = (props) => {
  return (
    <>
      {props.loading ? (
        <Container align={props.align} typ={props.typ} onClick={props.onClick}>
          <CircularProgress size={20} color="inherit"/>
        </Container>
      ) : (
        <Container align={props.align} typ={props.typ} onClick={props.onClick}>
          {props.text}
        </Container>
      )}
    </>
  );
};

const Container = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${($props) => ($props.align === "right" ? "auto" : "0")};
  font-size: 16px;
  font-weight: bold;
  background-color: ${($props) =>
    $props.typ === "edit" ? "var(--secondary)" : "var(--primary)"};
  border: none;
  color: ${($props) => ($props.typ === "edit" ? "black" : "white")};
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  min-width: 150px;
  text-decoration: none;
  text-align: center;
`;
export default Button;
