import Head from "next/head";
import { GetServerSidePropsContext } from "next";

export default function Home() {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <div>Home</div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
