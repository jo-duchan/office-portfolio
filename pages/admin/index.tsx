import React, { useCallback, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import { colors } from "@/styles/primitive-tokens";
import HomeActions from "@/components/admin/home/HomeActions";
// import Modal from "@/components/common/Modal";

export default function AdminPortfolioListPage() {
  return (
    <>
      <Head>
        <title>Admin Home</title>
      </Head>
      <Container>
        <Wrapper>
          <HomeActions />
          {/* portfolio */}
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.neutral[50]};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
`;
