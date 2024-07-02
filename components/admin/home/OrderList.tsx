import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  type UseFormRegister,
  type UseFormSetValue,
  type FieldValues,
} from "react-hook-form";

// 초기값으로 심플리스트 받아서,
// 999가 아닌 값을 로컬 상태로 저장, (init)
// register, setValue 등을 받아 내부에서 map으로 OrderItem List 랜더링
// sumbit시 data 넘겨주고 submit save 함수에서 최종 order 관련 데이터 저장

// 999는 add시 로컬 상태에 푸시
// 반대로 remove시 로컬 상태에서 제외

interface Props {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const dummy_order = ["title-1", "title-2", "title-3", "title-4"];
const dummy_unorder = ["title-5", "title-6", "title-7"];

function OrderList({ register, setValue }: Props) {
  const [orders, setOrders] = useState<string[]>();
  const [unorders, setUnorders] = useState<string[]>();

  useEffect(() => {
    // init
    // setValue("orders", "");
    // setValue("unorders", "");
    setOrders([...dummy_order]);
    setUnorders([...dummy_unorder]);
  }, []);

  useEffect(() => {
    if (!orders) return;
    console.log("orders", orders);
    setValue("orders", orders.join(","));
  }, [orders]);

  useEffect(() => {
    if (!unorders) return;
    console.log("unorders", unorders);
    setValue("unorders", unorders.join(","));
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
      <Orders>
        {orders?.map((itemId, idx) => (
          <div className="item" key={itemId}>
            {itemId}
            <div onClick={() => handleOrderUp(idx)}>up</div>
            <div onClick={() => handleOrderDown(idx)}>down</div>
            <div onClick={() => handleRemoveOrder(idx)}>Remove</div>
          </div>
        ))}
        <input type="text" {...register("orders")} />
      </Orders>

      <Unorders>
        {unorders?.map((itemId, idx) => (
          <div className="item" key={itemId}>
            {itemId}
            <div onClick={() => handleAddOrder(idx)}>add</div>
          </div>
        ))}
        <input type="text" {...register("unorders")} />
      </Unorders>
    </Container>
  );
}

export default OrderList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .item {
    display: flex;
    gap: 5px;
  }
`;

const Orders = styled.div`
  & > input {
    display: none;
  }
`;

const Unorders = styled.div`
  & > input {
    display: none;
  }
`;
