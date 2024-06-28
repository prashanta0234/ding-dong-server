import { CreateGroupService } from "../../services/chat/createGroup.service";
import { SendSuccessResponse } from "../../utils/responseHelper";
import { TryCatch } from "../../utils/try-catch";

export const CreateGroupChatController = TryCatch(async (req, res) => {
	console.log(req.user);
	const result = await CreateGroupService(req.body, req.user.id, req);
	SendSuccessResponse(res, {
		message: "Group Chat Created.",
		status: 201,
		data: "Group chat created",
	});
});
