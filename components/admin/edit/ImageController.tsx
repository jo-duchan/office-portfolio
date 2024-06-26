import React, { useEffect } from "react";
import {
  type UseFormRegister,
  type UseFormWatch,
  type UseFormReset,
  type FieldValues,
  type UseFormSetValue,
  type UseFormGetValues,
} from "react-hook-form";
import useCollectionStore from "@/stores/collection-store";
import { useShallow } from "zustand/react/shallow";
import { type ImageElement } from "@/type/collection";
import { ControllerOptionWrapper } from "@/components/admin/edit/Controller";
import { marginOption, columnOption } from "@/constants/element-options";
import { convertColorValue } from "@/utils/utils";
import CheckGroup from "@/components/admin/edit/CheckGroup";
import ColorField from "@/components/admin/edit/ColorField";
import Select from "@/components/admin/edit/Select";

interface Props {
  currentData: ImageElement;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

function ImageController({
  currentData,
  register,
  watch,
  reset,
  setValue,
  getValues,
}: Props) {
  const updateElement = useCollectionStore(
    useShallow((state) => state.updateElement)
  );
  const { id, option } = currentData;

  useEffect(() => {
    // init
    reset({
      column: option.className.column,
      margin: option.className.margin,
      fill: option.fill,
    });
  }, [currentData]);

  useEffect(() => {
    const subscribe = watch((data: FieldValues, { name }) => {
      if (name === "column") {
        updateElement(
          {
            ...currentData,
            option: {
              ...currentData.option,
              className: {
                ...currentData.option.className,
                column: data.column,
              },
            },
          },
          id
        );
      }
      if (name === "margin") {
        updateElement(
          {
            ...currentData,
            option: {
              ...currentData.option,
              className: {
                ...currentData.option.className,
                margin: data.margin,
              },
            },
          },
          id
        );
      }
      if (name === "fill") {
        const convertFill = convertColorValue(data.fill);
        updateElement(
          {
            ...currentData,
            option: {
              ...currentData.option,
              fill: convertFill,
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
        <span className="control-label">Column</span>
        <CheckGroup
          options={columnOption}
          name="column"
          register={register}
          getValues={getValues}
        />
      </ControllerOptionWrapper>
      <ControllerOptionWrapper>
        <span className="control-label">Fill</span>
        <ColorField name="fill" register={register} getValues={getValues} />
      </ControllerOptionWrapper>
      <ControllerOptionWrapper>
        <span className="control-label">Margin</span>
        <Select
          options={marginOption}
          name="margin"
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      </ControllerOptionWrapper>
    </>
  );
}

export default ImageController;
