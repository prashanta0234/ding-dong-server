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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const user_model_1 = require("../../models/user.model");
const envs_1 = require("../../utils/envs");
const error_maker_1 = require("../../utils/error-maker");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const LoginService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ email: data.email });
    if (!user) {
        throw (0, error_maker_1.ErrorMaker)("Not found", "User doesn`t exists", 404);
    }
    const pass = yield bcrypt_1.default.compare(data.password, user === null || user === void 0 ? void 0 : user.password);
    if (!pass) {
        throw (0, error_maker_1.ErrorMaker)("Wrong password", "Password not matched!", 403);
    }
    const name = user.firstName + " " + user.lastName;
    const payload = {
        name,
        userName: user.userName,
    };
    const token = jsonwebtoken_1.default.sign(payload, envs_1.JWT_SECRET);
    return token;
});
exports.LoginService = LoginService;
