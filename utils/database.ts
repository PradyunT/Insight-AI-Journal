import mongoose from "mongoose";

let isConnected = false; // represents if the user is connected

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MongoDB URI is not defined in the environment variables");
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: "insight_ai",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};
