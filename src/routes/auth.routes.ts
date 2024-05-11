import { Router } from "express";
import { register } from "../controllers/auth/register.controller";
import { registerSchema } from "../utils/schemas/auth/register.schema";
import { GlobalValidation } from "../middlewares/globalValidation";
import multer from "multer";
import { LoginSchema } from "../utils/schemas/auth/login.schema";
import { LoginController } from "../controllers/auth/login.controller";
import { LogoutController } from "../controllers/auth/logout.controller";
import { IsAuthenticated } from "../middlewares/isAuthenticated";

const upload = multer({ dest: "uploads/" });

const userRoutes = Router();

userRoutes.post(
	"/register",
	upload.single("avatar"),
	GlobalValidation(registerSchema),
	register
);

userRoutes.post("/login", GlobalValidation(LoginSchema), LoginController);

userRoutes.get("/logout", IsAuthenticated, LogoutController);

export { userRoutes };
