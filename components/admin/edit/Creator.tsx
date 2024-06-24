import React from "react";
import styled from "styled-components";
import useCollectionStore from "@/stores/collection-store";
import useCurrentElementStore from "@/stores/current-element-store";
import { useShallow } from "zustand/react/shallow";
import { v4 as uuidv4 } from "uuid";
import { colors, round } from "@/styles/primitive-tokens";
import { CollectionElement } from "@/type/collection";
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
    const id = uuidv4();

    const options: CollectionElement = {
      id,
      tagName: type,
      className: { fontSize: "font-size-14", margin: "margin-all-14" },
      color: "",
      fill: "",
      content: {
        text: "",
      },
    };

    addElement(options, currentId);
    setCurrentId(id);
  };

  const handleAddImageElement = () => {
    const id = uuidv4();

    const image = Array(2).map(() => {
      return {
        key: uuidv4(),
        file: null,
        url: undefined,
      };
    });

    const options: CollectionElement = {
      id,
      tagName: "img",
      className: { margin: "margin-all-14" },
      color: "",
      fill: "",
      content: {
        image,
      },
    };

    addElement(options, currentId);
    setCurrentId(id);
  };

  const handleAddGapElement = () => {
    const id = uuidv4();

    const options: CollectionElement = {
      id,
      tagName: "div",
      className: { margin: "margin-all-14" },
      color: "",
      fill: "",
      content: {},
    };

    addElement(options, currentId);
    setCurrentId(id);
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
