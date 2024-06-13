import { v4 as uuidv4 } from "uuid";

export async function getPresignedUrl(key: string = uuidv4()) {
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
