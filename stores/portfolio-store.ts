import { create } from "zustand";
import {
  PortfolioItem,
  PortfolioMetadata,
  PortfolioHead,
  PortfolioElement,
} from "@/type/portfolio";

interface PortfolioState {
  item: PortfolioItem;
}

export interface PortfolioAction {
  init: (item: PortfolioItem) => void;
  create: (id: string) => void;
  updateMetadate: () => void;
  updateHead: (head: PortfolioHead) => void;
  addElement: (element: PortfolioElement) => void;
  removeElement: () => void;
  updateElement: () => void;
  reset: () => void;
}

const defaultState: PortfolioItem = {
  id: "",
  metadata: {} as PortfolioMetadata,
  head: {} as PortfolioHead,
  body: [] as PortfolioElement[],
};

const usePortfolioStore = create<PortfolioState & PortfolioAction>()((set) => ({
  item: defaultState,
  init: (item) => set({ item }),
  create: (id) =>
    set((state) => ({
      item: {
        ...state.item,
        id,
      },
    })),
  updateMetadate: () => set({}),
  updateHead: (head) =>
    set((state) => ({
      item: {
        ...state.item,
        head,
      },
    })),
  addElement: (element: PortfolioElement) =>
    set((state) => ({
      item: {
        ...state.item,
        body: [...state.item.body, element],
      },
    })),
  removeElement: () => set({}),
  updateElement: () => set({}),
  reset: () => set({ item: defaultState }),
}));

export default usePortfolioStore;
