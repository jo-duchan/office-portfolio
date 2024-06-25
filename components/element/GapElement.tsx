import styled from "styled-components";
import useCollectionStore from "@/stores/collection-store";
import useCurrentIdStore from "@/stores/current-id-store";
import { useShallow } from "zustand/react/shallow";
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
  const { removeElement } = useCollectionStore(
    useShallow((state) => ({
      removeElement: state.removeElement,
    }))
  );
  const { currentId, setCurrentId } = useCurrentIdStore(
    useShallow((state) => ({
      currentId: state.currentId,
      setCurrentId: state.setCurrentId,
    }))
  );

  const handleRemoveElement = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Backspace") {
      removeElement(id);
      setCurrentId(undefined);
    }
  };

  return (
    <Container
      className={objectToString(option.className)}
      $isFoucs={id === currentId}
      onKeyDown={handleRemoveElement}
      tabIndex={0}
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
