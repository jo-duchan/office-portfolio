import React from "react";
import styled from "styled-components";
import { type FieldValues, type UseFormRegister } from "react-hook-form";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  height?: number;
}

interface StyledProps {
  $height: number;
}

function TextArea({ label, register, name, placeholder, height }: Props) {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        {...register(name)}
        placeholder={placeholder}
        $height={height ?? 80}
      />
    </Container>
  );
}

export default TextArea;

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

const Input = styled.textarea<StyledProps>`
  width: 100%;
  height: ${({ $height }) => `${$height}px`};
  padding: 10px 12px;
  background-color: ${colors.neutral[0]};
  border-radius: ${`${round.s}px`};
  border: 1.5px solid;
  border-color: transparent;
  outline: initial;
  resize: none;
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
