import React from "react";
import { type PortfolioElement } from "@/stores/portfolio-store";
import { HeadingElement, TextElement } from "@/components/element/TextElement";

interface Props {
  element: PortfolioElement;
  editable: boolean;
}

function RenderItem({ element, editable }: Props) {
  const handleSelectItem = () => {
    // select item
    console.log(element.id);
  };

  const renderElement = () => {
    if (element.tagName === "h3") {
      return <HeadingElement data={element} editable={editable} />;
    }

    if (element.tagName === "p") {
      return <TextElement data={element} editable={editable} />;
    }
  };
  return <div onClick={handleSelectItem}>{renderElement()}</div>;
}

export default RenderItem;
