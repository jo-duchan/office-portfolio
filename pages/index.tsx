import Head from "next/head";
import Image from "next/image";
import * as ReactDOMServer from "react-dom/server";
import { db } from "@/libs/firebase/firebase-config";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Renderer from "@/components/common/Renderer";
import usePortfolioStore from "@/stores/portfolio-store";
import { v4 as uuidv4 } from "uuid";
export default function Home() {
  const { item, addElement, init } = usePortfolioStore((state) => state);
  const handleAdd = () => {
    // 아이템 생성 예시

    addElement({
      id: uuidv4(),
      tagName: "h3",
      className: new Map([["font-size", "font-size-14"]]),
      content: {
        text: "안녕하세요.",
      },
    });
  };

  const handleUploadData = async () => {
    // 업로드 예시
    const data = ReactDOMServer.renderToStaticMarkup(
      Renderer({ data: item, editable: false })
    );
    console.log(data);

    await setDoc(doc(db, "portfolio", uuidv4()), { html: data });
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
