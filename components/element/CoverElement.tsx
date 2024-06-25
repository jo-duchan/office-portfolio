import React from "react";
import { type CoverElement } from "@/type/collection";

interface Props {
  data: CoverElement;
}

function CoverElement({ data }: Props) {
  const { title, description, keyword, desktop, mobile } = data.content;

  return (
    <div className="collection-head">
      <div className="text-wrapper">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <ul>
          {keyword?.split(",").map((keyword) => (
            <li className="keyword" key={keyword}>
              {keyword}
            </li>
          ))}
        </ul>
      </div>
      <img className="collection-large-img" src={desktop.url} />
      <img className="collection-small-img" src={mobile.url} />
    </div>
  );
}

export default CoverElement;
