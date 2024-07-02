import React from "react";
import styled from "styled-components";
import { CollectionSimple } from "@/type/collection-list";
import {
  convertTextToSlug,
  withAlpha,
  timeStampToYYYYMMDD,
} from "@/utils/utils";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";
import Visibility from "@/components/common/Visibility";

interface Props {
  simpleList: CollectionSimple[];
  onInvokeCollectionModal: (id?: string) => Promise<void>;
  onInvokeOrderModal: () => void;
}

interface StyledProps {
  $color: string;
  $bgColor: string;
}

function PortfolioList({
  simpleList,
  onInvokeCollectionModal,
  onInvokeOrderModal,
}: Props) {
  const getPublic = (bool: boolean) => {
    let color = colors.secondary[500];
    let bgColor = colors.secondary[100];
    let text = "Public";

    if (!bool) {
      color = colors.red[300];
      bgColor = colors.red[100];
      text = "Private";
    }

    return { color, bgColor, text };
  };
  return (
    <Container>
      <Title>Portfolio</Title>
      <Visibility visible={simpleList.length > 0}>
        <List>
          {simpleList.map((item) => (
            <Item
              key={convertTextToSlug(item.title)}
              onClick={() =>
                // onInvokeCollectionModal(convertTextToSlug(item.title))
                onInvokeOrderModal()
              }
            >
              <img
                src={item.thumbnail.url}
                alt={`${item.title} thumbnail image`}
              />
              <ItemTextContent>
                <ItemInfo>
                  <ItemPublic
                    $color={getPublic(item.publish).color}
                    $bgColor={getPublic(item.publish).bgColor}
                  >
                    {getPublic(item.publish).text}
                  </ItemPublic>
                  <Visibility visible={item.order !== 999}>
                    <ItemOrder>{item.order}</ItemOrder>
                  </Visibility>
                </ItemInfo>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemCreatedAt>{timeStampToYYYYMMDD(item.date)}</ItemCreatedAt>
              </ItemTextContent>
            </Item>
          ))}
        </List>
      </Visibility>
      <Visibility visible={simpleList.length <= 0}>
        <EmptyContent>컬렉션을 생성해 주세요.</EmptyContent>
      </Visibility>
    </Container>
  );
}

export default PortfolioList;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden auto;
`;

const Title = styled.h3`
  ${textStyles.heading3.bold};
  color: ${colors.neutral[900]};
  margin-bottom: 16px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 33px;
  width: 100%;
  height: 100%;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 378px;
  height: fit-content;
  cursor: pointer;
  user-select: none;
  transition: opacity 200ms ease-in-out;

  & img {
    display: block;
    width: 100%;
    height: 234px;
    object-fit: cover;
    border-radius: ${`${round.s}px`};
  }

  &:active {
    opacity: 0.7;
  }
`;

const ItemTextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemInfo = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
`;

const ItemPublic = styled.span<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  color: ${({ $color }) => $color};
  background-color: ${({ $bgColor }) => $bgColor};
  padding: 2px 6px;
  border-radius: ${`${round.s}px`};
  ${textStyles.label2.medium};
`;

const ItemOrder = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  color: ${colors.primary[500]};
  background-color: ${colors.primary[100]};
  padding: 2px 6px;
  border-radius: ${`${round.s}px`};
  ${textStyles.label2.medium};
`;

const ItemTitle = styled.h4`
  ${textStyles.body3.medium};
  color: ${colors.neutral[800]};
  margin-bottom: 4px;
`;

const ItemCreatedAt = styled.span`
  ${textStyles.body4.regular};
  color: ${colors.neutral[500]};
`;

const EmptyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${withAlpha(colors.neutral[100], 0.4)};
  border-radius: ${`${round.l}px`};
  color: ${colors.neutral[500]};
  ${textStyles.label1.medium};
`;
