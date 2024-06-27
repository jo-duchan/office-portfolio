import React, { useEffect } from "react";
import styled from "styled-components";
import { useWatch, useForm, type FieldValues } from "react-hook-form";
import useCollectionStore from "@/stores/collection-store";
import useCurrentIdStore from "@/stores/current-id-store";
import { useShallow } from "zustand/react/shallow";
import { objectToString, checkImageFileSize } from "@/utils/utils";
import { type ImageElement } from "@/type/collection";
import { Image } from "@/type/common";
import { colors, round } from "@/styles/primitive-tokens";
import Icons from "@/styles/iconography";

interface StyledProps {
  $isFoucs: boolean;
}

interface BaseProps {
  editable: boolean;
  index: number;
  imgData: Image;
  onChange: (imgData: File, index: number) => void;
  onRemove: (index: number) => void;
}

function ImageBase({
  editable,
  index,
  imgData,
  onChange,
  onRemove,
}: BaseProps) {
  const { register, control } = useForm<FieldValues>();
  const imgInput: FieldValues = useWatch({
    name: "img",
    control,
  });

  useEffect(() => {
    imgInput && onChange(imgInput[0], index);
  }, [imgInput]);

  if (!editable && imgData.url) {
    <img src={imgData.url} />;
  }

  if (editable && imgData.url) {
    return (
      <ImageWrapper>
        <RemoveButton onClick={() => onRemove(index)}>
          <Icons.removeImage viewBox={"0 0 24 24"} width={18} height={18} />
        </RemoveButton>
        <img src={imgData.url} loading="lazy" />
      </ImageWrapper>
    );
  }

  return (
    <InputWrapper>
      <AddButton>
        <Icons.addImage />
        <input type="file" {...register("img")} />
      </AddButton>
    </InputWrapper>
  );
}

interface ElementProps {
  data: ImageElement;
  editable: boolean;
}

function ImageElement({ data, editable }: ElementProps) {
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
  const { id, option, content } = data;

  useEffect(() => {
    if (option.className.column === "column-single") {
      // data.content.image[0].key && deleItemList로 체크해서 나중에 삭제
      updateElement(
        {
          ...data,
          content: {
            image: [data.content.image[0]],
          },
        },
        id
      );
    }

    if (option.className.column === "column-double") {
      updateElement(
        {
          ...data,
          content: {
            image: [data.content.image[0], { file: null }],
          },
        },
        id
      );
    }
  }, [option.className.column]);

  const handleChangeImage = (imgData: File, index: number) => {
    if (!checkImageFileSize(imgData.size)) return;

    const newImage = [...content.image];
    if (!newImage) return;
    newImage[index] = {
      key: newImage[index].key,
      file: imgData,
      url: URL.createObjectURL(imgData),
    };

    updateElement(
      {
        ...data,
        content: {
          image: newImage,
        },
      },
      id
    );
  };

  const handleRemoveImage = (index: number) => {
    const newImage = [...content.image];
    newImage[index] = {
      key: newImage[index].key,
      file: null,
      url: undefined,
    };

    updateElement(
      {
        ...data,
        content: { image: newImage },
      },
      id
    );
  };

  const handleRemoveElement = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Backspace") {
      // key 체크해서 있으면 -> deleItemList 저장 나중에 삭제
      removeElement(id);
      setCurrentId(undefined);
    }
  };

  return (
    <Container
      className={`image-element ${objectToString(option.className)}`}
      $isFoucs={id === currentId}
      onKeyDown={handleRemoveElement}
      tabIndex={0}
      style={{
        background: `#${data.option.fill}`,
      }}
    >
      {content?.image?.map((img, index) => (
        <ImageBase
          key={index}
          editable={editable}
          index={index}
          imgData={img}
          onChange={handleChangeImage}
          onRemove={handleRemoveImage}
        />
      ))}
    </Container>
  );
}

export default ImageElement;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 320px;
  background-color: ${colors.neutral[100]};
  border-radius: ${`${round.s}px`};
`;

const AddButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  user-select: none;

  & input {
    display: none;
  }

  & svg path {
    fill: ${colors.neutral[500]};
    transition: 200ms ease-in-out;
    transition-property: fill;
  }

  &:active svg path {
    fill: ${colors.neutral[400]};
  }
`;

const RemoveButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: ${`${round.full}px`};
  background-color: rgba(0, 0, 0, 0.14);
  cursor: pointer;
  user-select: none;
  transition: 200ms ease-in-out;
  transition-property: opacity;

  & svg path {
    fill: ${colors.neutral[50]};
  }
`;

const ImageWrapper = styled.div`
  position: relative;

  & img {
    width: 100%;
  }

  & ${RemoveButton} {
    opacity: 0;
  }

  &:hover ${RemoveButton} {
    opacity: 1;
  }
`;

const Container = styled.div<StyledProps>`
  position: relative;
  width: 100%;
  height: fit-content;
  outline: initial;

  &.column-single ${`:is(${InputWrapper}, ${ImageWrapper})`} {
    width: 100%;
  }

  &.column-double ${`:is(${InputWrapper}, ${ImageWrapper})`} {
    width: calc(50% - 12px);
  }

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
