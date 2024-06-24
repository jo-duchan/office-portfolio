import React, { useEffect } from "react";
import styled from "styled-components";
import { CollectionHead } from "@/type/collection";
import {} from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";

interface Props {
  data: CollectionHead;
}

function RenderHead({ data }: Props) {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Container>
      <TextWrapper>
        <Title>{data.title}</Title>
      </TextWrapper>
      <BackgroundLarge src={data.assets?.desktop.url} />
      <BackgroundSmall src={data.assets?.mobile.url} />
    </Container>
  );
}

export default RenderHead;

const Container = styled.div`
  position: relative;
  /* width: clamp(1440px, 100%, 1920px); */
  width: 100%;
  height: fit-content;
  /* height: fit-content; */
`;

const BackgroundLarge = styled.img`
  display: ${({ theme }) => (theme.mediaQuery === "large" ? "block" : "none")};
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const BackgroundSmall = styled.img`
  display: ${({ theme }) => (theme.mediaQuery === "small" ? "block" : "none")};
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const TextWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  margin-top: 330px;
  display: flex;
`;

const Title = styled.h3`
  font-size: 72px;
  font-weight: 600;
`;

const Description = styled.p``;

const Keyword = styled.p``;
