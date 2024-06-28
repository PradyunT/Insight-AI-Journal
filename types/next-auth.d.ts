import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      id: string;
    };
  }
  interface Profile {
    name: string;
    email: string;
    picture: string;
  }
}
