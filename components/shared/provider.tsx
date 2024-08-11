"use client";

import { SessionProvider } from "next-auth/react";
import { DefaultSession } from "next-auth";

const Provider = ({ children, session }: { children: React.ReactNode; session: DefaultSession }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default Provider;
