"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendErrorResponse = exports.SendSuccessResponse = void 0;
function SendSuccessResponse(res, { status, data, message }) {
    return res
        .status(status)
        .json({ ok: true, message, statusCode: status, data });
}
exports.SendSuccessResponse = SendSuccessResponse;
function SendErrorResponse(res, { status, message, error }) {
    return res.status(status).json({ ok: false, message, errorDetails: error });
}
exports.SendErrorResponse = SendErrorResponse;
