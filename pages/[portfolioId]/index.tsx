import React from "react";
import { GetStaticPropsContext, GetStaticPaths } from "next";

export default function PortfolioDetailViewPage() {
  return <div>Portfolio Detail View Page</div>;
}

export const getStaticPaths = (async () => {
  //서버에서 <프로젝트명, uuid>로 이루어진 리스트 조회 유효한 path값인지 받아오기
  return {
    paths: ["/test"],
    fallback: false, // paths 배열 외에는 404 에러 처리
  };
}) satisfies GetStaticPaths;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // 서버에서 포트폴리오 데이터 받아오기
  // html을 저장하지말고, 전역상태 자체를 db에 저장후 db에서 유저로 내려줄때 서버사이드에서
  // ReactDOMServer.renderToStaticMarkup를 통해 html로 전환하자
  return {
    props: {},
  };
};
