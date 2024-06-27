import React, { useEffect } from "react";
import {
  type UseFormRegister,
  type UseFormWatch,
  type UseFormReset,
  type FieldValues,
  type UseFormSetValue,
  type UseFormGetValues,
} from "react-hook-form";
import useDefaultOptionStore from "@/stores/collection-default-option";
import { useShallow } from "zustand/react/shallow";
import { ControllerOptionWrapper } from "@/components/admin/edit/Controller";
import {
  alineOption,
  columnOption,
  fontSizeOption,
  gapSizeOption,
  marginOption,
} from "@/constants/element-options";
import { convertColorValue } from "@/utils/utils";
import AlineTap from "@/components/admin/edit/AlineTap";
import CheckGroup from "@/components/admin/edit/CheckGroup";
import ColorField from "@/components/admin/edit/ColorField";
import Select from "@/components/admin/edit/Select";

interface Props {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

function DefaultController({
  register,
  watch,
  reset,
  setValue,
  getValues,
}: Props) {
  const { options, updateOption } = useDefaultOptionStore(
    useShallow((state) => ({
      options: state.options,
      updateOption: state.updateOption,
    }))
  );

  useEffect(() => {
    // init
    reset({
      aline: options.aline,
      column: options.column,
      color: options.color,
      fill: options.fill,
      fontSize: options.fontSize,
      gapSize: options.gapSize,
      margin: options.margin,
    });
  }, []);

  useEffect(() => {
    const subscribe = watch((data: FieldValues, { name }) => {
      if (name === "aline") {
        updateOption({ ...options, aline: data.aline });
      }

      if (name === "column") {
        updateOption({ ...options, column: data.column });
      }

      if (name === "color") {
        const convertColor = convertColorValue(data.color);
        updateOption({ ...options, color: convertColor });
      }

      if (name === "fill") {
        const convertFill = convertColorValue(data.fill);
        updateOption({ ...options, fill: convertFill });
      }

      if (name === "fontSize") {
        updateOption({ ...options, fontSize: data.fontSize });
      }

      if (name === "gapSize") {
        updateOption({ ...options, gapSize: data.gapSize });
      }

      if (name === "margin") {
        updateOption({ ...options, margin: data.margin });
      }
    });

    return () => subscribe.unsubscribe();
  }, [watch, options]);

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
        <span className="control-label">Column</span>
        <CheckGroup
          options={columnOption}
          name="column"
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
        <span className="control-label">Font Size</span>
        <Select
          options={fontSizeOption}
          name="fontSize"
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      </ControllerOptionWrapper>
      <ControllerOptionWrapper>
        <span className="control-label">Gap Size</span>
        <Select
          options={gapSizeOption}
          name="gapSize"
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

export default DefaultController;
