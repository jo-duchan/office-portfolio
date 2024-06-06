import Head from "next/head";
import Image from "next/image";
import * as ReactDOMServer from "react-dom/server";
import { db } from "@/libs/firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Renderer from "@/components/common/Renderer";
import usePortfolioStore from "@/stores/portfolio-store";
let num = 1;
export default function Home() {
  const { item, addElement } = usePortfolioStore((state) => state);
  const handleAdd = () => {
    // 아이템 생성 예시

    addElement({
      id: `item-${num++}`,
      tagName: "h3",
      className: new Map([["font-size", "font-size-14"]]),
      content: {
        text: "안녕하세요.",
      },
    });
  };

  const handleUploadData = () => {
    // 업로드 예시
    const data = ReactDOMServer.renderToStaticMarkup(
      Renderer({ data: item, editable: false })
    );
    console.log(data);
  };
  return (
    <div>
      Home
      <button onClick={handleAdd}>add</button>
      <button onClick={handleUploadData}>upload</button>
      {/* 클라이언트에서 렌더 예시 */}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: Renderer({ data: item, editable: true }),
        }}
      ></div> */}
      <Renderer data={item} editable={true} />
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {},
  };
};
