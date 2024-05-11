// import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorMaker } from "../utils/error-maker";

export const GlobalValidation = (schema: Zod.AnyZodObject) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				throw e;
			}
		}
	};
};
