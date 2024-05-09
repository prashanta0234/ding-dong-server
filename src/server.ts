import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/auth.routes";
export const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRoutes);

app.get("/", (req, res) => {
	res.send({
		message: "Server is OK!",
	});
});

app.listen("5000", () => {
	console.log("server is running at 5000");
});
