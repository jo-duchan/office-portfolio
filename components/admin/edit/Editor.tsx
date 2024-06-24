import React from "react";
import styled from "styled-components";
import Creator from "@/components/admin/edit/Creator";
import Controller from "@/components/admin/edit/Controller";

function Editor() {
  return (
    <Container>
      <Creator />
      <Controller />
    </Container>
  );
}

export default Editor;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 20px 20px;
`;
