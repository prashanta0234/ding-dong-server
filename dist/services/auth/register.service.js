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
const user_model_1 = require("../../models/user.model");
const envs_1 = require("../../utils/envs");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_maker_1 = require("../../utils/error-maker");
const RegisterService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.password !== data.confirmPassword) {
        throw (0, error_maker_1.ErrorMaker)("Bad request", "Password not matched", 400);
    }
    const isExists = yield user_model_1.UserModel.findOne({ email: data.email });
    if (isExists) {
        throw (0, error_maker_1.ErrorMaker)("Bad request", "User already Exists", 400);
    }
    const avatar = {
        publicId: "public Id",
        url: "public",
    };
    const username = data.email.split("@")[0];
    let uniqueUsername = username;
    let counter = 1;
    while (true) {
        const candidateUsername = `${username}${counter}`;
        const existingCandidate = yield user_model_1.UserModel.findOne({
            username: candidateUsername,
        });
        if (!existingCandidate) {
            uniqueUsername = candidateUsername;
            break;
        }
        counter++;
    }
    const hashedPass = yield bcrypt_1.default.hash(data.password, 10);
    // data.password = hashedPass;
    const result = yield user_model_1.UserModel.create(Object.assign(Object.assign({}, data), { avatar, userName: uniqueUsername, password: hashedPass }));
    console.log(result);
    const name = data.firstName + " " + data.lastName;
    const payload = {
        name,
        userName: uniqueUsername,
    };
    const token = jsonwebtoken_1.default.sign(payload, envs_1.JWT_SECRET);
    return token;
});
exports.default = RegisterService;
