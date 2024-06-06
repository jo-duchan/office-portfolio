import React, { useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { type PortfolioElement } from "@/stores/portfolio-store";
import { mapToArray } from "@/utils/utils";

interface BaseProps extends ElementProps {
  tagName: "h3" | "p";
}

function TextBase({ data, editable, tagName }: BaseProps) {
  const text = useRef<string>(data.content?.text || "");
  const inner = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const handleChange = (ev: ContentEditableEvent) => {
    text.current = ev.currentTarget.innerText;
  };
  const handleBlur = () => {
    // 여기서 직접 업데이트
  };
  return (
    <div>
      <ContentEditable
        className={mapToArray(data.className).join(" ")}
        html={text.current}
        innerRef={inner}
        disabled={!editable}
        onChange={handleChange}
        onBlur={handleBlur}
        tagName={tagName}
      />
    </div>
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
