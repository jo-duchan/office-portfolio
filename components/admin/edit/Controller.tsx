// import React, { useEffect, useState } from "react";
// import { useForm, type FieldValues } from "react-hook-form";
// import usePortfolioStore from "@/stores/portfolio-store";
// import useCurrentElementStore from "@/stores/current-element-store";
// import { useShallow } from "zustand/react/shallow";
// import { PortfolioElement } from "@/type/collection";

// type HashMap = Map<string, PortfolioElement>;

// function Editor() {
//   const { register, handleSubmit, watch, reset } = useForm<FieldValues>();
//   const currentId = useCurrentElementStore((state) => state.currentId);
//   const { body, updateElement } = usePortfolioStore(
//     useShallow((state) => ({
//       body: state.body,
//       updateElement: state.updateElement,
//     }))
//   );
//   const [elementHash, setElementHash] = useState<HashMap>();
//   const [currentItem, setCurrentItem] = useState<PortfolioElement>();

//   useEffect(() => {
//     const hashMap = body.reduce((map, obj) => {
//       map.set(obj.id, { ...obj });
//       return map;
//     }, new Map());

//     setElementHash(hashMap);
//   }, [body]);

//   useEffect(() => {
//     console.log(elementHash);
//     if (elementHash && currentId && currentId !== currentItem?.id) {
//       setCurrentItem(elementHash.get(currentId));
//     }
//   }, [currentId, elementHash]);

//   useEffect(() => {
//     const subscribe = watch((data: FieldValues, { name }) => {
//       if (!currentItem || !currentId) return;

//       if (name === "margin") {
//         updateElement(
//           {
//             ...currentItem,
//             className: {
//               ...currentItem.className,
//               margin: data.margin,
//             },
//           },
//           currentId
//         );
//       }
//     });
//     return () => subscribe.unsubscribe();
//   }, [watch, currentItem]);

//   const handleUpdateDatabase = () => {};

//   return (
//     <div>
//       에디터 item:
//       {currentItem?.tagName}
//       id: {currentId}
//       <form onSubmit={handleSubmit(handleUpdateDatabase)}>
//         <select {...register("margin")}>
//           <option value="margin-top-24">t</option>
//           <option value="margin-left-24">l</option>
//           <option value="margin-rigth-24">r</option>
//           <option value="margin-btm-24">b</option>
//         </select>
//       </form>
//     </div>
//   );
// }

// export default Editor;

function Controller() {
  return <></>;
}

export default Controller;
