import { createGlobalStyle } from "styled-components";

/**
 * https://www.styled-components.com/docs/api#createglobalstyle
 */
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: Meiryo, Osaka, sans-serif;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
`;
