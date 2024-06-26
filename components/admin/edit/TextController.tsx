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
import { type HeadingElement, type TextElement } from "@/type/collection";
import { ControllerOptionWrapper } from "@/components/admin/edit/Controller";
import {
  fontSizeOption,
  marginOption,
  alineOption,
} from "@/constants/element-options";
import { convertColorValue } from "@/utils/utils";
import AlineTap from "@/components/admin/edit/AlineTap";
import ColorField from "@/components/admin/edit/ColorField";
import Select from "@/components/admin/edit/Select";

interface Props {
  currentData: HeadingElement | TextElement;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

function TextController({
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
      fontSize: option.className.fontSize,
      margin: option.className.margin,
      aline: option.className.aline,
      color: option.color,
      fill: option.fill,
    });
  }, [currentData]);

  useEffect(() => {
    const subscribe = watch((data: FieldValues, { name }) => {
      if (name === "fontSize") {
        updateElement(
          {
            ...currentData,
            option: {
              ...currentData.option,
              className: {
                ...currentData.option.className,
                fontSize: data.fontSize,
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

      if (name === "aline") {
        updateElement(
          {
            ...currentData,
            option: {
              ...currentData.option,
              className: {
                ...currentData.option.className,
                aline: data.aline,
              },
            },
          },
          id
        );
      }

      if (name === "color") {
        const convertColor = convertColorValue(data.color);
        updateElement(
          {
            ...currentData,
            option: {
              ...currentData.option,
              color: convertColor,
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
        <span className="control-label">Aline</span>
        <AlineTap
          option={alineOption}
          name="aline"
          register={register}
          getValues={getValues}
        />
      </ControllerOptionWrapper>
      <ControllerOptionWrapper>
        <span className="control-label">Color</span>
        <ColorField name="color" register={register} getValues={getValues} />
      </ControllerOptionWrapper>
      <ControllerOptionWrapper>
        <span className="control-label">Fill</span>
        <ColorField name="fill" register={register} getValues={getValues} />
      </ControllerOptionWrapper>
      <ControllerOptionWrapper>
        <span className="control-label">Size</span>
        <Select
          options={fontSizeOption}
          name="fontSize"
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
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

export default TextController;
