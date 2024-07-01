type ImageKeys = string[];

export async function deleteImagesFromS3(imageKeys: ImageKeys) {
  const objects = imageKeys.map((key) => {
    return { Key: key };
  });

  try {
    const response = await fetch("/api/delete-s3-images", {
      method: "PUT",
      body: JSON.stringify({ objects }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (e) {
    console.error(e);
  }
}
