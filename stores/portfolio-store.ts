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
  publish: boolean;
}

export interface PortfolioHead {
  mobileImg: Image;
  pcImg: Image;
  title: string;
  description: string;
  keyword: string[];
}

export type TagName = "h3" | "p" | "img" | "div";

// export type ClassNameKey =
//   | "font-size"
//   | "margin"
//   | "aline"
//   | "gap"
//   | "color"
//   | "fill"
//   | "column";

export interface PortfolioElement {
  id: string;
  tagName: TagName;
  // className: Map<ClassNameKey, string>;
  className: {
    [key: string]: string;
  };
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
  init: ({
    id,
    metadata,
    head,
    body,
  }: {
    id: string;
    metadata?: PortfolioMetadata;
    head?: PortfolioHead;
    body?: PortfolioElement[];
  }) => void;
  updateMetadate: () => void;
  updateHead: () => void;
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
  init: ({ id, metadata, head, body }) =>
    set((state) => {
      const newMetadata = metadata ?? state.item.metadata;
      const newHead = head ?? state.item.head;
      const newBody = body ?? state.item.body;

      return {
        item: { id, metadata: newMetadata, head: newHead, body: newBody },
      };
    }),
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
  reset: () => set({ item: defaultState }),
}));

export default usePortfolioStore;
