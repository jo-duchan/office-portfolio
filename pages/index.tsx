import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import styled from "styled-components";
import { getCollectionPublicList } from "@/actions/collection-list-action";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import { CollectionSimple } from "@/type/collection-list";
import { timeStampToYYYYMMDD, convertTextToSlug } from "@/utils/utils";

interface Props {
  simpleList: CollectionSimple[] | null;
}

export default function Home({ simpleList }: Props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Container>
        Home Page
        <List>
          {simpleList?.map((item) => (
            <div
              key={item.title}
              onClick={() =>
                router.push(`${PATH.ROOT}${convertTextToSlug(item.title)}`)
              }
            >
              <img src={item.thumbnail.url} />
              <p>{item.title}</p>
              <p>{timeStampToYYYYMMDD(item.date)}</p>
            </div>
          ))}
        </List>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const simpleList = await getCollectionPublicList();

  return {
    props: {
      simpleList: simpleList || null,
    },
  };
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  & div {
    width: 300px;
  }

  & div img {
    width: 100%;
    height: auto;
  }
`;
