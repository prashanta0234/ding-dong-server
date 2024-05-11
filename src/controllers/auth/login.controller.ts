import { LoginService } from "../../services/auth/login.service";
import { SendSuccessResponse } from "../../utils/responseHelper";
import { TryCatch } from "../../utils/try-catch";

export const LoginController = TryCatch(async (req, res) => {
	const result = await LoginService(req.body);
	res.cookie("user-token", result, { maxAge: 1000 * 60 * 60 * 24 * 15 });

	SendSuccessResponse(res, {
		status: 200,
		message: "Login successfully",
		data: {
			message: "Login successfully",
		},
	});
});
