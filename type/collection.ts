import { Image, TagName, ClassName } from "@/type/common";

export interface CollectionMetadata {
  projectName: string;
  description: string;
  keyword: string;
  publish: boolean;
}

export interface CollectionAssets {
  [key: string]: Image;
}

export interface CollectionHead {
  title: string;
  description: string;
  keyword: string;
  assets: CollectionAssets;
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
  head: CollectionHead;
  body: CollectionElement[];
}
