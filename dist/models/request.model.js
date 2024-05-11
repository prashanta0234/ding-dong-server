"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
var statusEnum;
(function (statusEnum) {
    statusEnum[statusEnum["pending"] = 0] = "pending";
    statusEnum[statusEnum["accepted"] = 1] = "accepted";
    statusEnum[statusEnum["rejected"] = 2] = "rejected";
})(statusEnum || (statusEnum = {}));
const requestSchema = new mongoose_2.Schema({
    status: { type: String, enum: statusEnum, default: statusEnum.pending },
    sender: { type: mongoose_2.Types.ObjectId, ref: "User", require: true },
    receiver: { type: mongoose_2.Types.ObjectId, ref: "User", require: true },
}, {
    timestamps: true,
});
exports.MessageModel = mongoose_1.default.models.Request || mongoose_1.default.model("Request", requestSchema);
