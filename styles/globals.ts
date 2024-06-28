import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import collectionStyle from "@/styles/collection-style";

const fontFamily = `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`;

const GlobalStyle = createGlobalStyle`
    ${reset};
    ${collectionStyle};

    html, body, #__next {
        overscroll-behavior: none;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        height: 100%;
    }

    #__next {
        padding-top: 52px;
    }

    body * {
        font-family: ${fontFamily};
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
