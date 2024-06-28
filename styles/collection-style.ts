import { css } from "styled-components";
import collectionLargeStyle from "@/styles/collection-large";
import collectionSmallStyle from "@/styles/collection-small";

const collectionStyle = css`
  ${({ theme }) =>
    theme.mediaQuery === "large" ? collectionLargeStyle : collectionSmallStyle}
`;

export default collectionStyle;
