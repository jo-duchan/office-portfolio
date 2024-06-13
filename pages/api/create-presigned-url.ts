import { NextApiRequest, NextApiResponse } from "next";
import { createPresignedUrl } from "@/libs/aws/aws-s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const key = req.body.key;
  try {
    const presignedUrl = await createPresignedUrl(key);

    return res.status(201).json({
      message: "succeeded in creating url",
      url: presignedUrl,
    });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error." });
  }
}
