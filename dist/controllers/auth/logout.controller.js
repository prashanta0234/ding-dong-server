"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutController = void 0;
const responseHelper_1 = require("../../utils/responseHelper");
const LogoutController = (req, res) => {
    res.clearCookie("user-token");
    (0, responseHelper_1.SendSuccessResponse)(res, {
        message: "Logedout successfully",
        status: 200,
        data: {
            message: "Successfully logged out user.",
        },
    });
};
exports.LogoutController = LogoutController;
