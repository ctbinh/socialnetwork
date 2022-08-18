import styled from "styled-components";

const ImageIcon = styled.img`
  width: 40px;
`;
const TabItem = styled.div`
  min-width: 100px;
  font-size: 16px;
  color: gray;
  padding: 15px 10px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: ${($props) =>
    $props.target === "true" ? "3px solid var(--primary)" : ""};
  color: ${($props) => ($props.target === "true" ? "var(--primary)" : "")};
  cursor: pointer;
`;
const Tabs = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 4px -4px;
`;
const BtnAction = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  background-color: ${($props) =>
    $props.typ === "edit" ? "var(--secondary)" : "var(--primary)"};
  border: none;
  color: ${($props) => ($props.typ === "edit" ? "black" : "white")};
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  width: 150px;
  text-decoration: none;
  text-align: center;
`;
const Action = styled.div`
  display: flex;
  flex-direction: row;
`;
const Body = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const Field = styled.span`
  font-size: 18px;
  color: gray;
  margin-left: 5px;
`;
const NumCount = styled.span`
  font-size: 18px;
  font-weight: bold;
`;
const Counting = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin-right: 15px;
  cursor: pointer;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Name = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-right: 5px;
`;
const TopProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: white;
`;
const CoverImg = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: hidden;
`;
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export {
  ImageIcon,
  TabItem,
  Tabs,
  BtnAction,
  Action,
  Body,
  Field,
  Col,
  Container,
  Counting,
  CoverImg,
  NumCount,
  Row,
  Name,
  TopProfile,
};
