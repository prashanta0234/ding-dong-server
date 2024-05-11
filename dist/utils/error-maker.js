"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMaker = void 0;
const ErrorMaker = (eName, eMessage, status) => {
    const name = new Error(eName).name;
    const message = new Error(eMessage).message;
    return { name, message, status };
};
exports.ErrorMaker = ErrorMaker;
