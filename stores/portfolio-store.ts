import { create } from "zustand";

export type Image = {
  file: string;
  type: string;
};

export interface PortfolioMetadata {
  thumbnail: Image;
  name: string;
  description: string;
  keyword: string[];
}

export interface PortfolioHead {
  mobileImg: Image;
  pcImg: Image;
  title: string;
  description: string;
  keyword: string[];
}

export type TagName = "h3" | "p" | "img" | "div";

export type ClassNameKey =
  | "font-size"
  | "margin"
  | "aline"
  | "gap"
  | "color"
  | "fill"
  | "column";

export interface PortfolioElement {
  id: string;
  tagName: TagName;
  className: Map<ClassNameKey, string>;
  content?: {
    text?: string;
    image?: Image[];
  };
}

export interface PortfolioItem {
  id: string;
  metadata: PortfolioMetadata;
  head: PortfolioHead;
  body: PortfolioElement[];
}

interface PortfolioState {
  item: PortfolioItem;
}

export interface PortfolioAction {
  init: (id: string) => void;
  updateMetadate: () => void;
  updateHead: () => void;
  addElement: (element: PortfolioElement) => void;
  removeElement: () => void;
  updateElement: () => void;
}

const defaultState = {} as PortfolioItem;

const usePortfolioStore = create<PortfolioState & PortfolioAction>()((set) => ({
  item: defaultState,
  init: (id: string) =>
    set((state) => ({
      item: { ...state.item, id },
    })),
  updateMetadate: () => set({}),
  updateHead: () => set({}),
  addElement: (element: PortfolioElement) =>
    set((state) => ({
      item: {
        ...state.item,
        body: [...state.item.body, element],
      },
    })),
  removeElement: () => set({}),
  updateElement: () => set({}),
}));

export default usePortfolioStore;
