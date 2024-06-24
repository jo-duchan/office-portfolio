import React, { useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
// import usePortfolioStore from "@/stores/portfolio-store";
import { useShallow } from "zustand/react/shallow";
// import { type PortfolioElement } from "@/type/collection";

interface BaseProps extends ElementProps {
  tagName: "h3" | "p";
}

function TextBase({ data, editable, tagName }: BaseProps) {
  // const { updateElement } = usePortfolioStore(
  //   useShallow((state) => ({ updateElement: state.updateElement }))
  // );
  const text = useRef<string>(data.content?.text || "");
  const inner = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const handleChange = (ev: ContentEditableEvent) => {
    text.current = ev.currentTarget.innerText;
  };
  const handleBlur = () => {
    // 여기서 직접 업데이트
    // updateElement(
    //   {
    //     ...data,
    //     content: {
    //       text: text.current,
    //     },
    //   },
    //   data.id
    // );
  };
  return (
    <ContentEditable
      className={Object.values(data.className).join(" ")}
      html={text.current}
      innerRef={inner}
      disabled={!editable}
      onChange={handleChange}
      onBlur={handleBlur}
      tagName={tagName}
    />
  );
}

interface ElementProps {
  data: PortfolioElement;
  editable: boolean;
}

export function HeadingElement({ data, editable }: ElementProps) {
  return <TextBase tagName="h3" editable={editable} data={data} />;
}

export function TextElement({ data, editable }: ElementProps) {
  return <TextBase tagName="p" editable={editable} data={data} />;
}
