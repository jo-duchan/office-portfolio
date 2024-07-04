import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import { GetStaticPropsContext, GetStaticPaths } from "next";
import { getCollectionPublicList } from "@/actions/collection-list-action";
import { getCollection } from "@/actions/collection-action";
import { CollectionData, CollectionMetadata } from "@/type/collection";
import PATH from "@/constants/path";
import media from "@/styles/media";
import collectionLargeStyle from "@/styles/collection-large";
import collectionSmallStyle from "@/styles/collection-small";
import Renderer from "@/components/common/Renderer";
import { convertTextToSlug } from "@/utils/utils";

interface Props {
  metadata: CollectionMetadata;
  HTML: string;
}

export default function PortfolioDetailViewPage({ metadata, HTML }: Props) {
  const router = useRouter();
  const { title, description, keyword, shareImg, publish } = metadata;

  useEffect(() => {
    if (!publish) {
      router.replace(PATH.ROOT);
    }
  }, [publish]);
  return (
    <>
      <Head>
        <title>{`WACKY - ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta itemProp="image" content={shareImg.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={shareImg.url} />
      </Head>
      <Container dangerouslySetInnerHTML={{ __html: HTML }}></Container>
    </>
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

  const metadata = collectionData.metadata;
  const HTML = ReactDOMServer.renderToStaticMarkup(
    <Renderer data={collectionData.collection} editable={false} />
  );

  return {
    props: {
      metadata,
      HTML,
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
