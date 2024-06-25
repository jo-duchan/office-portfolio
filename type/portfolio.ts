import { Image } from "@/type/common";

export interface CollectionSimple {
  thumbnail: Image;
  title: string;
  order: number | null;
  publish: boolean;
  date: number; //Timestamp
}

export interface Portfolio {
  list: CollectionSimple[];
}
