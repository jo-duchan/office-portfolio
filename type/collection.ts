import { Image, ClassName } from "@/type/common";

export interface CollectionMetadata {
  title: string;
  description: string;
  keyword: string;
  shareImg: Image;
  publish: boolean;
}

export interface CollectionAssets {
  [key: string]: Image;
}

export interface CoverElement {
  id: string;
  elementName: "cover";
  option: {
    titleColor: string;
    descriptionColor: string;
    keywordColor: string;
  };
  content: {
    title: string;
    description: string;
    keyword: string;
    desktop: Image;
    mobile: Image;
  };
}

export interface HeadingElement {
  id: string;
  elementName: "h3";
  option: {
    className: ClassName;
    color: string;
    fill: string;
  };
  content: {
    text: string;
  };
}

export interface TextElement {
  id: string;
  elementName: "p";
  option: {
    className: ClassName;
    color: string;
    fill: string;
  };
  content: {
    text: string;
  };
}

export interface ImageElement {
  id: string;
  elementName: "img";
  option: {
    className: ClassName;
    fill: string;
  };
  content: {
    image: Image[];
  };
}

export interface GapElement {
  id: string;
  elementName: "gap";
  option: {
    className: ClassName;
    fill: string;
  };
  content: {};
}

export type CollectionElement =
  | CoverElement
  | HeadingElement
  | TextElement
  | ImageElement
  | GapElement;

export interface CollectionState {
  collection: CollectionElement[];
}

export interface CollectionData {
  metadata: CollectionMetadata;
  collection: CollectionElement[];
}
