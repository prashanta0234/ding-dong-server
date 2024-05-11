import { Router } from "express";
import { register } from "../controllers/auth/register.controller";
import { registerSchema } from "../utils/schemas/auth/register.schema";
import { GlobalValidation } from "../middlewares/globalValidation";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const userRoutes = Router();

userRoutes.post(
	"/register",
	upload.single("avatar"),
	GlobalValidation(registerSchema),
	register
);

export { userRoutes };
