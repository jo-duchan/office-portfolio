import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useWatch,
  type FieldValues,
  type UseFormRegister,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import { Image } from "@/type/common";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";
import Icons from "@/styles/iconography";
import Visibility from "@/components/common/Visibility";

export interface ImageGropItem {
  name: string;
  content: Image;
}

interface GroupProps {
  label: string;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  items: string[];
  setValue: UseFormSetValue<FieldValues>;
}

interface ItemProps {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  item: string;
  setValue: UseFormSetValue<FieldValues>;
}

function ImageItem({ register, control, item, setValue }: ItemProps) {
  const [url, setUrl] = useState<string>();
  const itemData = useWatch({
    control: control,
    name: item,
  });

  useEffect(() => {
    if (itemData !== undefined && itemData[0] !== undefined) {
      url && URL.revokeObjectURL(url);
      setUrl(URL.createObjectURL(itemData[0]));
    }

    return () => {
      url && URL.revokeObjectURL(url);
    };
  }, [itemData]);

  const handleRemoveImage = () => {
    setValue(item, {});
    setUrl(undefined);
  };

  return (
    <Item>
      <Visibility visible={url !== undefined}>
        <ItemImageWraper onClick={handleRemoveImage}>
          <span>
            <Icons.removeImage width={18} height={18} viewBox={"0 0 24 24"} />
          </span>
          <img src={url} alt={`${item} image`} />
        </ItemImageWraper>
      </Visibility>
      <Visibility visible={url === undefined}>
        <ItemInputBtn>
          <Icons.addImage />
          <input {...register(item)} type="file" />
        </ItemInputBtn>
      </Visibility>
      <ItemLebel>{item}</ItemLebel>
    </Item>
  );
}

function ImageGroup({ label, items, register, control, setValue }: GroupProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <List>
        {items.map((item, index) => (
          <ImageItem
            key={item}
            register={register}
            control={control}
            item={item}
            setValue={setValue}
          />
        ))}
      </List>
    </Container>
  );
}

export default ImageGroup;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.p`
  ${textStyles.label2.bold};
  color: ${colors.neutral[600]};
`;

const List = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 120px;
  padding-block: 16px 12px;
  padding-inline: 24px;
  background-color: ${colors.neutral[0]};
  border-radius: ${`${round.s}px`};
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: fit-content;
`;

const ItemInputBtn = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  background-color: ${colors.neutral[100]};
  border-radius: ${`${round.s}px`};
  cursor: pointer;

  & input {
    display: none;
  }
`;

const ItemImageWraper = styled.div`
  position: relative;
  height: 72px;
  border-radius: ${`${round.s}px`};
  overflow: hidden;

  & img {
    height: 100%;
  }

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: rgba(0, 0, 0, 0.23);
    border-radius: ${`${round.full}px`};
    opacity: 0;
    transition: 200ms ease-in-out;
    transition-property: opacity;
    cursor: pointer;

    svg {
      fill: ${colors.neutral[50]};
    }
  }

  &:hover span {
    opacity: 1;
  }
`;

const ItemLebel = styled.p`
  ${textStyles.label2.medium};
  color: ${colors.neutral[700]};
  text-transform: capitalize;
`;
