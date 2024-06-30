import React from "react";
import * as ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import { GetStaticPropsContext, GetStaticPaths } from "next";
import { getCollectionList } from "@/actions/collection-list-action";
import { getCollection } from "@/actions/collection-action";
import { CollectionData } from "@/type/collection";
import PATH from "@/constants/path";
import media from "@/styles/media";
import collectionLargeStyle from "@/styles/collection-large";
import collectionSmallStyle from "@/styles/collection-small";
import Renderer from "@/components/common/Renderer";

interface Props {
  collectionId: string;
  collection: string;
}

export default function PortfolioDetailViewPage({
  collectionId,
  collection,
}: Props) {
  return (
    <Container dangerouslySetInnerHTML={{ __html: collection }}></Container>
  );
}

export const getStaticPaths = (async () => {
  const simpleList = await getCollectionList();

  if (!simpleList) {
    return {
      redirect: {
        destination: PATH.ADMIN,
        permanent: false,
      },
    };
  }
  console.log(simpleList);

  const paths = simpleList.map((collection) => {
    const collectionId = collection.title as string;
    return { params: { collectionId } };
  });

  return {
    paths,
    fallback: true, // paths 배열 외에는 404 에러 처리
  };
}) as GetStaticPaths;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const collectionId = params?.collectionId as string;
  const collectionData = (await getCollection(collectionId)) as CollectionData;

  if (!collectionData.metadata.publish) {
    return {
      redirect: {
        destination: PATH.ROOT,
        permanent: false,
      },
    };
  }

  const collection = ReactDOMServer.renderToStaticMarkup(
    <Renderer data={collectionData.collection} editable={false} />
  );

  return {
    props: {
      collectionId,
      collection,
    },
  };
};

const Container = styled.div`
  min-width: 1440px;
  ${collectionLargeStyle};

  ${media.small`
    min-width: initial;
    ${collectionSmallStyle};
  `};
`;
