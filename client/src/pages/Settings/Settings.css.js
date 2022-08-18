import styled from "styled-components";

const BgIcon = styled.div`
  width: 120px;
  height: 50px;
  overflow: hidden;
  border-radius: 5px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;
const Content = styled.div`
  width: 70%;
  padding: 10px 30px;
  box-sizing: border-box;
`;
const Title = styled.h2`
  margin: 0;
  padding: 10px;
`;
const Option = styled.div`
  cursor: pointer;
  :hover {
    background-color: #f0f2f5;
  }
  padding: 10px;
  border-radius: 5px;
  background-color: ${($props) =>
    $props.target === "true" ? "#F0F2F5" : "none"};
`;
const Options = styled.div`
  width: 30%;
  border-right: 1px solid #e1e1e1;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 5px;
  background-color: white;
`;

export { Container, Option, Options, BgIcon, Row, Content, Title };
