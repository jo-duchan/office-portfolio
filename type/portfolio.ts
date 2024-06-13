import { Image, TagName, ClassName } from "@/type/common";

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

export interface PortfolioElement {
  id: string;
  tagName: TagName;
  className: ClassName;
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
