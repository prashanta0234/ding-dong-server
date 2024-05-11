"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const register_controller_1 = require("../controllers/auth/register.controller");
const register_schema_1 = require("../utils/schemas/auth/register.schema");
const globalValidation_1 = require("../middlewares/globalValidation");
const multer_1 = __importDefault(require("multer"));
const login_schema_1 = require("../utils/schemas/auth/login.schema");
const login_controller_1 = require("../controllers/auth/login.controller");
const logout_controller_1 = require("../controllers/auth/logout.controller");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const upload = (0, multer_1.default)({ dest: "uploads/" });
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.post("/register", upload.single("avatar"), (0, globalValidation_1.GlobalValidation)(register_schema_1.registerSchema), register_controller_1.register);
userRoutes.post("/login", (0, globalValidation_1.GlobalValidation)(login_schema_1.LoginSchema), login_controller_1.LoginController);
userRoutes.get("/logout", isAuthenticated_1.IsAuthenticated, logout_controller_1.LogoutController);
userRoutes.get("/tt", isAuthenticated_1.IsAuthenticated, (req, res) => {
    // const userId=req.user
    console.log(req);
    res.send("hi");
});
