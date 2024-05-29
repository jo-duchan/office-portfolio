import { NextApiRequest, NextApiResponse } from "next";
import { SESSION_COOKIE_NAME } from "@/constants/cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const option = `${SESSION_COOKIE_NAME}=; max-age=-1; path=/; HttpOnly`;

    res.setHeader("Set-Cookie", option);

    return res.status(200).json({ message: "Remove Cookie" });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error." });
  }
}
