import React from "react";
import styled from "styled-components";
import useCollectionStore from "@/stores/collection-store";
import useCurrentElementStore from "@/stores/current-element-store";
import { useShallow } from "zustand/react/shallow";
import { getId } from "@/utils/utils";
import {
  type HeadingElement,
  type TextElement,
  type ImageElement,
  type GapElement,
} from "@/type/collection";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";
import Icons from "@/styles/iconography";

function Creator() {
  const { addElement } = useCollectionStore(
    useShallow((state) => ({ addElement: state.addElement }))
  );
  const { currentId, setCurrentId } = useCurrentElementStore(
    useShallow((state) => ({
      currentId: state.currentId,
      setCurrentId: state.setCurrentId,
    }))
  );

  const handleAddTextElement = (type: "h3" | "p") => {
    const elementId = getId();
    const initialFontSize = type === "h3" ? "heading-size-m" : "text-size-m";

    const options: HeadingElement | TextElement = {
      id: elementId,
      elementName: type,
      option: {
        className: {
          fontSize: initialFontSize,
          margin: "margin-all-14",
          aline: "text-aline-center",
        },
        color: "",
        fill: "",
      },
      content: {
        text: "",
      },
    };

    addElement(options, currentId);
    setCurrentId(elementId);
  };

  const handleAddImageElement = () => {
    const elementId = getId();

    const image = [...Array(2)].map(() => {
      return {
        key: getId(),
        file: null,
        url: undefined,
      };
    });

    const options: ImageElement = {
      id: elementId,
      elementName: "img",
      option: {
        className: { column: "image-column-double", margin: "margin-all-14" },
        fill: "",
      },
      content: {
        image,
      },
    };

    addElement(options, currentId);
    setCurrentId(elementId);
  };

  const handleAddGapElement = () => {
    const elementId = getId();

    const options: GapElement = {
      id: elementId,
      elementName: "gap",
      option: {
        className: { gap: "gap-xl" },
        fill: "",
      },
      content: {},
    };

    addElement(options, currentId);
    setCurrentId(elementId);
  };

  return (
    <Container>
      <OptionTitle>Create Element</OptionTitle>
      <Buttons>
        <CreateButton onClick={() => handleAddTextElement("h3")}>
          <Icons.heading />
        </CreateButton>
        <CreateButton onClick={() => handleAddTextElement("p")}>
          <Icons.text />
        </CreateButton>
        <CreateButton onClick={handleAddImageElement}>
          <Icons.image />
        </CreateButton>
        <CreateButton onClick={handleAddGapElement}>
          <Icons.gap />
        </CreateButton>
      </Buttons>
    </Container>
  );
}

export default Creator;

const Container = styled.div``;

const OptionTitle = styled.h3`
  ${textStyles.label2.bold};
  color: ${colors.neutral[100]};
  margin-bottom: 8px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 4px;
`;

const CreateButton = styled.button.attrs({
  type: "button",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  outline: initial;
  border: initial;
  background-color: ${colors.neutral[600]};
  border-radius: ${`${round.s}px`};
  cursor: pointer;
  user-select: none;
  transition: 200ms ease-in-out;
  transition-property: background-color;

  & svg :is(path) {
    fill: ${colors.neutral[100]};
  }

  &:active {
    background-color: ${colors.neutral[500]};
  }
`;
