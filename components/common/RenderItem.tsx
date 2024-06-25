import React from "react";
import useCurrentElementStore from "@/stores/current-element-store";
import { type CollectionElement } from "@/type/collection";
import HeadElement from "@/components/element/CoverElement";
import { HeadingElement, TextElement } from "@/components/element/TextElement";
import ImageElement from "@/components/element/ImageElement";
import GapElement from "@/components/element/GapElement";

interface Props {
  element: CollectionElement;
  editable: boolean;
}

function RenderItem({ element, editable }: Props) {
  const setCurrentId = useCurrentElementStore((state) => state.setCurrentId);

  const handleSelectItem = () => {
    // select item
    setCurrentId(element.id);
  };

  const renderElement = () => {
    if (element.elementName === "cover") {
      return <HeadElement data={element} />;
    }
    if (element.elementName === "h3") {
      return <HeadingElement data={element} editable={editable} />;
    }

    if (element.elementName === "p") {
      return <TextElement data={element} editable={editable} />;
    }

    if (element.elementName === "img") {
      return <ImageElement data={element} editable={editable} />;
    }

    if (element.elementName === "gap") {
      return <GapElement data={element} />;
    }
  };

  return <div onClick={handleSelectItem}>{renderElement()}</div>;
}

export default RenderItem;
