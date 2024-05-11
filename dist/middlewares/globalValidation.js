"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalValidation = void 0;
const zod_1 = require("zod");
const GlobalValidation = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (e) {
            if (e instanceof zod_1.ZodError) {
                throw e;
            }
        }
    };
};
exports.GlobalValidation = GlobalValidation;
