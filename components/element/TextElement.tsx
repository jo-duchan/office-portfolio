import React, { useRef } from "react";
import styled from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import useCollectionStore from "@/stores/collection-store";
import useCurrentIdStore from "@/stores/current-element-store";
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
  const { updateElement } = useCollectionStore(
    useShallow((state) => ({ updateElement: state.updateElement }))
  );
  const currentId = useCurrentIdStore((state) => state.currentId);
  const text = useRef<string>(data.content?.text || "");
  const inner = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const handleChange = (ev: ContentEditableEvent) => {
    text.current = ev.currentTarget.innerText;
  };
  const handleBlur = () => {
    updateElement(
      {
        ...data,
        content: {
          text: text.current,
        },
      },
      data.id
    );
  };
  return (
    <Container className="text-element" $isFoucs={data.id === currentId}>
      <ContentEditable
        className={objectToString(data.option.className)}
        html={text.current}
        innerRef={inner}
        disabled={!editable}
        onChange={handleChange}
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
