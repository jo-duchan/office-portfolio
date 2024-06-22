import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CollectionState, CollectionElement } from "@/type/collection";

export interface CollectionAction {
  addElement: (element: CollectionElement, currentId?: string) => void;
  updateElement: (element: CollectionElement, currentId: string) => void;
  removeElement: (currentId: string) => void;
  reset: () => void;
}

const defaultState: CollectionState = {
  body: [] as CollectionElement[],
};

const useCollectionStore = create<CollectionState & CollectionAction>()(
  immer((set) => ({
    ...defaultState,
    addElement: (element, currentId) =>
      set((state) => {
        let startPoint = state.body.length;

        if (currentId) {
          const selectIndex = state.body.findIndex(
            ({ id }) => id === currentId
          );
          startPoint = selectIndex + 1;
        }

        state.body.splice(startPoint, 0, element);
      }),
    updateElement: (element, currentId) =>
      set((state) => {
        const selectIndex = state.body.findIndex(({ id }) => id === currentId);

        state.body[selectIndex] = element;
      }),
    removeElement: (currentId) =>
      set((state) => {
        const selectIndex = state.body.findIndex(({ id }) => id === currentId);

        state.body.splice(selectIndex, 1);
      }),
    reset: () => set(defaultState),
  }))
);

export default useCollectionStore;
