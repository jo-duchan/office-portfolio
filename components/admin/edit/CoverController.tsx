import React, { useEffect } from "react";
import {
  type UseFormRegister,
  type UseFormWatch,
  type UseFormReset,
  type FieldValues,
  type UseFormGetValues,
} from "react-hook-form";
import useCollectionStore from "@/stores/collection-store";
import { useShallow } from "zustand/react/shallow";
import { type CoverElement } from "@/type/collection";
import { ControllerOptionWrapper } from "@/components/admin/edit/Controller";
import { convertColorValue } from "@/utils/utils";
import ColorField from "@/components/admin/edit/ColorField";

interface Props {
  currentData: CoverElement;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  reset: UseFormReset<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

function CoverController({
  currentData,
  register,
  watch,
  reset,
  getValues,
}: Props) {
  const updateElement = useCollectionStore(
    useShallow((state) => state.updateElement)
  );
  const { id, option } = currentData;

  useEffect(() => {
    // init
    reset({
      titleColor: currentData.option.titleColor,
      descriptionColor: currentData.option.descriptionColor,
      keywordColor: currentData.option.keywordColor,
    });
  }, [currentData]);

  useEffect(() => {
    const subscribe = watch((data: FieldValues, { name }) => {
      if (name === "titleColor") {
        const convertColor = convertColorValue(data.titleColor);
        updateElement(
          {
            ...currentData,
            option: {
              ...currentData.option,
              titleColor: convertColor,
            },
          },
          id
        );
      }
      if (name === "descriptionColor") {
        const convertColor = convertColorValue(data.descriptionColor);
        updateElement(
          {
            ...currentData,
            option: {
              ...currentData.option,
              descriptionColor: convertColor,
            },
          },
          id
        );
      }
      if (name === "keywordColor") {
        const convertColor = convertColorValue(data.keywordColor);
        updateElement(
          {
            ...currentData,
            option: {
              ...currentData.option,
              keywordColor: convertColor,
            },
          },
          id
        );
      }
    });

    return () => subscribe.unsubscribe();
  }, [watch, currentData]);

  return (
    <>
      <ControllerOptionWrapper>
        <span className="control-label">Title</span>
        <ColorField
          name="titleColor"
          register={register}
          getValues={getValues}
        />
      </ControllerOptionWrapper>
      <ControllerOptionWrapper>
        <span className="control-label">Desc</span>
        <ColorField
          name="descriptionColor"
          register={register}
          getValues={getValues}
        />
      </ControllerOptionWrapper>
      <ControllerOptionWrapper>
        <span className="control-label">Keyword</span>
        <ColorField
          name="keywordColor"
          register={register}
          getValues={getValues}
        />
      </ControllerOptionWrapper>
    </>
  );
}

export default CoverController;
