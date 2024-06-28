import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/shared/nav";
import Footer from "@/components/shared/footer";
import { DefaultSession } from "next-auth";
import Provider from "@/components/util/provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insight AI Journal",
  description: "Smart mental health journal powered by AI",
};

export default function RootLayout({ children, session }: { children: React.ReactNode; session: DefaultSession }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Provider>
          <Nav />
          <main className="flex-grow mx-auto w-7/12">{children}</main>
          <Footer />
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
