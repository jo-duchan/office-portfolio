import { convertImageUrl, getId } from "@/utils/utils";

export async function getPresignedUrl(key: string = getId()) {
  try {
    const response = await fetch("/api/create-presigned-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key }),
    });
    const data = await response.json();

    return { url: data.url, key };
  } catch (e) {
    console.error(e);
  }
}

interface UploadImageParams {
  url: string;
  img: File;
}

export async function uploadImage({ url, img }: UploadImageParams) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: img,
      headers: {
        "Content-Type": img.type,
      },
    });

    return response;
  } catch (e) {
    console.error(e);
  }
}

interface HandleUploadImageParams {
  file: File | null;
  key?: string;
  preview?: string;
}

export async function handleUploadImage({
  file,
  key,
  preview,
}: HandleUploadImageParams) {
  if (!file) return;
  let url: string = "";
  const response = await getPresignedUrl(key);

  if (response) {
    const uploadRes = await uploadImage({
      url: response.url,
      img: file,
    });

    url = convertImageUrl(uploadRes?.url);
    preview && URL.revokeObjectURL(preview);
  }

  return { key: response?.key, url };
}
