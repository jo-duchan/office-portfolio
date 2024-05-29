import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const jwt = req.body.jwt;
    // const session = cookies().get(SESSION_COOKIE_NAME)?.value || ""
    // if(session)
    // cookies().set(SESSION_COOKIE_NAME, jwt, {
    //   httpOnly: true,
    //   // secure: process.env.NODE_ENV === 'production',
    //   maxAge: 60 * 60 * 24, // One day
    //   path: "/",
    // });
    // res.setHeader("Set-Cookie", jwt);
    res;
    let response = NextResponse.next();
    response.cookies.set({
      name: "dd",
      value: "??",
      httpOnly: true,
      sameSite: "none",
      path: "/",
    });
    console.log("api", jwt);
    // r.cookies.set({
    //   name: SESSION_COOKIE_NAME,
    //   value: jwt,
    //   maxAge: 60 * 60 * 24,
    //   httpOnly: true,
    //   sameSite: "strict",
    // });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ success: true });
}
