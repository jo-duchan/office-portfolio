import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { cookies } from "next/headers";
import Header from "@/components/common/Header";
import { SESSION_COOKIE_NAME } from "@/constants/cookies";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  //   const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return (
    <>
      <Header session={null} />
      {children}
    </>
  );
}

export default Layout;

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const test = context.req.cookies[SESSION_COOKIE_NAME];
//   return { test };
// };
