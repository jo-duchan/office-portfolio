import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import styled from "styled-components";
import { useForm, type FieldValues } from "react-hook-form";
import { getCollection, setCollection } from "@/actions/collection-action";
import {
  getCollectionSimple,
  setCollectionSimple,
} from "@/actions/collection-list-action";
import { handleUploadImage } from "@/actions/img-upload-actions";
import { deleteImagesFromS3 } from "@/actions/img-delete-actions";
import useCollectionStore from "@/stores/collection-store";
import useCurrentIdStore from "@/stores/current-id-store";
import useDeleteImagesStore from "@/stores/delete-images-store";
import { useShallow } from "zustand/react/shallow";
import Renderer from "@/components/common/Renderer";
import { CollectionData, CollectionElement } from "@/type/collection";
import { CollectionAssets } from "@/type/collection";
import { CollectionSimple } from "@/type/collection-list";
import useModal from "@/hooks/useModal";
import useProgress from "@/hooks/useProgress";
import { publishOption } from "@/constants/metadata-option";
import { useRouter } from "next/router";
import PATH from "@/constants/path";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";
import collectionStyle from "@/styles/collection-style";
import Editor from "@/components/admin/edit/Editor";
import PreviewModeChanger from "@/components/admin/edit/PreviewModeChanger";
import ImageGroup from "@/components/common/ImageGroup";
import CheckGroup from "@/components/admin/edit/CheckGroup";

export interface SaveCollectionParams {
  metaImageResult?: CollectionAssets;
  publish?: boolean;
  isProgrss?: boolean;
}

interface Props {
  collectionId: string;
  collectionData: CollectionData;
  collectionSimpleData: CollectionSimple;
}

