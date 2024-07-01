import { NextApiRequest, NextApiResponse } from "next";
import { deleteObjectsFromS3 } from "@/libs/aws/aws-s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const images = req.body.objects;

  try {
    const response = await deleteObjectsFromS3(images);

    if (!response) {
      return res.status(500).json({
        message: "deleted the image from s3",
      });
    }

    return res.status(201).json({
      message: "deleted the image from s3",
    });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error." });
  }
}
