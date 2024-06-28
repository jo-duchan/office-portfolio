import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CollectionState, CollectionElement } from "@/type/collection";

export interface CollectionAction {
  init: (data: CollectionState) => void;
  addElement: (element: CollectionElement, currentId?: string) => void;
  updateElement: (element: CollectionElement, currentId: string) => void;
  removeElement: (currentId: string) => void;
  reset: () => void;
}

const defaultState: CollectionState = {
  collection: [] as CollectionElement[],
};

const useCollectionStore = create<CollectionState & CollectionAction>()(
  immer((set) => ({
    ...defaultState,
    init: (data) =>
      set((state) => {
        state.collection = data.collection;
      }),
    addElement: (element, currentId) =>
      set((state) => {
        console.log(currentId);
        let startPoint = state.collection.length;

        if (currentId) {
          const selectIndex = state.collection.findIndex(
            ({ id }) => id === currentId
          );
          startPoint = selectIndex + 1;
        }

        state.collection.splice(startPoint, 0, element);
      }),
    updateElement: (element, currentId) =>
      set((state) => {
        const selectIndex = state.collection.findIndex(
          ({ id }) => id === currentId
        );

        state.collection[selectIndex] = element;
      }),
    removeElement: (currentId) =>
      set((state) => {
        const selectIndex = state.collection.findIndex(
          ({ id }) => id === currentId
        );

        state.collection.splice(selectIndex, 1);
      }),
    reset: () => set(defaultState),
  }))
);

export default useCollectionStore;

// const useCollectionStore = create<CollectionState & CollectionAction>()(
//   (set) => ({
//     ...defaultState,
//     init: (data) =>
//       set((state) => ({
//         collection: data.collection,
//       })),
//     addElement: (element, currentId) =>
//       set((state) => {
//         const newCollection = state.collection;
//         let startPoint = newCollection.length;

//         if (currentId) {
//           const selectIndex = newCollection.findIndex(
//             ({ id }) => id === currentId
//           );
//           startPoint = selectIndex + 1;
//         }

//         newCollection.splice(startPoint, 0, element);

//         return {
//           collection: newCollection,
//         };
//       }),
//     updateElement: (element, currentId) =>
//       set((state) => {
//         const selectIndex = state.collection.findIndex(
//           ({ id }) => id === currentId
//         );

//         state.collection[selectIndex] = element;

//         return {
//           collection: state.collection,
//         };
//       }),
//     removeElement: (currentId) =>
//       set((state) => {
//         const newCollection = state.collection;
//         const selectIndex = newCollection.findIndex(
//           ({ id }) => id === currentId
//         );

//         newCollection.splice(selectIndex, 1);

//         return {
//           collection: newCollection,
//         };
//       }),
//     reset: () => set(defaultState),
//   })
// );

// export default useCollectionStore;
