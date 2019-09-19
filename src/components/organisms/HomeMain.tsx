import React from "react";
import styled from "styled-components";
import logo from "../../images/logo.svg";

type Props = {};

export default (props: Props) => {
  return (
    <Root>
      <div>This is LINE modoki web application.</div>
      <Logo src={logo} alt="logo" />
      <div>Let's enjoy!!</div>
    </Root>
  );
};

const Root = styled.div`
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Size */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  /* Color */
  background-color: #ffffff;
`;

const Logo = styled.img`
  /* Size */
  width: 50%;
  height: auto;
  margin: 20px;
`;
