import React, { useState } from "react";
import styled from "styled-components";
import { CollectionSimple } from "@/type/collection-list";
import {
  convertTextToSlug,
  withAlpha,
  timeStampToYYYYMMDD,
} from "@/utils/utils";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";
import Icons from "@/styles/iconography";
import Visibility from "@/components/common/Visibility";

interface Props {
  simpleList: CollectionSimple[];
  onInvokeCollectionModal: (id?: string) => Promise<void>;
}

interface ItemProps {
  item: CollectionSimple;
  onInvokeCollectionModal: (id?: string) => Promise<void>;
}

interface StyledProps {
  $color: string;
  $bgColor: string;
}

function PortfolioItem({ item, onInvokeCollectionModal }: ItemProps) {
  const [isOptionActive, SetIsOptionActive] = useState<boolean>(false);
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

  const handleShowOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    SetIsOptionActive(true);
  };

  const handleHideOption = () => {
    SetIsOptionActive(false);
  };

  const handleClickDeleteButton = () => {
    console.log("Delete");
    handleHideOption();
  };

  return (
    <Item
      key={convertTextToSlug(item.title)}
      onClick={() => onInvokeCollectionModal(convertTextToSlug(item.title))}
      onMouseLeave={handleHideOption}
    >
      <Visibility visible={isOptionActive}>
        <OptionSection onClick={(e) => e.stopPropagation()}>
          <Option onClick={handleClickDeleteButton}>Delete</Option>
        </OptionSection>
      </Visibility>
      <ThumbnailSection>
        <MoreButton onClick={handleShowOption}>
          <Icons.more />
        </MoreButton>
        <img src={item.thumbnail.url} alt={`${item.title} thumbnail image`} />
      </ThumbnailSection>
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
  );
}

function PortfolioList({ simpleList, onInvokeCollectionModal }: Props) {
  return (
    <Container>
      <Title>Portfolio</Title>
      <Visibility visible={simpleList.length > 0}>
        <List>
          {simpleList.map((item) => (
            <PortfolioItem
              key={item.title}
              item={item}
              onInvokeCollectionModal={onInvokeCollectionModal}
            />
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
  display: flex;
  flex-direction: column;
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

const ThumbnailSection = styled.div`
  position: relative;
  width: 100%;
  height: 234px;
  border-radius: ${`${round.s}px`};
  overflow: hidden;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${withAlpha(colors.neutral[900], 0.24)};
    backdrop-filter: blur(3px);
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }
`;

const MoreButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: initial;
  border: initial;
  outline: initial;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  opacity: 0;
  transition: opacity 200ms ease-in-out;

  svg path {
    fill: ${colors.neutral[0]};
  }
`;

const OptionSection = styled.div`
  position: absolute;
  top: 0;
  right: 8px;
  width: 110px;
  height: fit-content;
  transform: translate3d(100%, 0, 0);
  background-color: ${colors.neutral[700]};
  border: 1px solid ${colors.neutral[600]};
  border-radius: ${`${round.s}px`};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 800;
`;

const Option = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;

  ${textStyles.label2.medium};
  color: ${colors.neutral[300]};
  text-transform: capitalize;
  cursor: pointer;
  user-select: none;
  transition: color 200ms ease-in-out;

  &:hover {
    color: ${colors.neutral[50]};
  }

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

const Item = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 378px;
  height: fit-content;
  cursor: pointer;
  user-select: none;

  &:hover ${ThumbnailSection}::before {
    opacity: 1;
  }

  &:hover ${MoreButton} {
    opacity: 1;
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
  height: 653px;
  background-color: ${withAlpha(colors.neutral[100], 0.4)};
  border-radius: ${`${round.l}px`};
  color: ${colors.neutral[500]};
  ${textStyles.label1.medium};
`;
