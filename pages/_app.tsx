import { useState } from "react";
import type { AppProps, AppContext } from "next/app";
import Header from "@/components/common/Header";
import { SESSION_COOKIE_NAME } from "@/constants/cookies";
import { ThemeProvider } from "styled-components";
import useThemeStore from "@/stores/theme-store";
import GlobalStyle from "@/styles/globals";

interface MyAppProps extends AppProps {
  sessionCookie: string;
}

export default function App({
  Component,
  pageProps,
  sessionCookie,
}: MyAppProps) {
  const theme = useThemeStore((state) => state.theme);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header sessionCookie={sessionCookie || null} />
      <Component {...pageProps} />
    </ThemeProvider>
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
