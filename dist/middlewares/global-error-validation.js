"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
const responseHelper_1 = require("../utils/responseHelper");
const GlobalErrorHandler = (err, _, res, __) => {
    let status = err.status || 500;
    let message = err.message || "something went wrong";
    if (err.name === "ZodError") {
        status = 400;
        message = err.issues.reduce((msg, issue, index) => {
            msg +=
                issue.received === "undefined"
                    ? issue.message
                    : `In ${issue.path[0]} ${issue.message}`;
            msg += index !== err.issues.length - 1 ? " || " : "";
            return msg;
        }, "");
    }
    return (0, responseHelper_1.SendErrorResponse)(res, { message, status, error: err });
};
exports.GlobalErrorHandler = GlobalErrorHandler;
