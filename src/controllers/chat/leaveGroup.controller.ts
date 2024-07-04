import { LeaveGroupService } from "../../services/chat/leaveGroup.service";
import { SendSuccessResponse } from "../../utils/responseHelper";
import { TryCatch } from "../../utils/try-catch";

export const LeaveGroupController = TryCatch(async (req, res) => {
	const result = await LeaveGroupService(
		{
			chatId: req.body,
			userId: req.user.id,
		},
		req
	);

	SendSuccessResponse(res, {
		message: "Leave group Successfully.",
		status: 200,
		data: result,
	});
});
