import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import styled from "styled-components";
import { getCollection, setCollection } from "@/actions/collection-action";
import useCollectionStore from "@/stores/collection-store";
import useCurrentElementStore from "@/stores/current-element-store";
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
  const { head, body, init } = useCollectionStore(
    useShallow((state) => ({
      head: state.head,
      body: state.body,
      init: state.init,
    }))
  );

  useEffect(() => {
    // init
    console.log(collectionId, collectionData);
    if (collectionData) {
      init(collectionData);
    }
  }, []);

  useEffect(() => {
    console.log(head);
  }, [head]);

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
              <Renderer head={head} body={body} editable={true} />
            </div>
          </Wrapper>
        </CanvasSection>
        <EditorSection>
          <Editor />
        </EditorSection>
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
  background-color: ${colors.neutral[50]};
  overflow: auto;
`;

const CanvasSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 1440px;
  height: 100%;

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
  }
`;

const EditorSection = styled.div`
  width: 260px;
  min-width: 260px;
  height: 870px;
  background-color: ${colors.neutral[700]};
  border-top-left-radius: ${`${round.m}px`};
`;
