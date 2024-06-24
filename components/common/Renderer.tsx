import * as ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import { HeadingElement, TextElement } from "@/components/element/TextElement";

import { CollectionHead, CollectionElement } from "@/type/collection";
import RenderHead from "@/components/common/RenderHead";
import RenderItem from "@/components/common/RenderItem";

interface Props {
  head: CollectionHead;
  body: CollectionElement[];
  editable: boolean;
}

function Renderer({ head, body, editable }: Props) {
  return (
    <Container>
      <RenderHead data={head} />
      {body?.map((element) => (
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
