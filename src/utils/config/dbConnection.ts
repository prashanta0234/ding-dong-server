import mongoose from "mongoose";
import { DB_PASS, DB_USER_NAME } from "../envs";

// MongoDB connection URI
const uri = `mongodb+srv://${DB_USER_NAME}:${DB_PASS}@cluster0.wiwaonc.mongodb.net`;

// Connect to MongoDB
export const connectDB = async () => {
	try {
		await mongoose.connect(uri, {
			dbName: "ding-dong",
		});
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}
};
