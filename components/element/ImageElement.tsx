import React, { useEffect } from "react";
import { useWatch, useForm, type FieldValues } from "react-hook-form";
import usePortfolioStore from "@/stores/portfolio-store";
import { useShallow } from "zustand/react/shallow";
import { PortfolioElement } from "@/type/portfolio";
import { Image } from "@/type/common";

interface BaseProps {
  index: number;
  imgData: Image;
  onChange: (imgData: File, index: number) => void;
}

function ImageBase({ index, imgData, onChange }: BaseProps) {
  const { register, control } = useForm<FieldValues>();
  const imgInput: FieldValues = useWatch({
    name: "img",
    control,
  });

  useEffect(() => {
    // updateElement({}, id);
    imgInput && onChange(imgInput[0], index);
    console.log(imgInput);
  }, [imgInput]);

  if (imgData.url) {
    return <img src={imgData.url} />;
  }

  return (
    <label>
      <input type="file" {...register("img")} />
    </label>
  );
}

interface ElementProps {
  data: PortfolioElement;
}

function ImageElement({ data }: ElementProps) {
  const { updateElement } = usePortfolioStore(
    useShallow((state) => ({ updateElement: state.updateElement }))
  );

  const handleChangeImage = (imgData: File, index: number) => {
    console.log("여기", imgData);
    const newImage = [...(data.content?.image || [])];
    if (!newImage) return;
    newImage[index] = {
      key: newImage[index].key,
      file: imgData,
      url: URL.createObjectURL(imgData),
    };
    // console.log(newImage[index]);
    // newImage[index].file = imgData;
    // newImage[index].url = URL.createObjectURL(imgData);
    updateElement(
      {
        ...data,
        content: {
          image: newImage,
        },
      },
      data.id
    );
  };

  return (
    <div>
      {data.content?.image?.map((img, index) => (
        <ImageBase
          key={img.key}
          index={index}
          imgData={img}
          onChange={handleChangeImage}
        />
      ))}
    </div>
  );
}

export default ImageElement;
