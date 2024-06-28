import { GetChatsService } from "../../services/chat/getChats..service";
import { SendSuccessResponse } from "../../utils/responseHelper";
import { TryCatch } from "../../utils/try-catch";

export const GetChatController = TryCatch(async (req, res) => {
	const result = await GetChatsService(req.user.id);

	SendSuccessResponse(res, {
		message: "Get chat Successfully.",
		status: 200,
		data: result,
	});
});
