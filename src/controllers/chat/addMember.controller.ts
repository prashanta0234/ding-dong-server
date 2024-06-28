import { AddMemberChatService } from "../../services/chat/addMemberChat.service";
import { SendSuccessResponse } from "../../utils/responseHelper";
import { TryCatch } from "../../utils/try-catch";

export const AddMemberInChatController = TryCatch(async (req, res) => {
	const result = await AddMemberChatService(req.body);

	SendSuccessResponse(res, {
		message: "Added",
		data: "Added member in chat",
		status: 201,
	});
});
