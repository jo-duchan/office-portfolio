import React from "react";
import useCurrentElementStore from "@/stores/current-element-store";
import { HeadingElement, TextElement } from "@/components/element/TextElement";
import ImageElement from "@/components/element/ImageElement";
import { type PortfolioElement } from "@/type/portfolio";
interface Props {
  element: PortfolioElement;
  editable: boolean;
}

function RenderItem({ element, editable }: Props) {
  const setCurrentId = useCurrentElementStore((state) => state.setCurrentId);

  const handleSelectItem = () => {
    // select item
    setCurrentId(element.id);
  };

  const renderElement = () => {
    if (element.tagName === "h3") {
      return <HeadingElement data={element} editable={editable} />;
    }

    if (element.tagName === "p") {
      return <TextElement data={element} editable={editable} />;
    }

    if (element.tagName === "img") {
      return <ImageElement data={element} />;
    }
  };
  return <div onClick={handleSelectItem}>{renderElement()}</div>;
}

export default RenderItem;
