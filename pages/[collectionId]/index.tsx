import React from "react";
import * as ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import { GetStaticPropsContext, GetStaticPaths } from "next";
import { getCollectionPublicList } from "@/actions/collection-list-action";
import { getCollection } from "@/actions/collection-action";
import { CollectionData } from "@/type/collection";
import PATH from "@/constants/path";
import media from "@/styles/media";
import collectionLargeStyle from "@/styles/collection-large";
import collectionSmallStyle from "@/styles/collection-small";
import Renderer from "@/components/common/Renderer";
import { convertTextToSlug } from "@/utils/utils";

interface Props {
  collection: string;
}

export default function PortfolioDetailViewPage({ collection }: Props) {
  return (
    <Container dangerouslySetInnerHTML={{ __html: collection }}></Container>
  );
}

export const getStaticPaths = (async () => {
  const simpleList = await getCollectionPublicList();

  if (!simpleList) {
    return {
      redirect: {
        destination: PATH.ROOT,
        permanent: false,
      },
    };
  }

  const paths = simpleList.map((collection) => {
    const collectionId = collection.title as string;
    return { params: { collectionId: convertTextToSlug(collectionId) } };
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

  .collection-cover {
    min-height: 1080px;
  }

  ${media.small`
    min-width: initial;
    ${collectionSmallStyle};

    .collection-cover {
    min-height: 360px;
  }
  `};
`;
