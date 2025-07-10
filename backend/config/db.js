import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("\nMONGODB successfully connected!");
  } catch (error) {
    console.log("Error connecting to the database: ", error.message);
    throw error;
  }
};
