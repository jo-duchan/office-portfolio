import Head from "next/head";
import Image from "next/image";
import { db } from "@/libs/firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";

export default function Home() {
  return <div>Home</div>;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {},
  };
};
