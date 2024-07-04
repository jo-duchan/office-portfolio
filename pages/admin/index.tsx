import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useForm, type FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import {
  setCollection,
  getCollection,
  deleteCollection,
} from "@/actions/collection-action";
import {
  checkForDuplicates,
  setCollectionSimple,
  getCollectionAllList,
  deleteCollectionSimple,
} from "@/actions/collection-list-action";
import { handleUploadImage } from "@/actions/img-upload-actions";
import { deleteImagesFromS3 } from "@/actions/img-delete-actions";
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
import OrderList from "@/components/admin/home/OrderList";

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
  const { modal, showModal, hideModal } = useModal();
  const { progress, showProgress, hideProgress } = useProgress();
  const {
    register: collectionRegister,
    handleSubmit: collectionSubmit,
    reset: collectionReset,
    control: collectionControl,
    setValue: collectionSetValue,
  } = useForm<FieldValues>();
  const {
    register: orderRegister,
    handleSubmit: orderSubmit,
    setValue: orderSetValue,
  } = useForm<FieldValues>();
  const [assets, setAssets] = useState<CollectionAssets>({
    desktop: { file: null },
    mobile: { file: null },
  });

  const handleUpdateOrder = async (data: FieldValues) => {
    showProgress();
    const newSimpleList = [...simpleList].filter((item) => item.publish);
    const orders: string[] = JSON.parse(data.orders);
    const unorders: string[] = JSON.parse(data.unorders);

    orders.forEach((title, idx) => {
      const itemIndex = newSimpleList.findIndex((item) => item.title === title);
      newSimpleList[itemIndex].order = idx + 1;
    });

    unorders.forEach((title) => {
      const itemIndex = newSimpleList.findIndex((item) => item.title === title);
      newSimpleList[itemIndex].order = 999;
    });

    for (const simpleItem of newSimpleList) {
      await setCollectionSimple({
        id: convertTextToSlug(simpleItem.title),
        data: simpleItem,
      });
    }
    hideProgress();
    hideModal();
  };

  const handleInvokeOrderModal = () => {
    const initialOrders = [...simpleList]
      .filter((item) => item.order !== 999 && item.publish)
      .sort((a, b) => a.order - b.order);

    const initialUnorders = simpleList.filter(
      (item) => item.order === 999 && item.publish
    );

    showModal({
      title: "Update Order",
      children: (
        <OrderList
          initialOrders={initialOrders}
          initialUnorders={initialUnorders}
          register={orderRegister}
          setValue={orderSetValue}
        />
      ),
      actionLabel: "Save",
      action: orderSubmit(handleUpdateOrder),
    });
  };

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
          order: 999,
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

        collectionReset({
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
      collectionReset({
        title: "",
        description: "",
        keyword: "",
      });
      setAssets((current) => {
        const newAssets = current;
        newAssets.desktop = { file: null };
        newAssets.mobile = { file: null };

        return { ...newAssets };
      });
    }

    const modalContent = (
      <>
        <TextField
          register={collectionRegister}
          name="title"
          label="Title"
          placeholder="프로젝트 제목을 입력하세요."
          disabled={id !== undefined}
        />
        <TextArea
          register={collectionRegister}
          name="description"
          label="Description"
          placeholder="프로젝트 설명을 입력하세요."
        />
        <ImageGroup
          label="Cover Image"
          register={collectionRegister}
          control={collectionControl}
          setValue={collectionSetValue}
          items={assets}
        />
        <ChipGroup
          label="Keyword"
          name="keyword"
          register={collectionRegister}
          setValue={collectionSetValue}
          initalValue={initialKeyword}
        />
      </>
    );

    showModal({
      title: `${id ? "Collection" : "New Collection"}`,
      children: modalContent,
      actionLabel: "Create",
      action: collectionSubmit((data) =>
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

  const handleDeleteCollection = async (title: string) => {
    const id = convertTextToSlug(title);
    const imageKeys: string[] = [];

    if (!window.confirm(`${title}을 삭제하시겠습니까?`)) {
      return;
    }

    showProgress();
    const result = (await getCollection(id)) as CollectionData | undefined;

    if (result) {
      result.collection.forEach((item) => {
        if (item.elementName === "img") {
          item.content.image.forEach((img) => {
            const { key } = img;

            key && imageKeys.push(key);
          });
        }

        if (item.elementName === "cover") {
          const { desktop, mobile } = item.content;

          desktop.key && imageKeys.push(desktop.key);
          mobile.key && imageKeys.push(mobile.key);
        }
      });
      const shareImgKey = result.metadata.shareImg.key;

      if (shareImgKey) {
        imageKeys.push(shareImgKey);
      }

      const simpleIndex = simpleList.findIndex((item) => item.title === title);
      const thumbnailKey = simpleList[simpleIndex].thumbnail.key;

      if (thumbnailKey) {
        imageKeys.push(thumbnailKey);
      }
    }

    await deleteImagesFromS3([]);
    await deleteCollection(convertTextToSlug(id));
    await deleteCollectionSimple(convertTextToSlug(id));
    hideProgress();

    router.push(PATH.ADMIN);
  };

  return (
    <>
      <Head>
        <title>Admin Home</title>
      </Head>
      <Container>
        <Wrapper>
          <HomeActions
            onInvokeCollectionModal={handleInvokeCollectionModal}
            onInvokeOrderModal={handleInvokeOrderModal}
          />
          <PortfolioList
            simpleList={simpleList}
            onInvokeCollectionModal={handleInvokeCollectionModal}
            onDeleteCollection={handleDeleteCollection}
          />
        </Wrapper>
      </Container>
      {modal}
      {progress}
    </>
  );
}

export async function getServerSideProps() {
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
  overflow: hidden auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  padding-block: 80px;
`;
