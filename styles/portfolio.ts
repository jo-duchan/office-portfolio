import { css } from "styled-components";

const portfolioStyle = css`
  ${(props) => (props.theme.mediaQuery === "small" ? smallStyle : largeStyle)}
`;

const smallStyle = css`
  .font-size-14 {
    color: rebeccapurple;
  }
`;

const largeStyle = css`
  .font-size-14 {
    color: goldenrod;
  }
`;

export default portfolioStyle;
