import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import styled from "styled-components";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {backToTopButton && (
        <Btn onClick={scrollUp}>
          <KeyboardDoubleArrowUpIcon />
          Scroll to Top
        </Btn>
      )}
    </>
  );
};

const Btn = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  :hover {
    text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
      0px -5px 35px rgba(255, 255, 255, 0.3);
  }
`;
export default BackToTopButton;
