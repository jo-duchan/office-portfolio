import * as ReactDOMServer from "react-dom/server";
import { type PortfolioItem } from "@/stores/portfolio-store";
import { HeadingElement, TextElement } from "@/components/element/TextElement";
import RenderItem from "./RenderItem";

interface Props {
  data: PortfolioItem;
  editable: boolean;
}

function Renderer({ data, editable }: Props) {
  return data.body.map((element) => (
    <RenderItem key={element.id} element={element} editable={editable} />
  ));
}

export default Renderer;
