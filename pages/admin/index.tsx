import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useForm, type FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import { setPortfolio, getPortfolio } from "@/actions/portfolio-upload-action";
import { handleUploadImage } from "@/actions/img-upload-actions";
import { colors } from "@/styles/primitive-tokens";
import { Image } from "@/type/common";
import { CollectionHeadAssets } from "@/type/collection";
import HomeActions from "@/components/admin/home/HomeActions";
import useModal from "@/hooks/useModal";
import TextField from "@/components/common/TextField";
import TextArea from "@/components/common/TextArea";
import ImageGroup from "@/components/common/ImageGroup";
import ChipGroup from "@/components/common/ChipGroup";

export default function AdminHomePage() {
  const router = useRouter();
  const { modal, showModal } = useModal();
  const { register, handleSubmit, reset, control, setValue } =
    useForm<FieldValues>();
  const [assets, setAssets] = useState<CollectionHeadAssets>({
    desktop: { file: null },
    mobile: { file: null },
  });

  const handleInvokeCollectionModal = async (id?: string) => {
    if (id) {
      // id가 있으면 DB 조회 및 데이터 내려받기
      // const response = await
      // reset()
      // setAssets();
    }

    const modalContent = (
      <>
        <TextField
          register={register}
          name="title"
          label="Title"
          placeholder="프로젝트 제목을 입력하세요."
        />
        <TextArea
          register={register}
          name="description"
          label="Description"
          placeholder="프로젝트 설명을 입력하세요."
        />
        <ImageGroup
          label="CoverImage"
          register={register}
          control={control}
          setValue={setValue}
          items={Object.entries(assets)}
        />
        <ChipGroup
          label="Keyword"
          name="keyword"
          register={register}
          setValue={setValue}
          initalValue={[]}
        />
      </>
    );

    showModal({
      title: `${id ? "Collection" : "New Collection"}`,
      children: modalContent,
      actionLabel: "Create",
      action: handleSubmit(handleSubmitCollectionModal),
    });
  };

  const handleSubmitCollectionModal = async (data: FieldValues) => {
    const { title, description, desktop, mobile, keyword } = data;

    if (!title || !description || !desktop[0] || !mobile[0] || !keyword) {
      window.alert("내용을 입력하세요.");
      return;
    }

    // title 이미지 중복 체크 & title 공백 -로 교체
    const kebabCaseTitle = title.replaceAll(" ", "-");

    const newAssets = assets;
    newAssets.desktop.file = desktop[0];
    newAssets.mobile.file = mobile[0];

    const response = Object.entries(newAssets).map(async ([objKey, value]) => {
      const { key, url, file } = value;

      const result = await handleUploadImage({ key, preview: url, file });

      if (result) {
        newAssets[objKey] = { key: result.key, url: result.url, file: null };
      }
    });

    await Promise.all(response).then(async () => {
      await setPortfolio({
        id: title,
        data: {
          metadata: {
            title,
            description,
            publish: false,
            keyword,
          },
          head: {
            title,
            description,
            desktop: newAssets.desktop,
            mobile: newAssets.mobile,
            keyword,
          },
        },
      });

      // router.push(`${PATH.ADMIN}/${title}`);
    });
  };

  return (
    <>
      <Head>
        <title>Admin Home</title>
      </Head>
      <Container>
        {modal}
        <Wrapper>
          <HomeActions onInvokeCollectionModal={handleInvokeCollectionModal} />
          {/* portfolio */}
        </Wrapper>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.neutral[50]};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
`;
