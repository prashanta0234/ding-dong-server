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
exports.register = void 0;
const responseHelper_1 = require("../../utils/responseHelper");
const register_service_1 = __importDefault(require("../../services/auth/register.service"));
const try_catch_1 = require("../../utils/try-catch");
exports.register = (0, try_catch_1.TryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, register_service_1.default)(req.body);
    res.cookie("user-token", result, { maxAge: 1000 * 60 * 60 * 24 * 15 });
    (0, responseHelper_1.SendSuccessResponse)(res, {
        status: 201,
        message: "User Created successfully",
        data: {
            message: "User Created successfully",
        },
    });
}));
