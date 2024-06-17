import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import styled from "styled-components";
import { setPortfolio, getPortfolio } from "@/actions/portfolio-upload-action";
import usePortfolioStore from "@/stores/portfolio-store";
import useCurrentElementStore from "@/stores/current-element-store";
import { useShallow } from "zustand/react/shallow";
import { v4 as uuidv4 } from "uuid";
import useThemeStore from "@/stores/theme-store";
import Renderer from "@/components/common/Renderer";
import { PortfolioState, PortfolioElement } from "@/type/portfolio";
import { Image } from "@/type/common";
import Editor from "@/components/admin/Editor";

interface Props {
  portfolioId: string;
  portfolioData: PortfolioState | null;
}
let num = 0;

export default function AdminPortfolioBodyEditPage({
  portfolioId,
  portfolioData,
}: Props) {
  const { body, addElement } = usePortfolioStore(
    useShallow((state) => ({ body: state.body, addElement: state.addElement }))
  );
  const { currentId, setCurrentId } = useCurrentElementStore(
    useShallow((state) => ({
      currentId: state.currentId,
      setCurrentId: state.setCurrentId,
    }))
  );
  const updateMediaQuery = useThemeStore((state) => state.updateMediaQuery);

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
          text: "안녕히가세요." + `${++num}`,
        },
      },
      currentId
    );
    setCurrentId(id);
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
      },
      currentId
    );
    setCurrentId(id);
  };

  // console.log("body", item);
  return (
    <Container>
      Admin Portfolio Content Section Edit Page
      <Editor />
      <div>
        <button onClick={() => console.log(body)}>check data</button>
        <button onClick={handleAddTextElement}>text add</button>
        <button onClick={handleAddImageElement}>img add</button>
        <button
          onClick={() => {
            updateMediaQuery("small");
          }}
        >
          theme change
        </button>
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
