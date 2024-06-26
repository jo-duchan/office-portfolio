import React from "react";
import styled from "styled-components";
import Creator from "@/components/admin/edit/Creator";
import Controller from "@/components/admin/edit/Controller";
import Button from "@/components/common/Button";

function Editor() {
  return (
    <Container>
      <Creator />
      <Controller />
      <ButtonSection>
        <Button.Neutral label="Save" size="small" />
        <Button.Primary label="Publish" size="small" />
      </ButtonSection>
    </Container>
  );
}

export default Editor;

const Container = styled.div`
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
