import { GetGroupChatsService } from "../../services/chat/getGroupChats.service";
import { SendSuccessResponse } from "../../utils/responseHelper";
import { TryCatch } from "../../utils/try-catch";

export const GetGroupChatController = TryCatch(async (req, res) => {
	const result = await GetGroupChatsService(req.user.id);

	SendSuccessResponse(res, {
		message: "Get group chat Successfully.",
		status: 200,
		data: result,
	});
});
