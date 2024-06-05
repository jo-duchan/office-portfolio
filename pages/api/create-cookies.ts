import { NextApiRequest, NextApiResponse } from "next";
import { SESSION_COOKIE_NAME } from "@/constants/cookies";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.body.token as string;

    setCookie(SESSION_COOKIE_NAME, token, {
      req,
      res,
      httpOnly: true,
      path: "/",
    });

    return res.status(200).json({ message: "Set Cookie" });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error." });
  }
}
