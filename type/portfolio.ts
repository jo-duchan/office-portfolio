import { Image, TagName, ClassName } from "@/type/common";

export interface PortfolioMetadata {
  thumbnail: Image;
  title: string;
  description: string;
  keyword: string[];
  publish: boolean;
  order: number;
}

export interface PortfolioHead {
  mobileImg: Image;
  pcImg: Image;
  title: string;
  description: string;
  keyword: string[];
}

export interface PortfolioElement {
  id: string;
  tagName: TagName;
  className: ClassName;
  content?: {
    text?: string;
    image?: Image[];
  };
}

export interface PortfolioState {
  metadata: PortfolioMetadata;
  head: PortfolioHead;
  body: PortfolioElement[];
}
