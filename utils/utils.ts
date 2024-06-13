export function mapToArray<K, V>(map: Map<K, V>) {
  const convertedArray = Array.from(map.values());
  return convertedArray;
}

export function convertImageUrl(url: string = "") {
  return url.split("?")[0];
}
