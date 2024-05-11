import { Request, Response } from "express";
import { SendSuccessResponse } from "../../utils/responseHelper";
import RegisterService from "../../services/auth/register.service";
import { TryCatch } from "../../utils/try-catch";

export const register = TryCatch(async (req: Request, res: Response) => {
	const result = await RegisterService(req.body);
	res.cookie("user-token", result, { maxAge: 1000 * 60 * 60 * 24 * 15 });

	SendSuccessResponse(res, {
		status: 200,
		message: "User Created successfully",
		data: {
			message: "User Created successfully",
		},
	});
});
