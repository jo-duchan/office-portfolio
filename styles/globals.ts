import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const fontFamily = `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`;

const GlobalStyle = createGlobalStyle`
    ${reset};

    html, body, #__next {
        width: 100%;
        height: 100%;
    }

    body {
        font-family: ${fontFamily};
    }
`;

export default GlobalStyle;
