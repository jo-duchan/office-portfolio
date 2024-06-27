import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import styled from "styled-components";
import { getCollection, setCollection } from "@/actions/collection-action";
import useCollectionStore from "@/stores/collection-store";
import useCurrentIdStore from "@/stores/current-id-store";
import { useShallow } from "zustand/react/shallow";
import Renderer from "@/components/common/Renderer";
import { CollectionState, CollectionElement } from "@/type/collection";
import { colors, round } from "@/styles/primitive-tokens";
import Editor from "@/components/admin/edit/Editor";
import PreviewModeChanger from "@/components/admin/edit/PreviewModeChanger";

interface Props {
  collectionId: string;
  collectionData: CollectionState | null;
}

export default function AdminCollectionEditPage({
  collectionId,
  collectionData,
}: Props) {
  const { collection, init } = useCollectionStore(
    useShallow((state) => ({
      collection: state.collection,
      init: state.init,
    }))
  );
  const setCurrentId = useCurrentIdStore(
    useShallow((state) => state.setCurrentId)
  );

  useEffect(() => {
    // init
    if (collectionData) {
      init(collectionData);
    }
  }, []);

  const handleUnselectItem = () => {
    setCurrentId(undefined);
  };

  return (
    <>
      <Head>
        <title>Admin Edit</title>
      </Head>
      <Container>
        <CanvasSection>
          <Wrapper>
            <PreviewModeChanger />
            <div className="canvas">
              <Renderer data={collection} editable={true} />
            </div>
          </Wrapper>
        </CanvasSection>
        <EditorSection>
          <Editor />
        </EditorSection>
        <Background onClick={handleUnselectItem} />
      </Container>
    </>
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
  const collectionId = params?.collectionId as string;
  const collectionData = await getCollection(collectionId);

  return {
    props: {
      collectionId,
      collectionData: collectionData || null,
    },
  };
};

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  min-width: 1700px;
  height: 100%;
  overflow: auto;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.neutral[50]};
  z-index: 0;
`;

const CanvasSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 500;
  pointer-events: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 1440px;
  height: 100%;
  pointer-events: none;

  & .canvas {
    width: ${({ theme }) =>
      theme.mediaQuery === "small" ? "360px" : "1440px"};
    height: 870px;
    border: 4px solid ${colors.neutral[700]};
    border-bottom: initial;
    border-top-left-radius: ${`${round.m}px`};
    border-top-right-radius: ${`${round.m}px`};
    background-color: ${colors.neutral[0]};
    overflow: hidden auto;
    pointer-events: auto;
  }
`;

const EditorSection = styled.div`
  position: relative;
  width: 260px;
  min-width: 260px;
  height: 870px;
  background-color: ${colors.neutral[700]};
  border-top-left-radius: ${`${round.m}px`};
  z-index: 500;
`;
