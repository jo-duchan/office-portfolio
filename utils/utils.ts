import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export function mapToArray<K, V>(map: Map<K, V>) {
  const convertedArray = Array.from(map.values());
  return convertedArray;
}

export function convertImageUrl(url: string = "") {
  return url.split("?")[0];
}

export function checkImageFileSize(size: number = 0) {
  let maxSize = 5 * 1024 * 1024;

  if (size > maxSize) {
    window.alert("이미지 사이즈는 5MB 이내로 가능합니다.");
    return false;
  }

  return true;
}

export function getId() {
  return uuidv4();
}

export function convertTextToSlug(text: string) {
  return text.toLowerCase().replaceAll(" ", "-");
}

export function objectToString(obj: Object) {
  return Object.values(obj).join(" ");
}

export function convertColorValue(value: string) {
  return value.replaceAll("#", "").toUpperCase();
}

export function withAlpha(hex: string, alpha: number): string {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function timeStampToYYYYMMDD(date: number) {
  return format(date, "yyyy . MM . dd");
}
