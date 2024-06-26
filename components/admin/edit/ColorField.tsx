import React from "react";
import styled from "styled-components";
import {
  type UseFormRegister,
  type UseFormGetValues,
  type FieldValues,
} from "react-hook-form";
import { withAlpha } from "@/utils/utils";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";

interface Props {
  name: string;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

interface StyledProps {
  $color: string;
}

function ColorField({ name, register, getValues }: Props) {
  return (
    <Container>
      <ColorViewer $color={getValues(name)} />
      <input type="text" {...register(name)} />
    </Container>
  );
}

export default ColorField;

const Container = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  cursor: text;

  & input {
    width: 60px;
    padding: initial;
    border: initial;
    outline: initial;
    background-color: transparent;
    ${textStyles.label2.regular};
    color: ${colors.neutral[100]};
  }
`;

const ColorViewer = styled.div<StyledProps>`
  width: 18px;
  height: 18px;
  background-color: ${({ $color }) => `#${$color}`};
  border: 1px solid ${withAlpha(colors.neutral[600], 0.5)};
  border-radius: ${`${round.xs}px`};
`;
