import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";
import { SESSION_COOKIE_NAME } from "@/constants/cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    deleteCookie(SESSION_COOKIE_NAME, { req, res });

    return res.status(200).json({ message: "Remove Cookie" });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error." });
  }
}
