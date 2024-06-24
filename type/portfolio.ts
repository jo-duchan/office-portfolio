export interface CollectionSimple {
  title: string;
  order: number | null;
  publish: boolean;
  date: number; //Timestamp
}

export interface Portfolio {
  list: CollectionSimple[];
}
