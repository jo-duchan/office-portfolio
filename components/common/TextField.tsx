import React from "react";
import styled from "styled-components";
import { type FieldValues, type UseFormRegister } from "react-hook-form";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  disabled?: boolean;
}

function TextField({
  label,
  register,
  name,
  type,
  placeholder,
  disabled,
}: Props) {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        {...register(name)}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
      />
    </Container>
  );
}

export default TextField;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  ${textStyles.label2.bold};
  color: ${colors.neutral[600]};
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px 12px;
  background-color: ${colors.neutral[0]};
  border-radius: ${`${round.s}px`};
  border: 1.5px solid;
  border-color: transparent;
  outline: initial;
  transition: 200ms ease-in-out;
  transition-property: border-color;

  ${textStyles.body3.regular};
  color: ${colors.neutral[900]};

  &::placeholder {
    color: ${colors.neutral[400]};
  }

  &:hover,
  &:focus {
    border-color: ${colors.primary[500]};
  }
`;
