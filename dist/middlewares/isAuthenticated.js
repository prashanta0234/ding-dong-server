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
exports.IsAuthenticated = void 0;
const try_catch_1 = require("../utils/try-catch");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("../utils/envs");
exports.IsAuthenticated = (0, try_catch_1.TryCatch)((req, __, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies["user-token"];
    // console.log(cookie);
    const user = jsonwebtoken_1.default.verify(token, envs_1.JWT_SECRET);
    console.log(req);
    req.user = user.userName;
    next();
}));
