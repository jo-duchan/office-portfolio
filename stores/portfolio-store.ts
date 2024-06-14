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
  addElement: (element: PortfolioElement) => void;
  removeElement: () => void;
  updateElement: () => void;
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
    addElement: () => set({}),
    removeElement: () => set({}),
    updateElement: () => set({}),
    reset: () => set(defaultState),
  }))
);

export default usePortfolioStore;
