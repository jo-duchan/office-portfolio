export interface Image {
  url?: string;
  file?: File;
  key?: string;
}

export type TagName = "h3" | "p" | "img" | "div";

export interface ClassName {
  fontSize?: string;
  margin?: string;
  aline?: string;
  gap?: string;
  color?: string;
  fill?: string;
  column?: string;
}
