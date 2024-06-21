import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  type FieldValues,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { v4 as uuidv4 } from "uuid";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";
import Icons from "@/styles/iconography";

interface ChipProps {
  value: string;
  index: number;
  onUpdateItem: (val: string, idx: number) => void;
  onRemoveItem: (idx: number) => void;
}

function Chip({ value, index, onUpdateItem, onRemoveItem }: ChipProps) {
  const text = useRef<string>(value);
  const inner = useRef<HTMLSpanElement>(null);

  const handleChangeText = (ev: ContentEditableEvent) => {
    text.current = ev.target.value;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inner.current?.blur();
      return;
    }
  };

  const handleBlur = () => {
    if (text.current === "") return;
    onUpdateItem(text.current, index);
  };

  const handleClick = () => {
    inner.current?.focus();
  };

  return (
    <ChipItem>
      <ContentEditable
        html={text.current ?? ""}
        innerRef={inner}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onBlur={handleBlur}
        tagName="span"
      />
      <Remove onClick={() => onRemoveItem(index)}>
        <Icons.closeSmall width={18} height={18} viewBox={"0 0 24 24"} />
      </Remove>
    </ChipItem>
  );
}

interface ChipGroupProps {
  label: string;
  name: string;
  initalValue: string[];
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

function ChipGroup({
  label,
  name,
  register,
  setValue,
  initalValue,
}: ChipGroupProps) {
  const [values, setValues] = useState<string[]>(initalValue);

  useEffect(() => {}, []);

  const handleAddItem = () => {
    const isEmptyItem = values.includes("");

    if (!isEmptyItem) {
      setValues((prev) => {
        return [...prev, ""];
      });
    }
  };

  const handleUpdateItem = (val: string, idx: number) => {
    setValues((prev) => {
      const newValue = prev;
      newValue[idx] = val;

      return [...newValue];
    });
  };
  const handleRemoveItem = (idx: number) => {
    const newValue = values;
    newValue.splice(idx, 1);

    setValues(() => {
      return [...newValue];
    });
  };

  useEffect(() => {
    setValue(name, values.join(","));
  }, [values]);

  return (
    <Container>
      <Label>{label}</Label>
      <List>
        {values.map((value, index) => (
          <Chip
            key={uuidv4()}
            value={value}
            index={index}
            onUpdateItem={handleUpdateItem}
            onRemoveItem={handleRemoveItem}
          />
        ))}
        <Add onClick={handleAddItem} type="button">
          <Icons.add
            width={20}
            height={20}
            viewBox={"0 0 24 24"}
            fill={colors.neutral[500]}
          />
        </Add>
      </List>
      <input {...register(name)} type="text" />
    </Container>
  );
}

export default ChipGroup;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  & input {
    display: none;
  }
`;

const Label = styled.p`
  ${textStyles.label2.bold};
  color: ${colors.neutral[600]};
`;

const List = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
  height: 72px;
  padding: 8px 12px;
  background-color: ${colors.neutral[0]};
  border-radius: ${`${round.s}px`};
`;

const Add = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: initial;
  padding: initial;
  outline: initial;
  border-radius: ${`${round.full}px`};
  cursor: pointer;
`;

const Remove = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  background-color: ${colors.red[300]};
  border-radius: ${`${round.full}px`};
  opacity: 0;
  cursor: pointer;
  transition: 200ms ease-in-out;
  transition-property: opacity;

  & svg path {
    fill: ${colors.neutral[0]};
  }
`;

const ChipItem = styled.div`
  position: relative;
  height: fit-content;

  & span {
    display: flex;
    min-width: 30px;
    padding: 4px 10px;
    background-color: ${colors.primary[500]};
    outline: initial;
    border-radius: ${`${round.l}px`};
    color: ${colors.neutral[50]};
    caret-color: ${colors.neutral[50]};
    ${textStyles.body4.medium};
  }

  & span:focus {
    background-color: ${colors.primary[700]};
  }

  &:hover ${Remove} {
    opacity: 1;
  }
`;
