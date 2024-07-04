import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  type UseFormRegister,
  type UseFormSetValue,
  type FieldValues,
} from "react-hook-form";
import { CollectionSimple } from "@/type/collection-list";
import textStyles from "@/styles/typography";
import { colors, round } from "@/styles/primitive-tokens";
import Icons from "@/styles/iconography";
import Visibility from "@/components/common/Visibility";

interface Props {
  initialOrders: CollectionSimple[];
  initialUnorders: CollectionSimple[];
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

interface StyledProps {
  $iconColor: string;
  $bgColor: string;
  $activeColor: string;
}

function OrderList({
  initialOrders,
  initialUnorders,
  register,
  setValue,
}: Props) {
  const [orders, setOrders] = useState<CollectionSimple[]>();
  const [unorders, setUnorders] = useState<CollectionSimple[]>();

  useEffect(() => {
    // init
    setOrders([...initialOrders]);
    setUnorders([...initialUnorders]);
  }, []);

  useEffect(() => {
    if (!orders) return;

    const ordersToArray = orders.map((item) => item.title);
    setValue("orders", JSON.stringify(ordersToArray));
  }, [orders]);

  useEffect(() => {
    if (!unorders) return;

    const unordersToArray = unorders.map((item) => item.title);
    setValue("unorders", JSON.stringify(unordersToArray));
  }, [unorders]);

  const handleOrderUp = (current: number) => {
    if (current === 0 || !orders) return;
    const newList = orders;
    const temp = newList[current];
    newList[current] = newList[current - 1];
    newList[current - 1] = temp;

    setOrders([...newList]);
  };

  const handleOrderDown = (current: number) => {
    if (!orders) return;
    if (current === orders.length - 1) return;
    const newList = orders;
    const temp = newList[current];
    newList[current] = newList[current + 1];
    newList[current + 1] = temp;

    setOrders([...newList]);
  };

  const handleRemoveOrder = (current: number) => {
    if (!orders) return;
    const newList = orders;
    const removeItem = newList.splice(current, 1);

    setUnorders((current) => [...(current || []), ...removeItem]);
    setOrders([...newList]);
  };

  const handleAddOrder = (current: number) => {
    if (!unorders) return;
    const newList = unorders;
    const removeItem = newList.splice(current, 1);

    setOrders((current) => [...(current || []), ...removeItem]);
    setUnorders([...newList]);
  };

  return (
    <Container>
      <List>
        <Title>Order List</Title>
        {orders?.map((item, idx) => (
          <Item className="item" key={item.title}>
            <ItemIndex>{String(idx + 1).padStart(3, "0")}</ItemIndex>
            <ItemThumbnail src={item.thumbnail.url} />
            <ItemTitle>{item.title}</ItemTitle>
            <OrderButton
              onClick={() => handleOrderUp(idx)}
              $iconColor={colors.neutral[700]}
              $bgColor={colors.neutral[100]}
              $activeColor={colors.neutral[200]}
            >
              <Icons.up />
            </OrderButton>
            <OrderButton
              onClick={() => handleOrderDown(idx)}
              $iconColor={colors.neutral[700]}
              $bgColor={colors.neutral[100]}
              $activeColor={colors.neutral[200]}
            >
              <Icons.down />
            </OrderButton>
            <OrderButton
              onClick={() => handleRemoveOrder(idx)}
              $iconColor={colors.red[400]}
              $bgColor={colors.red[100]}
              $activeColor={colors.red[200]}
            >
              <Icons.remove />
            </OrderButton>
          </Item>
        ))}
        <Visibility visible={orders === undefined || orders.length <= 0}>
          <EmptyList>내용이 없어요.</EmptyList>
        </Visibility>
        <input type="text" {...register("orders")} />
      </List>
      <List>
        <Title>Unorder List</Title>
        {unorders?.map((item, idx) => (
          <Item className="item" key={item.title}>
            <ItemIndex>000</ItemIndex>
            <ItemThumbnail src={item.thumbnail.url} />
            <ItemTitle>{item.title}</ItemTitle>
            <OrderButton
              onClick={() => handleAddOrder(idx)}
              $iconColor={colors.secondary[400]}
              $bgColor={colors.secondary[100]}
              $activeColor={colors.secondary[100]}
            >
              <Icons.add />
            </OrderButton>
          </Item>
        ))}
        <Visibility visible={unorders === undefined || unorders.length <= 0}>
          <EmptyList>내용이 없어요.</EmptyList>
        </Visibility>
        <input type="text" {...register("unorders")} />
      </List>
    </Container>
  );
}

export default OrderList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .item {
    display: flex;
    gap: 5px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  & input {
    display: none;
  }
`;

const Title = styled.h4`
  ${textStyles.heading5.bold};
  color: ${colors.neutral[800]};
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 48px;
  padding: 8px;
  background-color: ${colors.neutral[0]};
  border-radius: ${`${round.m}px`};
`;

const ItemIndex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  min-width: 32px;
  height: 32px;
  border-radius: ${`${round.s}px`};
  background-color: ${colors.primary[100]};
  color: ${colors.primary[500]};
  ${textStyles.label2.medium};
`;

const ItemThumbnail = styled.img`
  display: block;
  width: 52px;
  min-width: 52px;
  height: 32px;
  object-fit: contain;
  border-radius: ${`${round.s}px`};
  overflow: hidden;
`;

const ItemTitle = styled.div`
  width: 174px;
  height: 32px;
  padding: 6px 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${textStyles.label2.medium};
  color: ${colors.neutral[800]};
`;

const OrderButton = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  min-width: 32px;
  height: 32px;
  margin-left: auto;
  background-color: ${({ $bgColor }) => $bgColor};
  border-radius: ${`${round.s}px`};
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  transition: background-color 200ms ease-in-out;

  & svg path {
    fill: ${({ $iconColor }) => $iconColor};
  }

  &:active {
    background-color: ${({ $activeColor }) => $activeColor};
  }
`;

const EmptyList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  background-color: ${colors.neutral[100]};
  border-radius: ${`${round.m}px`};

  ${textStyles.body4.medium};
  color: ${colors.neutral[400]};
`;