export default function AdminCollectionEditPage({
  collectionId,
  collectionData,
  collectionSimpleData,
}: Props) {
  const router = useRouter();
  const { modal, showModal } = useModal();
  const { progress, showProgress, hideProgress } = useProgress();
  const { register, handleSubmit, reset, control, setValue, getValues } =
    useForm<FieldValues>();
  const { collection, init } = useCollectionStore(
    useShallow((state) => ({
      collection: state.collection,
      init: state.init,
    }))
  );
  const setCurrentId = useCurrentIdStore(
    useShallow((state) => state.setCurrentId)
  );
  const { imageKeys, resetKeys } = useDeleteImagesStore(
    useShallow((state) => ({
      imageKeys: state.imageKeys,
      resetKeys: state.resetKeys,
    }))
  );
  const [assets, setAssets] = useState<CollectionAssets>({
    thumbnail: { file: null },
    share: { file: null },
  });

  useEffect(() => {
    // init
    const publish = collectionData.metadata.publish
      ? publishOption.Public
      : publishOption.Private;

    init({
      collection: collectionData.collection,
    });
    reset({
      publish,
    });
    setAssets((current) => {
      return {
        ...current,
        thumbnail: {
          ...current.thumbnail,
          url: collectionSimpleData?.thumbnail.url,
          key: collectionSimpleData?.thumbnail.key,
        },
        share: {
          ...current.share,
          url: collectionData.metadata.shareImg.url,
          key: collectionData.metadata.shareImg.key,
        },
      };
    });
  }, []);

  const handleInvokeCollectionModal = async () => {
    const modalContent = (
      <>
        <ImageGroup
          label="Meta Image"
          register={register}
          control={control}
          setValue={setValue}
          items={assets}
        />
        <ModalCheckGropWrapper>
          <CheckGroup
            theme="light"
            size="large"
            name="publish"
            options={publishOption}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
          <div className="divider" />
          <p>컬렉션의 공개 여부를 선택해 주세요.</p>
        </ModalCheckGropWrapper>
      </>
    );

    showModal({
      title: "Publish Collection",
      children: modalContent,
      actionLabel: "Publish",
      action: handleSubmit(handleSubmitCollection),
    });
  };

  const handleUploadMetaImage = async (
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

  const handleUploadCollectionImage = async (
    collection: CollectionElement[]
  ): Promise<CollectionElement[]> => {
    for (let i = 0; i < collection.length; i++) {
      const element = collection[i];
      if (element.elementName === "img") {
        const removeEmpty = element.content.image.filter(
          ({ file, key }) => !(file === null && key === undefined)
        );

        if (removeEmpty.length === 0) {
          continue;
        }

        const imgArr = await Promise.all(
          removeEmpty.map(async (img) => {
            const { key, url, file } = img;
            if (file === null) {
              return { key: key, url: url, file: null };
            }
            const result = await handleUploadImage({
              key,
              preview: url,
              file,
            });
            return { key: result?.key, url: result?.url, file: null };
          })
        );

        // 새로운 객체를 생성하여 불변성을 유지하고 속성 업데이트
        collection[i] = {
          ...element,
          content: {
            ...element.content,
            image: imgArr,
          },
        };
      }
    }

    return collection;
  };

  const handleSaveCollection = async ({
    metaImageResult,
    publish,
    isProgrss = true,
  }: SaveCollectionParams) => {
    isProgrss && showProgress();
    const metadata = {
      ...collectionData.metadata,
    };

    const simpleData = {
      ...collectionSimpleData,
    };

    if (metaImageResult && publish !== undefined) {
      metadata.shareImg = metaImageResult.share;
      metadata.publish = publish;
      simpleData.thumbnail = metaImageResult.thumbnail;
      simpleData.publish = publish;
    }

    const newCollection = [...collection];
    const collectionResult = await handleUploadCollectionImage(newCollection);

    await setCollection({
      id: collectionId,
      data: {
        metadata,
        collection: collectionResult,
      },
    });

    await setCollectionSimple({
      id: collectionId,
      data: {
        ...simpleData,
      },
    });

    if (imageKeys.length > 0) {
      await deleteImagesFromS3(imageKeys);
      resetKeys();
    }

    isProgrss && hideProgress();
  };

  const handleSubmitCollection = async (data: FieldValues) => {
    const publishBoolean = data.publish === "public";
    const newAssets = assets;
    const isEmptyThumbnail = !(data.thumbnail[0] || assets.thumbnail.key);
    const isEmptyShare = !(data.share[0] || assets.share.key);

    if (isEmptyThumbnail || isEmptyShare) {
      window.alert("내용을 입력하세요.");
      return;
    }

    if (data.thumbnail[0]) {
      newAssets.thumbnail.file = data.thumbnail[0];
    }
    if (data.share[0]) {
      newAssets.share.file = data.share[0];
    }

    showProgress();
    const metaImageResult = await handleUploadMetaImage(newAssets);

    await handleSaveCollection({
      metaImageResult,
      publish: publishBoolean,
      isProgrss: false,
    });

    hideProgress();
    router.push(PATH.ADMIN);
  };

  const handleUnselectItem = () => {
    setCurrentId(undefined);
  };

  return (
    <>
      <Head>
        <title>Admin Edit</title>
      </Head>
      <Container>
        <CanvasSection>
          <Wrapper>
            <PreviewModeChanger />
            <div className="canvas">
              <Renderer data={collection} editable={true} />
            </div>
          </Wrapper>
        </CanvasSection>
        <EditorSection>
          <Editor
            onInvokeCollectionModal={handleInvokeCollectionModal}
            onSaveCollection={handleSaveCollection}
          />
        </EditorSection>
        <Background onClick={handleUnselectItem} />
      </Container>
      {modal}
      {progress}
    </>
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
  const collectionId = params?.collectionId as string;
  const collectionData = await getCollection(collectionId);
  const collectionSimpleData = await getCollectionSimple(collectionId);

  if (!collectionData || !collectionSimpleData) {
    return {
      redirect: {
        destination: PATH.ADMIN,
        permanent: false,
      },
    };
  }

  return {
    props: {
      collectionId,
      collectionData: collectionData,
      collectionSimpleData: collectionSimpleData,
    },
  };
};

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  min-width: 1700px;
  height: 100%;
  overflow: auto;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.neutral[50]};
  z-index: 0;
`;

const CanvasSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 500;
  pointer-events: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 1440px;
  height: 100%;
  pointer-events: none;

  & .canvas {
    ${collectionStyle};
    width: ${({ theme }) =>
      theme.mediaQuery === "small" ? "360px" : "1440px"};
    height: 870px;
    border: 4px solid ${colors.neutral[700]};
    border-bottom: initial;
    border-top-left-radius: ${`${round.m}px`};
    border-top-right-radius: ${`${round.m}px`};
    background-color: ${colors.neutral[0]};
    overflow: hidden auto;
    pointer-events: auto;
  }
`;

const EditorSection = styled.div`
  position: relative;
  width: 260px;
  min-width: 260px;
  height: 870px;
  background-color: ${colors.neutral[700]};
  border-top-left-radius: ${`${round.m}px`};
  z-index: 500;
`;

const ModalCheckGropWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 12px;

  & .divider {
    width: 1px;
    height: 16px;
    background-color: ${colors.neutral[300]};
  }

  & p {
    ${textStyles.body4.regular};
    color: ${colors.neutral[600]};
  }
`;
