import { Image, TagName, ClassName } from "@/type/common";

export interface PortfolioListItem {
  thumbnail: Image;
  title: string;
  description: string;
  publish: boolean;
  order: number;
  date: string;
}

export interface PortfolioMetadata {
  projectName: string;
  description: string;
  keyword: string[];
  publish: boolean;
}

export interface PortfolioHead {
  mobileImg: Image;
  pcImg: Image;
  title: string;
  description: string;
  parts: string[];
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
