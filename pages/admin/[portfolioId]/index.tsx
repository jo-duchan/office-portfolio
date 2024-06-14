import React, { useEffect } from "react";
import { GetStaticPropsContext, GetStaticPaths } from "next";
import styled from "styled-components";
import { useForm, type FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import usePortfolioStore from "@/stores/portfolio-store";
import { useShallow } from "zustand/react/shallow";
import { setPortfolio, getPortfolio } from "@/actions/portfolio-upload-action";
import { checkImageFileSize } from "@/utils/utils";
import { handleUploadImage } from "@/actions/img-upload-actions";
import { PortfolioHead, PortfolioState } from "@/type/portfolio";
import { Image } from "@/type/common";

interface Props {
  portfolioId: string;
  portfolioData: PortfolioState | null;
}

export default function AdminPortfolioHeadEditPage({
  portfolioId,
  portfolioData,
}: Props) {
  const router = useRouter();
  const { register, handleSubmit, watch, reset } = useForm<FieldValues>();
  const { head, setHead } = usePortfolioStore(
    useShallow((state) => ({
      head: state.head,
      setHead: state.setHead,
    }))
  );

  useEffect(() => {
    // init
    if (portfolioData) {
      const { title, description, keyword } = portfolioData.head;

      setHead({ ...portfolioData.head });
      reset({ title, description, keyword });
      return;
    }

    setHead({} as PortfolioHead);
    reset();
  }, []);

  useEffect(() => {
    const subscribe = watch((data: FieldValues, { name }) => {
      if (name !== "pcImg" && name !== "mobileImg") {
        setHead({
          ...head,
          title: data.title,
          description: data.description,
          keyword: data.keyword,
        });
      }

      if (name === "pcImg") {
        if (!checkImageFileSize(data.pcImg[0]?.size)) return;
        setHead({
          ...head,
          pcImg: {
            key: head.pcImg?.key,
            url: URL.createObjectURL(data.pcImg[0]),
            file: data.pcImg[0],
          },
        });
      }

      if (name === "mobileImg") {
        if (!checkImageFileSize(data.mobileImg[0]?.size)) return;
        setHead({
          ...head,
          mobileImg: {
            key: head.mobileImg?.key,
            url: URL.createObjectURL(data.mobileImg[0]),
            file: data.mobileImg[0],
          },
        });
      }
    });

    return () => subscribe.unsubscribe();
  }, [watch, head]);

  const handlesetHeadData = async (data: FieldValues) => {
    const { title, description, keyword, pcImg, mobileImg } = head;
    if (!title || !description || !keyword || !pcImg.url || !mobileImg.url) {
      window.alert("내용을 입력하세요.");
      return;
    }
    // 여기서는 store에 key 저장, url 업데이트, file 삭제 따로 하고, body 쪽에서는 img component에서 data에 id값이 있으니깐 그거 받아서 처리하면 될듯
    const imgObj: { [key: string]: Image } = {
      pcImg: head.pcImg,
      mobileImg: head.mobileImg,
    };

    const response = Object.entries(imgObj).map(async ([objKey, value]) => {
      const { key, url, file } = value;

      const result = await handleUploadImage({ key, preview: url, file });

      if (result) {
        imgObj[objKey] = { key: result.key, url: result.url, file: null };
      }
    });

    await Promise.all(response).then(async () => {
      console.log(head, imgObj);

      setHead({
        ...head,
        ...imgObj,
      });

      await setPortfolio({
        id: portfolioId,
        data: {
          head: {
            ...head,
            ...imgObj,
          },
        },
      });

      router.push(`${PATH.ADMIN}/${portfolioId}/content`);
    });
  };

  return (
    <Container>
      Admin Portfolio Head Edit Page
      <div onClick={() => console.log("체크 데이터", head)}>체크데이터</div>
      <div>
        {head.pcImg?.url && <img src={head.pcImg.url} />}
        {head.mobileImg?.url && <img src={head.mobileImg.url} />}
      </div>
      <Form onSubmit={handleSubmit(handlesetHeadData)}>
        <input type="file" {...register("pcImg")} />
        <input type="file" {...register("mobileImg")} />
        <input type="text" {...register("title")} />
        <input type="text" {...register("description")} />
        <input type="text" {...register("keyword")} />
        <button>update</button>
      </Form>
    </Container>
  );
}

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const portfolioId = (params?.portfolioId || "") as string;
  const portfolioData = await getPortfolio(portfolioId);

  return {
    props: {
      portfolioId,
      portfolioData: portfolioData || null,
    },
  };
};

const Container = styled.div`
  & img {
    width: 150px;
  }
`;

const Form = styled.form`
  margin-top: 50px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
