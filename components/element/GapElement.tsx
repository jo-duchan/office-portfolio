import styled from "styled-components";
import useCurrentIdStore from "@/stores/current-element-store";
import { type GapElement } from "@/type/collection";
import { objectToString } from "@/utils/utils";
import { colors } from "@/styles/primitive-tokens";

interface ElementProps {
  data: GapElement;
}

interface StyledProps {
  $isFoucs: boolean;
}

function GapElement({ data }: ElementProps) {
  const { id, option } = data;
  const currentId = useCurrentIdStore((state) => state.currentId);

  return (
    <Container
      className={objectToString(option.className)}
      $isFoucs={id === currentId}
    ></Container>
  );
}

export default GapElement;

const Container = styled.div<StyledProps>`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid ${colors.primary[500]};
    box-sizing: border-box;
    opacity: ${({ $isFoucs }) => ($isFoucs ? 1 : 0)};
    pointer-events: none;
    z-index: 600;
  }
`;
