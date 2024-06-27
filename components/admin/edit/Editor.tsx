import React from "react";
import styled from "styled-components";
import { useForm, type FieldValues } from "react-hook-form";
import Creator from "@/components/admin/edit/Creator";
import Controller from "@/components/admin/edit/Controller";
import Button from "@/components/common/Button";
interface Props {
  onInvokeCollectionModal: () => Promise<void>;
}

function Editor({ onInvokeCollectionModal }: Props) {
  const { register, handleSubmit, watch, reset, setValue, getValues } =
    useForm<FieldValues>();

  return (
    <Container onSubmit={handleSubmit(onInvokeCollectionModal)}>
      <Creator />
      <Controller
        register={register}
        reset={reset}
        watch={watch}
        setValue={setValue}
        getValues={getValues}
      />
      <ButtonSection>
        <Button.Neutral label="Save" size="small" type="button" />
        <Button.Primary label="Publish" size="small" type="submit" />
      </ButtonSection>
    </Container>
  );
}

export default Editor;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 32px 20px 20px;
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 20px;
`;
