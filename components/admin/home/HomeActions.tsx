import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import { v4 as uuidv4 } from "uuid";
import usePortfolioStore from "@/stores/portfolio-store";
import { setPortfolio, getPortfolio } from "@/actions/portfolio-upload-action";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";

interface StyledProps {
  $bgColor: string;
  $color: string;
  $activeColor: string;
}

export default function HomeActions() {
  const router = useRouter();

  // useModal custom hook 구현 필요
  // const handleCreatePortfolio = async () => {
  //   const id = uuidv4();
  //   router.push(`${PATH.ADMIN}/${id}`);
  // };

  const handleVisualAssetsUpdate = () => {};
  const handleCreateCollection = () => {};
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
        onClick={handleCreateCollection}
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
  margin-top: 80px;
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
