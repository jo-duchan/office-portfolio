import { css } from "styled-components";

const cover = css`
  .collection-cover {
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
`;

const margin = css`
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
`;

const heading = css`
  .text-element {
    white-space: pre-line;

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
  }
`;

const text = css`
  .text-element {
    white-space: pre-line;

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
  }
`;

const align = css`
  .text-element {
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
`;

const image = css`
  .image-element {
    display: flex;
    justify-content: flex-start;
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
`;

const gap = css`
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

const collectionLargeStyle = css`
  ${cover};
  ${margin};
  ${heading};
  ${text};
  ${align};
  ${image};
  ${gap};
`;

export default collectionLargeStyle;
