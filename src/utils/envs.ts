import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
export const DB_USER_NAME = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const JWT_SECRET = process.env.JWT_SECRET;
