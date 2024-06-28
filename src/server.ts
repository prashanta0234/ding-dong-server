import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRoutes } from "./routes/auth.routes";
import { connectDB } from "./utils/config/dbConnection";
import { ChatModel } from "./models/chat.model";
import { MessageModel } from "./models/message.model";
import { UserModel } from "./models/user.model";
import { GlobalErrorHandler } from "./middlewares/global-error-validation";
import { ChatRoute } from "./routes/chat.routes";
import { IsAuthenticated } from "./middlewares/isAuthenticated";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.use("/auth", userRoutes);
app.use(IsAuthenticated);
app.use("/chat", ChatRoute);

app.use(GlobalErrorHandler);

connectDB().then(() => {
	app.listen("5000", () => {
		console.log("Server is running at 5000");
	});
});
