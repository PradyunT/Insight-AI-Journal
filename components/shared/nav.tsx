"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Menu } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Nav = () => {
  const { toast } = useToast();
  const [signingIn, setSigningIn] = useState(false);

  const { data: session } = useSession();

  const handleSignIn = async () => {
    setSigningIn(true);
    await signIn("google");
    setSigningIn(false);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.assign("/");
  };

  const handleAccessDenied = (page: string) => {
    toast({ title: `Sign in to access ${page}` });
  };

  return (
    <nav className="w-[100%] py-2 px-8 text-left border border-b-2 flex flex-row items-center">
      <Link href="/" className="font-bold hover:text-gray-700 transition-colors">
        Insight AI Journal
      </Link>
      <div className="flex-1" />
      {/* Mobile Nav */}
      <div className="sm:hidden flex items-center">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost">
              <Menu size={24} />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription>
              <div className="flex flex-col gap-4 w-1/3 mx-auto items-center">
                <Link href="/" passHref>
                  <Button variant="outline" className="border-none w-full">
                    Chat
                  </Button>
                </Link>
                {session ? (
                  <Link href="/journals" passHref>
                    <Button variant="outline" className="border-none w-full">
                      Journals
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" className="border-none w-full" onClick={() => handleAccessDenied("Journals")}>
                    Journals
                  </Button>
                )}
                {/* {session ? (
                  <Link href="/logs" passHref>
                    <Button variant="outline" className="border-none w-full">
                      Logs
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" className="border-none w-full" onClick={() => handleAccessDenied("Logs")}>
                    Logs
                  </Button>
                )} */}
                {session ? (
                  <Button className="w-full" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handleSignIn} disabled={signingIn}>
                    {!signingIn ? "Sign In" : "Signing In"}
                  </Button>
                )}
              </div>
            </DrawerDescription>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      {/* Desktop Nav */}
      <div className="sm:flex hidden gap-4">
        <Link href="/">
          <Button variant="outline" className="border-none">
            Chat
          </Button>
        </Link>
        {session ? (
          <Link href="/journals">
            <Button variant="outline" className="border-none">
              Journals
            </Button>
          </Link>
        ) : (
          <Button variant="outline" className="border-none" onClick={() => handleAccessDenied("Journals")}>
            Journals
          </Button>
        )}
        {/* {session ? (
          <Link href="/logs">
            <Button variant="outline" className="border-none">
              Logs
            </Button>
          </Link>
        ) : (
          <Button variant="outline" className="border-none" onClick={() => handleAccessDenied("Logs")}>
            Logs
          </Button>
        )} */}
        {session ? (
          <Button onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <Button className="h-9" onClick={handleSignIn} disabled={signingIn}>
            {!signingIn ? "Sign In" : "Signing In"}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
