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

export interface PortfolioAtom {
  id: string;
  tagName: TagName;
  className: Map<ClassNameKey, string>;
}

interface PortfolioState {
  item: {
    metadata: PortfolioMetadata;
    head: PortfolioHead;
    body: PortfolioAtom[];
  };
}

export interface PortfolioAction {
  reset: () => void;
  updateMetadate: () => void;
  updateHead: () => void;
  addAtom: () => void;
  removeAtom: () => void;
  updateAtom: () => void;
}

const defaultState = {
  metadata: {} as PortfolioMetadata,
  head: {} as PortfolioHead,
  body: [] as PortfolioAtom[],
};

const usePortfolioStore = create<PortfolioState & PortfolioAction>()((set) => ({
  item: defaultState,
  reset: () => set({}),
  updateMetadate: () => set({}),
  updateHead: () => set({}),
  addAtom: () => set({}),
  removeAtom: () => set({}),
  updateAtom: () => set({}),
}));

export default usePortfolioStore;
