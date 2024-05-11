import { Request, Response } from "express";
import { SendSuccessResponse } from "../../utils/responseHelper";

export const LogoutController = (req: Request, res: Response) => {
	res.clearCookie("user-token");
	SendSuccessResponse(res, {
		message: "Logedout successfully",
		status: 200,
		data: {
			message: "Successfully logged out user.",
		},
	});
};
