import { v4 as uuidv4 } from "uuid";

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
