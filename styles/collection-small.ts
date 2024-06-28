import { css } from "styled-components";

const cover = css`
  .collection-cover {
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
`;

const margin = css`
  .padding-xl {
    padding-inline: 44px;
  }

  .padding-l {
    padding-inline: 32px;
  }

  .padding-m {
    padding-inline: 24px;
  }

  .padding-s {
    padding-inline: 20px;
  }

  .padding-xs {
    padding-inline: 16px;
  }

  .padding-none {
    padding-inline: none;
  }
`;

const heading = css`
  .text-element {
    white-space: pre-line;

    h3.font-size-xl {
      font-size: 42px;
      line-height: normal;
      font-weight: 600;
    }

    h3.font-size-l {
      font-size: 36px;
      line-height: normal;
      font-weight: 600;
    }

    h3.font-size-m {
      font-size: 28px;
      line-height: normal;
      font-weight: 700;
    }

    h3.font-size-s {
      font-size: 24px;
      line-height: normal;
      font-weight: 700;
    }

    h3.font-size-xs {
      font-size: 18px;
      line-height: normal;
      font-weight: 700;
    }
  }
`;

const text = css`
  .text-element {
    white-space: pre-line;

    p.font-size-xl {
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
    }

    p.font-size-l {
      font-size: 16px;
      line-height: 22px;
      font-weight: 400;
    }

    p.font-size-m {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
    }

    p.font-size-s {
      font-size: 12px;
      line-height: 17px;
      font-weight: 400;
    }

    p.font-size-xs {
      font-size: 10px;
      line-height: 16px;
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
    flex-direction: column;
    width: 100%;
    gap: 20px;

    & img {
      display: block;
      object-fit: contain;
      width: 100%;
    }
  }
`;

const gap = css`
  .gap-xl {
    height: 120px;
  }

  .gap-l {
    height: 72px;
  }

  .gap-m {
    height: 44px;
  }

  .gap-s {
    height: 24px;
  }

  .gap-xs {
    height: 16px;
  }
`;

const collectionSmallStyle = css`
  ${cover};
  ${margin};
  ${heading};
  ${text};
  ${align};
  ${image};
  ${gap};
`;

export default collectionSmallStyle;
