import { NextApiRequest, NextApiResponse } from "next";
import { SESSION_COOKIE_NAME } from "@/constants/cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.body.token as string;
    const maxAge = 60 * 60 * 24;
    const option = `${SESSION_COOKIE_NAME}=${token}; max-age=${maxAge}; path=/; HttpOnly`;
    res.setHeader("Set-Cookie", option);

    return res.status(200).json({ message: "Set Cookie" });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error." });
  }
}
