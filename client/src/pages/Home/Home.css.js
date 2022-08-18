import styled from "styled-components";

const TabItem = styled.div`
  min-width: 100px;
  font-size: 16px;
  color: gray;
  padding-bottom: 10px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: ${($props) =>
    $props.target === "true" ? "3px solid var(--primary)" : ""};
  color: ${($props) => ($props.target === "true" ? "var(--primary)" : "")};
  cursor: pointer;
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 10px 20px;
  padding-bottom: 0px;
  margin-bottom: 20px;
  border-radius: 5px;
`;
const Body = styled.div`
  display: flex;
  flex-direction: row;
`;
const BoxTag = styled.div`
  width: 25%;
`;
const BtnAdd = styled.button`
  font-size: 16px;
  background-color: var(--primary);
  border: none;
  color: white;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  width: 150px;
  text-decoration: none;
  text-align: center;
  margin-bottom: 20px;
`;
const ListArticle = styled.div`
  width: 75%;
  margin-right: 20px;
  border-radius: 5px;
`;
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export {Container, ListArticle, BtnAdd, BoxTag, Body, TabItem, Tabs}