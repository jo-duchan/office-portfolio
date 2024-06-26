import { css } from "styled-components";

const collectionStyle = css`
  ${({ theme }) => (theme.mediaQuery === "large" ? largeStyle : smallStyle)}
`;

const largeStyle = css`
  // Head
  .collection-head {
    position: relative;
    width: 100%;
    height: fit-content;
    text-align: center;

    .collection-large-img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
    }

    .collection-small-img {
      display: none;
    }

    .text-wrapper {
      position: absolute;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      width: 100%;
      padding-inline: 25%;
      margin-top: 17.1875%;
      display: flex;
      flex-direction: column;
    }

    .title {
      text-align: center;
      font-size: 72px;
      font-weight: 600;
      margin-bottom: 2.60416%;
    }

    .description {
      text-align: center;
      font-size: 24px;
      font-weight: 400;
      line-height: 34px;
      margin-bottom: 10.5208%;
    }

    .keyword {
      font-size: 18px;
      font-weight: 400;
      line-height: 26px;
    }
  }

  // Option Common
  .padding-xl {
    padding-inline: 360px;
  }

  .padding-l {
    padding-inline: 300px;
  }

  .padding-m {
    padding-inline: 228px;
  }

  .padding-s {
    padding-inline: 156px;
  }

  .padding-xs {
    padding-inline: 84px;
  }

  .padding-none {
    padding-inline: none;
  }

  // Option Text
  .text-element {
    h3.font-size-xl {
      font-size: 72px;
      line-height: normal;
      font-weight: 600;
    }

    h3.font-size-l {
      font-size: 60px;
      line-height: normal;
      font-weight: 600;
    }

    h3.font-size-m {
      font-size: 48px;
      line-height: normal;
      font-weight: 700;
    }

    h3.font-size-s {
      font-size: 36px;
      line-height: normal;
      font-weight: 700;
    }

    h3.font-size-xs {
      font-size: 24px;
      line-height: normal;
      font-weight: 700;
    }

    p.font-size-xl {
      font-size: 24px;
      line-height: 34px;
      font-weight: 400;
    }

    p.font-size-l {
      font-size: 20px;
      line-height: 28px;
      font-weight: 400;
    }

    p.font-size-m {
      font-size: 18px;
      line-height: 26px;
      font-weight: 400;
    }

    p.font-size-s {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
    }

    p.font-size-xs {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
    }

    .aline-left {
      text-align: left;
    }

    .aline-center {
      text-align: center;
    }

    .aline-right {
      text-align: right;
    }
  }

  // Option Image
  .image-element {
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: 24px;

    & img {
      display: block;
      object-fit: contain;
    }
  }

  .column-single > img {
    width: 100%;
  }

  .column-double > img {
    width: calc(50% - 12px);
  }

  // Option Gap
  .gap-xl {
    height: 200px;
  }

  .gap-l {
    height: 150px;
  }

  .gap-m {
    height: 100px;
  }

  .gap-s {
    height: 50px;
  }

  .gap-xs {
    height: 25px;
  }
`;

const smallStyle = css`
  // Head
  .collection-head {
    position: relative;
    width: 100%;
    height: fit-content;
    text-align: center;

    .collection-large-img {
      display: none;
    }

    .collection-small-img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
    }

    .text-wrapper {
      position: absolute;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      width: 100%;
      padding-inline: 32px;
      margin-top: 48.33333%;
      display: flex;
      flex-direction: column;
    }

    .title {
      text-align: center;
      font-size: 42px;
      font-weight: 600;
      margin-bottom: 6.66666%;
    }

    .description {
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      margin-bottom: 33.3333%;
    }

    .keyword {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
  }
  // Option Text
  // Option Image
  .image-element {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
`;

export default collectionStyle;
