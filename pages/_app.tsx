import type { AppProps, AppContext } from "next/app";
import Header from "@/components/common/Header";
import { SESSION_COOKIE_NAME } from "@/constants/cookies";
import "@/styles/globals.css";

interface CustomAppProps extends AppProps {
  sessionCookie: string;
}

export default function App({
  Component,
  pageProps,
  sessionCookie,
}: CustomAppProps) {
  return (
    <>
      <Header sessionCookie={sessionCookie || null} />
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const { ctx } = context;
  const cookies = ctx.req?.headers.cookie || "";
  const sessionCookie = cookies
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.includes(SESSION_COOKIE_NAME));

  return {
    sessionCookie,
  };
};
