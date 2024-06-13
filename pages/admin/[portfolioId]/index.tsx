import React, { useEffect } from "react";
import { GetStaticPropsContext, GetStaticPaths } from "next";
import styled from "styled-components";
import { useForm, type FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import usePortfolioStore from "@/stores/portfolio-store";
import { type PortfolioItem } from "@/type/portfolio";
import { setPortfolio, getPortfolio } from "@/actions/portfolio-upload-action";
import { getPresignedUrl, uploadImage } from "@/actions/img-upload-actions";
import { convertImageUrl } from "@/utils/utils";

interface UploadImageParams {
  file: File;
  key?: string;
  preview?: string;
}

interface Props {
  portfolioId: string;
  portfolioData: PortfolioItem | null;
}

export default function AdminPortfolioHeadEditPage({
  portfolioId,
  portfolioData,
}: Props) {
  const router = useRouter();
  const { item, init, updateHead } = usePortfolioStore((state) => state);
  const { register, handleSubmit, watch, reset } = useForm<FieldValues>();

  useEffect(() => {
    // init
    if (!item.id) {
      router.replace(PATH.ADMIN);
    }

    if (portfolioData) {
      const { title, description, keyword } = portfolioData.head;
      init({ ...portfolioData });
      reset({ title, description, keyword });
    }
  }, []);

  useEffect(() => {
    const subscribe = watch((data: FieldValues, { name }) => {
      if (name !== "pcImg" && name !== "mobileImg") {
        updateHead({
          ...item.head,
          title: data.title,
          description: data.description,
          keyword: data.keyword,
        });
      }

      if (name === "pcImg") {
        updateHead({
          ...item.head,
          pcImg: {
            key: item.head.pcImg?.key,
            url: URL.createObjectURL(data.pcImg[0]),
            file: data.pcImg[0],
          },
        });
      }

      if (name === "mobileImg") {
        updateHead({
          ...item.head,
          mobileImg: {
            key: item.head.mobileImg?.key,
            url: URL.createObjectURL(data.mobileImg[0]),
            file: data.mobileImg[0],
          },
        });
      }
    });

    return () => subscribe.unsubscribe();
  }, [watch, item]);

  const handleUploadImage = async ({
    file,
    key,
    preview,
  }: UploadImageParams) => {
    let url;
    const response = await getPresignedUrl(key);

    if (response) {
      const uploadRes = await uploadImage({
        url: response.url,
        img: file,
      });

      url = convertImageUrl(uploadRes?.url);
      preview && URL.revokeObjectURL(preview);
    }

    return { key: key ?? response?.key, url };
  };

  const handleUpdateHeadData = async (data: FieldValues) => {
    console.log(portfolioId, item, data);
    // 여기서는 store에 key 저장, url 업데이트, file 삭제 따로 하고, body 쪽에서는 img component에서 data에 id값이 있으니깐 그거 받아서 처리하면 될듯
    const imgObj = {
      pcImg: item.head.pcImg,
      mobileImg: item.head.mobileImg,
    };

    const result = Object.values(imgObj).map((value) => {
      const { key, url, file } = value;

      return file && handleUploadImage({ key, preview: url, file });
    });

    Promise.all(result).then((value) => {
      if (value[0]) imgObj.pcImg = value[0];
      if (value[1]) imgObj.mobileImg = value[1];

      updateHead({
        ...item.head,
        ...imgObj,
      });
    });

    await setPortfolio(item);
    router.push(`${PATH.ADMIN}/${portfolioId}/content`);
  };

  return (
    <div>
      Admin Portfolio Head Edit Page
      <div onClick={() => console.log("체크 데이터", item)}>체크데이터</div>
      <div>
        {item.head.pcImg?.url && <img src={item.head.pcImg.url} />}
        {item.head.mobileImg?.url && <img src={item.head.mobileImg.url} />}
      </div>
      <Form onSubmit={handleSubmit(handleUpdateHeadData)}>
        <input type="file" {...register("pcImg")} />
        <input type="file" {...register("mobileImg")} />
        <input type="text" {...register("title")} />
        <input type="text" {...register("description")} />
        <input type="text" {...register("keyword")} />
        <button>update</button>
      </Form>
    </div>
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

  // DB에서 포트폴리오 존재 유무 체크
  const portfolioData = await getPortfolio(portfolioId);

  return {
    props: {
      portfolioId,
      portfolioData: portfolioData || null,
    },
  };
};

const Form = styled.form`
  margin-top: 50px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
