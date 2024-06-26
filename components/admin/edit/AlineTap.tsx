import React from "react";
import styled from "styled-components";
import {
  type UseFormRegister,
  type UseFormGetValues,
  type FieldValues,
} from "react-hook-form";
import Icons from "@/styles/iconography";
import { colors } from "@/styles/primitive-tokens";

interface Props {
  option: { [key: string]: React.JSX.Element };
  name: string;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

interface StyledProps {
  $active: boolean;
}

function AlineTap({ option, name, register, getValues }: Props) {
  const checked = (key: string) => key === getValues(name);
  return (
    <Container>
      {Object.entries(option).map(([key, icon]) => (
        <InputWrpper key={key} $active={checked(key)}>
          {icon}
          <input
            {...register(name)}
            value={`${key}`}
            checked={checked(key)}
            type="radio"
          />
        </InputWrpper>
      ))}
    </Container>
  );
}

export default AlineTap;

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const InputWrpper = styled.label<StyledProps>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  user-select: none;

  & input {
    display: none;
  }

  & svg path {
    fill: ${({ $active }) =>
      $active ? colors.neutral[100] : colors.neutral[500]};
    transition: 200ms ease-in-out;
    transition-property: fill;
  }
`;
