import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useForm, type FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import { setCollection, getCollection } from "@/actions/collection-action";
import {
  checkForDuplicates,
  setCollectionSimple,
  getCollectionSimple,
} from "@/actions/collection-list-action";
import { handleUploadImage } from "@/actions/img-upload-actions";
import { colors } from "@/styles/primitive-tokens";
import { CollectionAssets } from "@/type/collection";
import { getId, convertTextToSlug } from "@/utils/utils";
import useModal from "@/hooks/useModal";
import useProgress from "@/hooks/useProgress";
import HomeActions from "@/components/admin/home/HomeActions";
import TextField from "@/components/common/TextField";
import TextArea from "@/components/common/TextArea";
import ImageGroup from "@/components/common/ImageGroup";
import ChipGroup from "@/components/common/ChipGroup";

export default function AdminHomePage() {
  const router = useRouter();
  const { modal, showModal } = useModal();
  const { progress, showProgress, hideProgress } = useProgress();
  const { register, handleSubmit, reset, control, setValue } =
    useForm<FieldValues>();
  const [assets, setAssets] = useState<CollectionAssets>({
    desktop: { file: null },
    mobile: { file: null },
  });
  const [currentId, setCurrentId] = useState<string>();

  const handleInvokeCollectionModal = async (id?: string) => {
    if (id) {
      // id가 있으면 DB 조회 및 데이터 내려받기
      // const response = await
      // reset()
      // setAssets();
      // setCurrentId(id)
    } else {
      reset({});
    }

    const modalContent = (
      <>
        <TextField
          register={register}
          name="title"
          label="Title"
          placeholder="프로젝트 제목을 입력하세요."
          disabled={id !== undefined}
        />
        <TextArea
          register={register}
          name="description"
          label="Description"
          placeholder="프로젝트 설명을 입력하세요."
        />
        <ImageGroup
          label="Cover Image"
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
      action: handleSubmit(handleSubmitCollectionData),
    });
  };

  const handleSubmitCollectionData = async (data: FieldValues) => {
    const { title, description, desktop, mobile, keyword } = data;

    if (!title || !description || !desktop[0] || !mobile[0] || !keyword) {
      window.alert("내용을 입력하세요.");
      return;
    }

    const kebabCaseTitle = convertTextToSlug(title);
    let isDuplicate: boolean | undefined;

    if (!currentId) {
      isDuplicate = await checkForDuplicates(kebabCaseTitle);
    }

    if (isDuplicate && !currentId) {
      window.alert("동일한 프로젝트 제목이 존재합니다.");
      return;
    }

    showProgress();
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
      await setCollection({
        id: kebabCaseTitle,
        data: {
          metadata: {
            title,
            description,
            keyword,
            shareImg: { file: null },
            publish: false,
          },
          collection: [
            {
              id: getId(),
              elementName: "cover",
              option: {
                titleColor: "000000",
                descriptionColor: "000000",
                keywordColor: "000000",
              },
              content: {
                title,
                description,
                keyword,
                ...newAssets,
              },
            },
          ],
        },
      });

      await setCollectionSimple({
        id: kebabCaseTitle,
        data: {
          thumbnail: { file: null },
          title,
          order: null,
          publish: false,
          date: Date.now(),
        },
      });

      hideProgress();
      router.push(`${PATH.ADMIN}/${kebabCaseTitle}`);
    });
  };

  return (
    <>
      <Head>
        <title>Admin Home</title>
      </Head>
      <Container>
        <Wrapper>
          <HomeActions onInvokeCollectionModal={handleInvokeCollectionModal} />
          {/* portfolio */}
        </Wrapper>
      </Container>
      {modal}
      {progress}
    </>
  );
}

export async function getServerSideProps() {
  // get Collection List
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
