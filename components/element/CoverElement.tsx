import React from "react";
import styled from "styled-components";
import useCurrentIdStore from "@/stores/current-id-store";
import { useShallow } from "zustand/react/shallow";
import { type CoverElement } from "@/type/collection";
import { colors } from "@/styles/primitive-tokens";

interface Props {
  data: CoverElement;
}

interface StyledProps {
  $isFoucs: boolean;
}

function CoverElement({ data }: Props) {
  const currentId = useCurrentIdStore(useShallow((state) => state.currentId));
  const { title, description, keyword, desktop, mobile } = data.content;
  const { titleColor, descriptionColor, keywordColor } = data.option;

  return (
    <Container className="collection-head" $isFoucs={data.id === currentId}>
      <div className="text-wrapper">
        <h3 className="title" style={{ color: `#${titleColor}` }}>
          {title}
        </h3>
        <p className="description" style={{ color: `#${descriptionColor}` }}>
          {description}
        </p>
        <ul>
          {keyword?.split(",").map((keyword) => (
            <li
              className="keyword"
              key={keyword}
              style={{ color: `#${keywordColor}` }}
            >
              {keyword}
            </li>
          ))}
        </ul>
      </div>
      <img className="collection-large-img" src={desktop.url} />
      <img className="collection-small-img" src={mobile.url} />
    </Container>
  );
}

export default CoverElement;

const Container = styled.div<StyledProps>`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 3px solid ${colors.primary[500]};
    box-sizing: border-box;
    opacity: ${({ $isFoucs }) => ($isFoucs ? 1 : 0)};
    pointer-events: none;
    z-index: 600;
  }
`;
