import type { NextApiRequest } from "next";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req: NextApiRequest) => {
  const { userId } = req.query;

  if (!userId) {
    return new Response(JSON.stringify({ message: "User ID is required" }), {
      status: 400,
    });
  }

  try {
    await connectToDB();

    const user = await User.findById(userId).populate("notes");

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ status: 200, notes: user.notes }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
