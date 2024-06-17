import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import styled from "styled-components";
import { setPortfolio, getPortfolio } from "@/actions/portfolio-upload-action";
import usePortfolioStore from "@/stores/portfolio-store";
import { useShallow } from "zustand/react/shallow";
import { v4 as uuidv4 } from "uuid";

import Renderer from "@/components/common/Renderer";
import { PortfolioState, PortfolioElement } from "@/type/portfolio";
import { Image } from "@/type/common";

interface Props {
  portfolioId: string;
  portfolioData: PortfolioState | null;
}

export default function AdminPortfolioBodyEditPage({
  portfolioId,
  portfolioData,
}: Props) {
  const { body, addElement } = usePortfolioStore(
    useShallow((state) => ({ body: state.body, addElement: state.addElement }))
  );

  useEffect(() => {
    // init
    console.log(portfolioId, portfolioData, body);
  }, []);

  const handleAddTextElement = () => {
    const id = uuidv4();
    addElement(
      {
        id,
        tagName: "h3",
        className: { fontSize: "font-size-14", margin: "margin-all-14" },
        content: {
          text: "안녕히가세요.",
        },
      }
      //currentElement 전역 상태 작업 필요
      // "b6080edf-2ac8-4a7f-8749-1e1e5ddbf976"
    );
  };

  const handleAddImageElement = () => {
    const id = uuidv4();
    addElement(
      {
        id,
        tagName: "img",
        className: { margin: "margin-all-14" },
        content: {
          image: [
            {
              key: uuidv4(),
              file: null,
              url: undefined,
            },
            {
              key: uuidv4(),
              file: null,
              url: undefined,
            },
          ],
        },
      }
      //currentElement 전역 상태 작업 필요
      // "b6080edf-2ac8-4a7f-8749-1e1e5ddbf976"
    );
  };

  // console.log("body", item);
  return (
    <Container>
      Admin Portfolio Content Section Edit Page
      <div>
        <button onClick={() => console.log(body)}>check data</button>
        <button onClick={handleAddTextElement}>text add</button>
        <button onClick={handleAddImageElement}>img add</button>
      </div>
      <div>
        <Renderer head={portfolioData?.head!} body={body} editable={true} />
      </div>
    </Container>
  );
}

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const portfolioId = params?.portfolioId as string;
  const portfolioData = await getPortfolio(portfolioId);

  return {
    props: {
      portfolioId,
      portfolioData: portfolioData || null,
    },
  };
};

const Container = styled.div``;
