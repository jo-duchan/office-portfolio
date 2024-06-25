import React, { useRef } from "react";
import styled from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import useCollectionStore from "@/stores/collection-store";
import useCurrentIdStore from "@/stores/current-id-store";
import { useShallow } from "zustand/react/shallow";
import { objectToString } from "@/utils/utils";
import { type HeadingElement, type TextElement } from "@/type/collection";
import { colors } from "@/styles/primitive-tokens";

interface StyledProps {
  $isFoucs: boolean;
}

interface BaseProps extends ElementProps {
  tagName: "h3" | "p";
}

function TextBase({ data, editable, tagName }: BaseProps) {
  const { updateElement, removeElement } = useCollectionStore(
    useShallow((state) => ({
      updateElement: state.updateElement,
      removeElement: state.removeElement,
    }))
  );
  const { currentId, setCurrentId } = useCurrentIdStore(
    useShallow((state) => ({
      currentId: state.currentId,
      setCurrentId: state.setCurrentId,
    }))
  );
  const text = useRef<string>(data.content?.text || "");
  const inner = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const handleChange = (ev: ContentEditableEvent) => {
    text.current = ev.currentTarget.innerText;
  };
  const handleBlur = () => {
    updateElement(
      {
        ...data,
        content: { text: text.current },
      },
      data.id
    );
  };

  const handleRemoveElement = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Backspace" && text.current === "") {
      removeElement(data.id);
      setCurrentId(undefined);
    }
  };

  return (
    <Container className="text-element" $isFoucs={data.id === currentId}>
      <ContentEditable
        className={objectToString(data.option.className)}
        html={text.current}
        innerRef={inner}
        disabled={!editable}
        onChange={handleChange}
        onKeyDown={handleRemoveElement}
        onBlur={handleBlur}
        tagName={tagName}
      />
    </Container>
  );
}

interface ElementProps {
  data: HeadingElement | TextElement;
  editable: boolean;
}

export function HeadingElement({ data, editable }: ElementProps) {
  return <TextBase tagName="h3" editable={editable} data={data} />;
}

export function TextElement({ data, editable }: ElementProps) {
  return <TextBase tagName="p" editable={editable} data={data} />;
}

const Container = styled.div<StyledProps>`
  position: relative;
  width: 100%;
  height: fit-content;

  & * {
    outline: initial;
  }

  & *:empty:before {
    content: "내용을 입력하세요.";
    color: ${colors.neutral[200]};
  }

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
