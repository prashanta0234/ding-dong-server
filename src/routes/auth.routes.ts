import { Router } from "express";
import { login } from "../controllers/auth/login.controller";

const userRoutes = Router();

userRoutes.get("/login", login);

export { userRoutes };
