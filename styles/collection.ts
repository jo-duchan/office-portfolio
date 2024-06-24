import { css } from "styled-components";

const collectionStyle = css`
  ${({ theme }) => (theme.mediaQuery === "small" ? smallStyle : largeStyle)}
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

  .margin-top-24 {
    margin-top: 24px;
  }

  .margin-btm-24 {
    margin-bottom: 24px;
  }
`;

export default collectionStyle;
