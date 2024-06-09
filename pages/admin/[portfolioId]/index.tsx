import React, { useEffect } from "react";
import { GetStaticPropsContext, GetStaticPaths } from "next";
import usePortfolioStore from "@/stores/portfolio-store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/libs/firebase/firebase-config";

export default function AdminPortfolioTopSectionEditPage() {
  const { item, init } = usePortfolioStore((state) => state);

  useEffect(() => {
    console.log(item);
    // init() props로 받아서
  }, []);

  return <div>Admin Portfolio Head Edit Page</div>;
}

export const getStaticPaths = (async () => {
  //유저에서는 서버에서 <프로젝트명, uuid>로 이루어진 리스트 조회 유효한 path값인지 받아오기
  return {
    paths: [],
    fallback: "blocking", // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // 서버에서 포트폴리오 존재 유무 체크(생성인지 수정인지 체크)
  // console.log(context.params);
  const docSnap = await getDoc(
    doc(db, "portfolio", "bcceae8d-6def-434c-82be-4f24ea9d9698")
  );
  console.log(docSnap.data());

  return {
    props: {
      // data: docSnap.data(),
    },
  };
};
