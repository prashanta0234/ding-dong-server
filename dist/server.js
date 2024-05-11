"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("./routes/auth.routes");
const dbConnection_1 = require("./utils/config/dbConnection");
const global_error_validation_1 = require("./middlewares/global-error-validation");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use("/auth", auth_routes_1.userRoutes);
exports.app.use(global_error_validation_1.GlobalErrorHandler);
(0, dbConnection_1.connectDB)().then(() => {
    exports.app.listen("5000", () => {
        console.log("Server is running at 5000");
    });
});
