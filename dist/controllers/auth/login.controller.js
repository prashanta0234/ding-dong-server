"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const login_service_1 = require("../../services/auth/login.service");
const responseHelper_1 = require("../../utils/responseHelper");
const try_catch_1 = require("../../utils/try-catch");
exports.LoginController = (0, try_catch_1.TryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, login_service_1.LoginService)(req.body);
    res.cookie("user-token", result, { maxAge: 1000 * 60 * 60 * 24 * 15 });
    (0, responseHelper_1.SendSuccessResponse)(res, {
        status: 200,
        message: "Login successfully",
        data: {
            message: "Login successfully",
        },
    });
}));
