import { Image } from "@/type/common";

export interface CollectionSimple {
  thumbnail: Image;
  title: string;
  order: number;
  publish: boolean;
  date: number; //Timestamp
}

export interface CollectionList {
  list: CollectionSimple[];
}
