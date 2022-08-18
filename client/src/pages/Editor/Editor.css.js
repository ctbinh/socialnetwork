import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  align-items: center;
`
const ListTag = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
const BgIcon = styled.div`
  display: flex;
  justify-content: center;
  width: 120px;
  height: 55px;
  overflow: hidden;
  border-radius: 5px;
`;

export {ListTag, Container,Row, BgIcon}