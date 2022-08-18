import styled from "styled-components";

const Title = styled.h2`
  font-weight: bold;
`;
const Right = styled.div`
  width: 50%;
  padding: 50px;
`;
const Left = styled.div`
  width: 50%;
  padding: 50px;
  border-right: 1px solid #e3e3e3;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100px;
  margin: 0 auto;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-top: 20px;
  background-color: white;
`;

export {Container, Left, Right, Title}