import * as ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import { HeadingElement, TextElement } from "@/components/element/TextElement";
import RenderItem from "@/components/common/RenderItem";
import { PortfolioHead, PortfolioElement } from "@/type/collection";

interface Props {
  head: PortfolioHead;
  body: PortfolioElement[];
  editable: boolean;
}

function Renderer({ head, body, editable }: Props) {
  return (
    <Container>
      {/* {head} */}
      {body.map((element) => (
        <RenderItem key={element.id} element={element} editable={editable} />
      ))}
    </Container>
  );
}

export default Renderer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
