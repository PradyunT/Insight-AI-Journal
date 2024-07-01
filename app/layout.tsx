import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/shared/nav";
import Footer from "@/components/shared/footer";
import Provider from "@/components/util/provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insight AI Journal",
  description: "AI chatbot and smart mental health journal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Provider>
          <Nav />
          <main className="flex-grow mx-auto w-10/12 sm:w-3/4 my-6 sm:my-16">{children}</main>
          <Footer />
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
