import React from "react";
import styled from "styled-components";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";

interface Props {
  onInvokeCollectionModal: (id?: string) => Promise<void>;
}

interface StyledProps {
  $bgColor: string;
  $color: string;
  $activeColor: string;
}

export default function HomeActions({ onInvokeCollectionModal }: Props) {
  const handleVisualAssetsUpdate = () => {};
  const handleAccountPasswordUpdate = () => {};

  return (
    <Container>
      <ActionItem
        onClick={handleVisualAssetsUpdate}
        $bgColor={colors.primary[50]}
        $color={colors.primary[500]}
        $activeColor={colors.primary[100]}
      >
        Visual Assets Update
      </ActionItem>
      <ActionItem
        onClick={() => onInvokeCollectionModal()}
        $bgColor={colors.secondary[50]}
        $color={colors.secondary[500]}
        $activeColor={colors.secondary[100]}
      >
        Create New Collection
      </ActionItem>
      <ActionItem
        onClick={handleAccountPasswordUpdate}
        $bgColor={colors.neutral[100]}
        $color={colors.neutral[500]}
        $activeColor={colors.neutral[200]}
      >
        Account Password Update
      </ActionItem>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 80px;
`;

const ActionItem = styled.div<StyledProps>`
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  ${textStyles.label1.bold};
  padding: 24px;
  border-radius: ${`${round.m}px`};
  cursor: pointer;
  user-select: none;
  transition: 200ms ease-in-out;
  transition-property: background-color;

  &:active {
    background-color: ${({ $activeColor }) => $activeColor};
  }
`;
