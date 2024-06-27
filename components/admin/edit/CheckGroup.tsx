import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormGetValues,
  type FieldValues,
} from "react-hook-form";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";

interface Props {
  theme?: "dark" | "light";
  size?: "small" | "large";
  options: { [key: string]: string };
  name: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

interface StyledProps {
  $active?: boolean;
  $dotOuterSize?: number;
  $itemGap?: number;
  $dotOuterInactiveColor?: string;
  $dotOuterActiveColor?: string;
  $labelColor?: string;
}

function CheckGroup({
  theme = "dark",
  size = "small",
  options,
  name,
  register,
  setValue,
  getValues,
}: Props) {
  const [currentValue, setCurrentValue] = useState<string>();
  useEffect(() => {
    setCurrentValue(getValues(name));
  }, [getValues(name)]);

  const handleSeletValue = (value: string) => {
    setValue(name, value);
    setCurrentValue(value);
  };

  const getSize = () => {
    let dotOuter = 12;
    let itemGep = 12;
    if (size === "large") {
      dotOuter = 14;
      itemGep = 18;
    }

    return { dotOuter, itemGep };
  };

  const getColor = () => {
    let dotOuterInactiv = colors.neutral[500];
    let dotOuterActiv = colors.neutral[100];
    let label = colors.neutral[100];

    if (theme === "light") {
      dotOuterInactiv = colors.neutral[200];
      dotOuterActiv = colors.primary[100];
      label = colors.neutral[700];
    }

    return { dotOuterInactiv, dotOuterActiv, label };
  };

  return (
    <Container $itemGap={getSize().itemGep}>
      {Object.entries(options).map(([key, value]) => (
        <Option
          key={key}
          $labelColor={getColor().label}
          onClick={() => handleSeletValue(value)}
        >
          <Dot
            $active={value === currentValue}
            $dotOuterSize={getSize().dotOuter}
            $dotOuterActiveColor={getColor().dotOuterActiv}
            $dotOuterInactiveColor={getColor().dotOuterInactiv}
          />
          {key}
        </Option>
      ))}
      <input {...register(name)} type="text" />
    </Container>
  );
}

export default CheckGroup;

const Container = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  gap: ${({ $itemGap }) => `${$itemGap}px`};

  & input {
    display: none;
  }
`;

const Option = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  ${textStyles.label2.regular};
  color: ${({ $labelColor }) => $labelColor};
  cursor: pointer;
  user-select: none;
`;

const Dot = styled.div<StyledProps>`
  position: relative;
  width: ${({ $dotOuterSize }) => `${$dotOuterSize}px`};
  height: ${({ $dotOuterSize }) => `${$dotOuterSize}px`};
  background-color: ${({
    $active,
    $dotOuterActiveColor,
    $dotOuterInactiveColor,
  }) => ($active ? $dotOuterActiveColor : $dotOuterInactiveColor)};
  border-radius: ${`${round.full}px`};
  transition: background-color 200ms ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    border-radius: ${`${round.full}px`};
    transform: translate3d(-50%, -50%, 0);
    background-color: ${colors.primary[500]};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 200ms ease-in-out;
  }
`;
