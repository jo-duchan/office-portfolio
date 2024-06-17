import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  PortfolioState,
  PortfolioMetadata,
  PortfolioHead,
  PortfolioElement,
} from "@/type/portfolio";

export interface PortfolioAction {
  setMetadate: (metadata: PortfolioMetadata) => void;
  setHead: (head: PortfolioHead) => void;
  addElement: (element: PortfolioElement, currentId?: string) => void;
  updateElement: (element: PortfolioElement, currentId: string) => void;
  removeElement: (currentId: string) => void;
  reset: () => void;
}

const defaultState: PortfolioState = {
  metadata: {} as PortfolioMetadata,
  head: {} as PortfolioHead,
  body: [] as PortfolioElement[],
};

const usePortfolioStore = create<PortfolioState & PortfolioAction>()(
  immer((set) => ({
    ...defaultState,
    setMetadate: (metadata) =>
      set((state) => {
        state.metadata = metadata;
      }),
    setHead: (head) =>
      set((state) => {
        state.head = head;
      }),
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

export default usePortfolioStore;
