import React, { useState } from "react";
import styled from "styled-components";
import {
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormGetValues,
  type FieldValues,
} from "react-hook-form";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";
import Icons from "@/styles/iconography";

interface SelectProps {
  options: { [key: string]: string };
  name: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

interface OptionsProps {
  currentValue: string;
  options: { [key: string]: string };
  onSeletValue: (value: string) => void;
}

interface StyledProps {
  $active: boolean;
}

function Options({ currentValue, options, onSeletValue }: OptionsProps) {
  return (
    <OptionContainer>
      {Object.entries(options).map(([key, value]) => (
        <Option
          key={key}
          onClick={() => onSeletValue(value)}
          $active={currentValue === value}
        >
          {key}
        </Option>
      ))}
    </OptionContainer>
  );
}

function Select({ options, name, register, setValue, getValues }: SelectProps) {
  const [show, setShow] = useState<boolean>(false);

  const handleShowOption = () => {
    setShow(true);
  };

  const handleHideOption = () => {
    setShow(false);
  };

  const handleSeletValue = (value: string) => {
    setValue(name, value);
    handleHideOption();
  };

  const getLabel = () => {
    return Object.keys(options).find((key) => options[key] === getValues(name));
  };

  return (
    <Container onMouseLeave={handleHideOption}>
      <Selector onClick={handleShowOption}>
        {getLabel()}
        <Icons.dropdown />
      </Selector>
      {show && (
        <Options
          currentValue={getValues(name)}
          options={options}
          onSeletValue={handleSeletValue}
        />
      )}
      <input type="text" {...register(name)} />
    </Container>
  );
}

export default Select;

const Container = styled.div`
  position: relative;
  background-color: transparent;

  & input {
    display: none;
  }
`;

const Selector = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${textStyles.label2.regular};
  color: ${colors.neutral[100]};
  text-transform: capitalize;
  cursor: pointer;
  user-select: none;
`;

const OptionContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 110px;
  height: fit-content;
  transform: translate3d(0, 100%, 0);
  background-color: ${colors.neutral[700]};
  border: 1px solid ${colors.neutral[600]};
  border-radius: ${`${round.s}px`};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 800;
`;

const Option = styled.div<StyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;

  ${textStyles.label2.medium};
  color: ${({ $active }) =>
    $active ? colors.neutral[200] : colors.neutral[500]};
  text-transform: capitalize;

  cursor: pointer;
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 81.8181%;
    transform: translate3d(-50%, 0, 0);
    height: 1px;
    background-color: ${colors.neutral[600]};
  }

  &:last-child::before {
    background-color: transparent;
  }
`;
