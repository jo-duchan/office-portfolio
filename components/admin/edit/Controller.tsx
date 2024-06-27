import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, type FieldValues } from "react-hook-form";
import useCollectionStore from "@/stores/collection-store";
import useCurrentIdStore from "@/stores/current-id-store";
import { useShallow } from "zustand/react/shallow";
import { type CollectionElement } from "@/type/collection";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";
import DefaultController from "@/components/admin/edit/DefaultController";
import CoverController from "@/components/admin/edit/CoverController";
import TextController from "@/components/admin/edit/TextController";
import ImageController from "@/components/admin/edit/ImageController";
import GapController from "@/components/admin/edit/GapController";
import Visibility from "@/components/common/Visibility";

type HashMap = Map<string, CollectionElement>;

function Controller() {
  const { register, handleSubmit, watch, reset, setValue, getValues } =
    useForm<FieldValues>();
  const [elementHash, setElementHash] = useState<HashMap>();
  const collection = useCollectionStore(
    useShallow((state) => state.collection)
  );
  const currentId = useCurrentIdStore(useShallow((state) => state.currentId));
  const currentElement = elementHash?.get(currentId || "");

  useEffect(() => {
    const hashMap = collection.reduce((map, element) => {
      map.set(element.id, { ...element });
      return map;
    }, new Map());

    setElementHash(hashMap);
  }, [collection]);

  // 부모에서 받아오기
  const handleUpdateDatabase = () => {};

  const renderController = () => {
    if (currentElement === undefined) {
      return (
        <DefaultController
          register={register}
          watch={watch}
          reset={reset}
          setValue={setValue}
          getValues={getValues}
        />
      );
    }

    const { elementName } = currentElement;

    if (elementName === "cover") {
      return (
        <CoverController
          currentData={currentElement}
          register={register}
          watch={watch}
          reset={reset}
          getValues={getValues}
        />
      );
    }

    if (elementName === "h3" || elementName === "p") {
      return (
        <TextController
          currentData={currentElement}
          register={register}
          watch={watch}
          reset={reset}
          setValue={setValue}
          getValues={getValues}
        />
      );
    }

    if (elementName === "img") {
      return (
        <ImageController
          currentData={currentElement}
          register={register}
          watch={watch}
          reset={reset}
          setValue={setValue}
          getValues={getValues}
        />
      );
    }

    if (elementName === "gap") {
      return (
        <GapController
          currentData={currentElement}
          register={register}
          watch={watch}
          reset={reset}
          setValue={setValue}
          getValues={getValues}
        />
      );
    }
  };

  return (
    <Container>
      <Visibility visible={currentElement === undefined}>
        <OptionTitle>Default Options</OptionTitle>
      </Visibility>
      <Visibility visible={currentElement !== undefined}>
        <OptionTitle>Options</OptionTitle>
      </Visibility>
      <Divider />
      <form onSubmit={handleSubmit(handleUpdateDatabase)}>
        {renderController()}
      </form>
    </Container>
  );
}

export default Controller;

const Container = styled.div`
  flex: 1;
  margin-top: 60px;

  & form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-block: 16px;
  }
`;

const OptionTitle = styled.h3`
  ${textStyles.label2.bold};
  color: ${colors.neutral[100]};
  margin-bottom: 8px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.neutral[600]};
`;

export const ControllerOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 40px;
  padding: 8px 20px;
  background-color: transparent;
  border-radius: ${`${round.s}px`};
  transition: 200ms ease-in-out;
  transition-property: background-color;

  & .control-label {
    width: 60px;
    min-width: 60px;
    ${textStyles.label2.bold};
    color: ${colors.neutral[100]};
  }

  &:hover {
    background-color: ${colors.neutral[600]};
  }
`;
