import { Image, TagName, ClassName } from "@/type/common";

export interface CollectionSimple {
  projectName: string;
  order: string;
  publish: boolean;
  date: number; //Timestamp
}

export interface Portfolio {
  list: CollectionSimple[];
}

export interface CollectionMetadata {
  projectName: string;
  description: string;
  keyword: string;
  publish: boolean;
}

export interface CollectionHeadAssets {
  [key: string]: Image;
  desktop: Image;
  mobile: Image;
}

export interface CollectionHead {
  title: string;
  description: string;
  keyword: string;
  assets: CollectionHeadAssets;
}

export interface CollectionElement {
  id: string;
  tagName: TagName;
  className: ClassName;
  color: string;
  fill: string;
  content?: {
    text?: string;
    image?: Image[];
  };
}

export interface CollectionState {
  body: CollectionElement[];
}
