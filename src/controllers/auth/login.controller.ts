import { Request, Response } from "express";
import { SendSuccessResponse } from "../../utils/responseHelper";

export const login = async (req: Request, res: Response) => {
	SendSuccessResponse(res, {
		status: 200,
		message: "Category Created Successfully",
		data: {
			message: "I am ok bro",
		},
	});
};
