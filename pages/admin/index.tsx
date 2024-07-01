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
  getCollectionAllList,
} from "@/actions/collection-list-action";
import { handleUploadImage } from "@/actions/img-upload-actions";
import useDeleteImagesStore from "@/stores/delete-images-store";
import { useShallow } from "zustand/react/shallow";
import { colors } from "@/styles/primitive-tokens";
import {
  CollectionAssets,
  CoverElement,
  CollectionMetadata,
  CollectionElement,
  CollectionData,
} from "@/type/collection";
import { CollectionSimple } from "@/type/collection-list";
import { getId, convertTextToSlug } from "@/utils/utils";
import useModal from "@/hooks/useModal";
import useProgress from "@/hooks/useProgress";
import HomeActions from "@/components/admin/home/HomeActions";
import PortfolioList from "@/components/admin/home/PortfolioList";
import TextField from "@/components/common/TextField";
import TextArea from "@/components/common/TextArea";
import ImageGroup from "@/components/common/ImageGroup";
import ChipGroup from "@/components/common/ChipGroup";

interface Props {
  simpleList: CollectionSimple[];
}

interface SaveCollectionParams {
  id: string;
  isFirstTime: boolean;
  title: string;
  description: string;
  keyword: string;
  newAssets: CollectionAssets;
  collectionData?: CollectionData;
}

export default function AdminHomePage({ simpleList }: Props) {
  const router = useRouter();
  const { modal, showModal } = useModal();
  const { progress, showProgress, hideProgress } = useProgress();
  const { register, handleSubmit, reset, control, setValue } =
    useForm<FieldValues>();
  const [assets, setAssets] = useState<CollectionAssets>({
    desktop: { file: null },
    mobile: { file: null },
  });
  const { imageKeys, resetKeys } = useDeleteImagesStore(
    useShallow((state) => ({
      imageKeys: state.imageKeys,
      resetKeys: state.resetKeys,
    }))
  );

  const handleUploadCoverImage = async (
    assets: CollectionAssets
  ): Promise<CollectionAssets> => {
    const entries = Object.entries(assets);

    for (const [objKey, value] of entries) {
      const { key, url, file } = value;
      const result = await handleUploadImage({ key, preview: url, file });

      if (result) {
        assets[objKey] = { key: result.key, url: result.url, file: null };
      }
    }

    return assets;
  };

  const handleSaveCollection = async ({
    id,
    isFirstTime,
    title,
    description,
    keyword,
    newAssets,
    collectionData,
  }: SaveCollectionParams) => {
    let metadata: CollectionMetadata;
    let elementList: CollectionElement[] = [];
    let coverElemet: CoverElement;

    if (collectionData) {
      metadata = {
        ...collectionData.metadata,
        title,
        description,
        keyword,
      };

      elementList = collectionData.collection;
      coverElemet = elementList.find(
        ({ elementName }) => elementName === "cover"
      ) as CoverElement;
      coverElemet = {
        ...coverElemet,
        content: {
          title,
          description,
          keyword,
          desktop: newAssets.desktop,
          mobile: newAssets.mobile,
        },
      };
      elementList[0] = coverElemet;
    } else {
      metadata = {
        title,
        description,
        keyword,
        shareImg: { file: null },
        publish: false,
      };
      coverElemet = {
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
          desktop: newAssets.desktop,
          mobile: newAssets.mobile,
        },
      };

      elementList.push(coverElemet);
    }

    await setCollection({
      id,
      data: {
        metadata,
        collection: [...elementList],
      },
    });

    if (isFirstTime) {
      await setCollectionSimple({
        id,
        data: {
          thumbnail: { file: null },
          title,
          order: null,
          publish: false,
          date: Date.now(),
        },
      });
    }
  };

  const handleInvokeCollectionModal = async (id?: string) => {
    let initialKeyword: string[] = [];
    let collectionData: CollectionData | undefined;
    if (id) {
      showProgress();
      const result = await getCollection(id);

      if (result) {
        collectionData = result as CollectionData;
        const coverElement: CoverElement = result.collection.find(
          ({ elementName }: CollectionElement) => elementName === "cover"
        );

        const { desktop, mobile, title, description, keyword } =
          coverElement.content;

        initialKeyword = keyword.split(",");

        reset({
          title,
          description,
          keyword,
        });

        setAssets((current) => {
          const newAssets = current;
          newAssets.desktop = desktop;
          newAssets.mobile = mobile;

          return { ...newAssets };
        });
      }
      hideProgress();
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
          items={assets}
        />
        <ChipGroup
          label="Keyword"
          name="keyword"
          register={register}
          setValue={setValue}
          initalValue={initialKeyword}
        />
      </>
    );

    showModal({
      title: `${id ? "Collection" : "New Collection"}`,
      children: modalContent,
      actionLabel: "Create",
      action: handleSubmit((data) =>
        handleSubmitCollectionData(data, id, collectionData)
      ),
    });
  };

  const handleSubmitCollectionData = async (
    data: FieldValues,
    id?: string,
    collectionData?: CollectionData
  ) => {
    const { title, description, desktop, mobile, keyword } = data;
    const isEmptyDesktop = !(desktop[0] || assets.desktop.key);
    const isEmptyMobile = !(mobile[0] || assets.mobile.key);

    if (!title || !description || !keyword || isEmptyDesktop || isEmptyMobile) {
      window.alert("내용을 입력하세요.");
      return;
    }

    const kebabCaseTitle = convertTextToSlug(title);
    let isDuplicate: boolean | undefined;

    if (!id) {
      isDuplicate = await checkForDuplicates(kebabCaseTitle);
    }

    if (isDuplicate && !id) {
      window.alert("동일한 프로젝트 제목이 존재합니다.");
      return;
    }

    const newAssets = assets;
    if (desktop[0]) {
      newAssets.desktop.file = desktop[0];
    }

    if (mobile[0]) {
      newAssets.mobile.file = mobile[0];
    }

    showProgress();
    const coverImageResult = await handleUploadCoverImage(newAssets);

    await handleSaveCollection({
      id: id || kebabCaseTitle,
      isFirstTime: id === undefined,
      title,
      description,
      keyword,
      newAssets: coverImageResult,
      collectionData,
    });

    hideProgress();
    router.push(`${PATH.ADMIN}/${kebabCaseTitle}`);
  };

  return (
    <>
      <Head>
        <title>Admin Home</title>
      </Head>
      <Container>
        <Wrapper>
          <HomeActions onInvokeCollectionModal={handleInvokeCollectionModal} />
          <PortfolioList
            simpleList={simpleList}
            onInvokeCollectionModal={handleInvokeCollectionModal}
          />
        </Wrapper>
      </Container>
      {modal}
      {progress}
    </>
  );
}

export async function getServerSideProps() {
  // get Collection List
  const simpleList = await getCollectionAllList();

  return {
    props: {
      simpleList: simpleList || [],
    },
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.neutral[50]};
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  padding-block: 80px;
`;
