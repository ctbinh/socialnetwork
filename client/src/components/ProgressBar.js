import React from "react";
import styled from "styled-components";

const ProgressBar = ({ h, fontSize, max, value }) => {
  return (
    <Container h={h}>
      <Progress fontSize={fontSize} percent={`${(value / max) * 100}%`}>
        {max ? value + "/" + max : "Max"}
      </Progress>
    </Container>
  );
};

const Progress = styled.div`
  font-size: ${($props) => ($props.fontSize ? $props.fontSize : "13px")};
  width: 100%;
  text-align: center;
  background: linear-gradient(
    90deg,
    #b8daff ${($props) => $props.percent},
    #e8e8e8 ${($props) => $props.percent}
  );
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: #e8e8e8;
  overflow: hidden;
  height: ${($props) => $props.h};
`;

export default ProgressBar;
