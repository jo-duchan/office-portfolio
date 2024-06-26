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
import { type GapElement } from "@/type/collection";
import { ControllerOptionWrapper } from "@/components/admin/edit/Controller";
import { gapSizeOption } from "@/constants/element-options";
import { convertColorValue } from "@/utils/utils";
import AlineTap from "@/components/admin/edit/AlineTap";
import ColorField from "@/components/admin/edit/ColorField";
import Select from "@/components/admin/edit/Select";

interface Props {
  currentData: GapElement;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

function GapController({
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
      fill: option.fill,
      gapSize: option.className.gapSize,
    });
  }, [currentData]);

  useEffect(() => {
    const subscribe = watch((data: FieldValues, { name }) => {
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
      if (name === "gapSize") {
        updateElement(
          {
            ...currentData,
            option: {
              ...currentData.option,
              className: {
                ...currentData.option.className,
                gapSize: data.gapSize,
              },
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
        <span className="control-label">Fill</span>
        <ColorField name="fill" register={register} getValues={getValues} />
      </ControllerOptionWrapper>
      <ControllerOptionWrapper>
        <span className="control-label">Size</span>
        <Select
          options={gapSizeOption}
          name="gapSize"
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      </ControllerOptionWrapper>
    </>
  );
}

export default GapController;
