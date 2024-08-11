import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { Context } from "@/types/customTypes";

export const GET = async (req: Request, { params }: Context) => {
  try {
    await connectToDB();

    const foundUser = await User.findById(params.id);

    if (!foundUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ status: 200, foundUser }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
