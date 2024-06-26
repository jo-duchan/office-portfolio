import React from "react";
import styled from "styled-components";
import {
  type UseFormRegister,
  type UseFormGetValues,
  type FieldValues,
} from "react-hook-form";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";

interface Props {
  options: { [key: string]: string };
  name: string;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

interface StyledProps {
  $active: boolean;
}

function CheckGroup({ options, name, register, getValues }: Props) {
  return (
    <Container>
      {Object.entries(options).map(([key, value]) => (
        <Option key={key}>
          <Dot $active={value === getValues(name)} />
          <input
            {...register(name)}
            value={value}
            checked={value === getValues(name)}
            type="radio"
          />
          {key}
        </Option>
      ))}
    </Container>
  );
}

export default CheckGroup;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  ${textStyles.label2.regular};
  color: ${colors.neutral[100]};
  cursor: pointer;
  user-select: none;

  & input {
    display: none;
  }
`;

const Dot = styled.div<StyledProps>`
  position: relative;
  width: 12px;
  height: 12px;
  background-color: ${({ $active }) =>
    $active ? colors.neutral[100] : colors.neutral[500]};
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
