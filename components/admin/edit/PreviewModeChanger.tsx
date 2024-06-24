import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm, type FieldValues } from "react-hook-form";
import useThemeStore from "@/stores/theme-store";
import { colors, round } from "@/styles/primitive-tokens";
import textStyles from "@/styles/typography";
import Select from "@/components/admin/edit/Select";

function PreviewModeChanger() {
  const { register, watch, reset, setValue, getValues } =
    useForm<FieldValues>();
  const updateMediaQuery = useThemeStore((state) => state.updateMediaQuery);

  useEffect(() => {
    // init
    reset({
      previewMode: "desktop",
    });
  }, []);

  useEffect(() => {
    const subscribe = watch((data: FieldValues, { name }) => {
      if (name !== "previewMode") return;

      if (data.previewMode === "desktop") {
        updateMediaQuery("large");
      }

      if (data.previewMode === "mobile") {
        updateMediaQuery("small");
      }
    });

    return () => subscribe.unsubscribe();
  }, [watch]);

  return (
    <Container>
      <OptionTitle>Preview Mode</OptionTitle>
      <Divider />
      <Select
        options={["desktop", "mobile"]}
        name={"previewMode"}
        register={register}
        setValue={setValue}
        getValues={getValues}
      />
    </Container>
  );
}

export default PreviewModeChanger;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 219px;
  height: 40px;
  background-color: ${colors.neutral[700]};
  border-radius: ${`${round.s}px`};
  padding: 8px 20px;
  margin-bottom: 12px;
`;

const OptionTitle = styled.h3`
  ${textStyles.label2.bold};
  color: ${colors.neutral[100]};
`;

const Divider = styled.div`
  width: 1px;
  height: 14px;
  background-color: ${colors.neutral[500]};
`;
