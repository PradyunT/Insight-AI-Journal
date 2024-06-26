"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

const Nav = () => {
  const { data: session } = useSession();
  const handleSignIn = async () => {
    await signIn("google");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="w-[100%] p-2 px-8 text-left border border-b-2 mb-16 flex flex-row items-center">
      <Link href="/" className="font-bold hover:text-gray-700 transition-colors">
        Insight AI Journal
      </Link>
      <div className="flex-1" />
      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {session ? (
          <>
            <Button onClick={handleSignOut}>Sign Out</Button>
            <Image src={session.user.image} width={37} height={37} className="ml-4 rounded-full" alt="profile" />
          </>
        ) : (
          <Button className="h-9" onClick={handleSignIn}>
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};
export default Nav;
