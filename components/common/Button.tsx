import React from "react";
import styled, { CSSProp } from "styled-components";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";

type ButtonSize = "medium" | "small";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size: ButtonSize;
  action?: () => void;
}

interface BaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: ButtonSize;
  action?: () => void;
  color: string;
  bgColor: string;
  activeBgColor: string;
}

interface StyledProps {
  $width: number;
  $height: number;
  $round: number;
  $font: CSSProp;
  $labelColor: string;
  $bgColor: string;
  $activeBgColor: string;
}

function ButtonBase({
  children,
  type = "button",
  size = "small",
  action,
  color,
  bgColor,
  activeBgColor,
}: BaseProps) {
  const setSize = () => {
    let width = 0;
    let height = 0;
    let font: CSSProp;
    let btnRound = round.s;

    if (size === "medium") {
      width = 195;
      height = 45;
      font = textStyles.label1.bold;
    }

    if (size === "small") {
      width = 105;
      height = 40;
      font = textStyles.label2.bold;
    }

    return { width, height, font, btnRound };
  };
  return (
    <Container
      onClick={action}
      type={type}
      $width={setSize().width}
      $height={setSize().height}
      $font={setSize().font}
      $round={setSize().btnRound}
      $labelColor={color}
      $bgColor={bgColor}
      $activeBgColor={activeBgColor}
    >
      {children}
    </Container>
  );
}

function Primary({ label, size, type, action }: Props) {
  return (
    <ButtonBase
      size={size}
      type={type}
      action={action}
      color={colors.neutral[0]}
      bgColor={colors.primary[600]}
      activeBgColor={colors.primary[700]}
    >
      {label}
    </ButtonBase>
  );
}

function Neutral({ label, size, type, action }: Props) {
  return (
    <ButtonBase
      size={size}
      type={type}
      action={action}
      color={colors.neutral[800]}
      bgColor={colors.neutral[200]}
      activeBgColor={colors.neutral[300]}
    >
      {label}
    </ButtonBase>
  );
}

const Button = {
  Primary,
  Neutral,
};

export default Button;

const Container = styled.button<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: initial;
  transition: 200ms ease-in-out;
  transition-property: color, background-color;
  cursor: pointer;
  user-select: none;

  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  border-radius: ${({ $round }) => `${$round}px`};
  ${({ $font }) => $font};
  color: ${({ $labelColor }) => $labelColor};
  background-color: ${({ $bgColor }) => $bgColor};

  &:active {
    background-color: ${({ $activeBgColor }) => $activeBgColor};
  }
`;
