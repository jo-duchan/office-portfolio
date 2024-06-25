import { type CollectionElement } from "@/type/collection";
import RenderItem from "@/components/common/RenderItem";

interface Props {
  data: CollectionElement[];
  editable: boolean;
}

function Renderer({ data, editable }: Props) {
  return (
    <div className="collection-wrapper">
      {data?.map((element) => (
        <RenderItem key={element.id} element={element} editable={editable} />
      ))}
    </div>
  );
}

export default Renderer;
