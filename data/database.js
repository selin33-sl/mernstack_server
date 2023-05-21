import mongoose from "mongoose";
console.log(process.env.MONGO_URI);
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "UdemyCourse",
    });
    console.log(`Server connection to database: ${connection.host}`);
  } catch (error) {
    console.log("Some Error Occured", error);
    process.exit(1);
  }
};
