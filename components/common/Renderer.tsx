import * as ReactDOMServer from "react-dom/server";
import { type PortfolioElement } from "@/type/portfolio";
import { HeadingElement, TextElement } from "@/components/element/TextElement";
import RenderItem from "./RenderItem";

interface Props {
  data: PortfolioElement[];
  editable: boolean;
}

function Renderer({ data, editable }: Props) {
  return (
    <>
      {/* {data.head} */}
      {data?.map((element) => (
        <RenderItem key={element.id} element={element} editable={editable} />
      ))}
    </>
  );
}

export default Renderer;
