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
import useCollectionStore from "@/stores/collection-store";
import useCurrentIdStore from "@/stores/current-id-store";
import { useShallow } from "zustand/react/shallow";
import Renderer from "@/components/common/Renderer";
import {
  CollectionMetadata,
  CollectionElement,
  ImageElement,
} from "@/type/collection";
import { colors, round } from "@/styles/primitive-tokens";
import { CollectionAssets } from "@/type/collection";
import useModal from "@/hooks/useModal";
import useProgress from "@/hooks/useProgress";
import Editor from "@/components/admin/edit/Editor";
import PreviewModeChanger from "@/components/admin/edit/PreviewModeChanger";
import ImageGroup from "@/components/common/ImageGroup";
import CheckGroup from "@/components/admin/edit/CheckGroup";
import textStyles from "@/styles/typography";
import { Image } from "@/type/common";

export interface CollectionData {
  metadata: CollectionMetadata;
  collection: CollectionElement[];
}

interface Props {
  collectionId: string;
  collectionData: CollectionData | null;
}

export default function AdminCollectionEditPage({
  collectionId,
  collectionData,
}: Props) {
  const { modal, showModal } = useModal();
  const { progress, showProgress, hideProgress } = useProgress();
  const { register, handleSubmit, reset, control, setValue, getValues } =
    useForm<FieldValues>();
  // const collection = useCollectionStore((state) => state.collection);
  // const init = useCollectionStore((state) => state.init);
  const { collection, init, updateElement } = useCollectionStore(
    useShallow((state) => ({
      collection: state.collection,
      init: state.init,
      updateElement: state.updateElement,
    }))
  );
  const setCurrentId = useCurrentIdStore(
    useShallow((state) => state.setCurrentId)
  );
  const [assets, setAssets] = useState<CollectionAssets>({
    thumbnail: { file: null },
    share: {
      file: null,
      url: "https://images.unsplash.com/photo-1719328641025-3cb76ba87a97?q=80&w=3688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
  const publishOption = {
    Public: "public",
    Private: "private",
  };

  useEffect(() => {
    // init
    if (collectionData) {
      const publish = collectionData.metadata.publish
        ? publishOption.Public
        : publishOption.Private;

      init(collectionData);
      reset({
        publish: publish,
      });
      setAssets((current) => {
        return {
          thumbnail: {
            ...current.thumbnail,
            // url: collectionData.metadata.shareImg.url,
            // key: collectionData.metadata.shareImg.key,
          },
          share: {
            ...current.share,
            url: collectionData.metadata.shareImg.url,
            key: collectionData.metadata.shareImg.key,
          },
        };
      });
    }
  }, []);

  const handleInvokeCollectionModal = async () => {
    const modalContent = (
      <>
        <ImageGroup
          label="Meta Image"
          register={register}
          control={control}
          setValue={setValue}
          items={Object.entries(assets)}
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
      actionLabel: "Create",
      action: handleSubmit(handleSubmitCollectionData),
    });
  };

  const handleSubmitCollectionData = async (data: FieldValues) => {
    const newCollection = [...collection];

    const response = newCollection.map(async (element, elementIdx) => {
      if (element.elementName === "img") {
        const response = element.content.image
          .filter(({ file }) => file !== null)
          .map(async (img) => {
            const { key, url, file } = img;
            const result = await handleUploadImage({ key, preview: url, file });

            return { key: result!.key, url: result!.url, file: null };
          });

        await Promise.all(response).then((imgArr) => {
          newCollection[elementIdx] = {
            ...newCollection[elementIdx],
            content: {
              ...newCollection[elementIdx].content,
              image: [...imgArr],
            },
          } as ImageElement;
        });
      }
    });

    // 삭제까지 Promise 받고 DB 저장
    await Promise.all(response).then(() => {
      console.log(newCollection);
    });
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
          <Editor onInvokeCollectionModal={handleInvokeCollectionModal} />
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
  // const port

  return {
    props: {
      collectionId,
      collectionData: collectionData || null,
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
