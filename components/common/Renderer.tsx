import * as ReactDOMServer from "react-dom/server";
import { PortfolioHead, PortfolioElement } from "@/type/portfolio";
import { HeadingElement, TextElement } from "@/components/element/TextElement";
import RenderItem from "./RenderItem";

interface Props {
  head: PortfolioHead;
  body: PortfolioElement[];
  editable: boolean;
}

function Renderer({ head, body, editable }: Props) {
  return (
    <>
      {/* {head} */}
      {body.map((element) => (
        <RenderItem key={element.id} element={element} editable={editable} />
      ))}
    </>
  );
}

export default Renderer;
