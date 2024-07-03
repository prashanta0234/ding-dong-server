import { removeGroupMemberService } from "../../services/chat/removeGroupMember.service";
import { SendSuccessResponse } from "../../utils/responseHelper";
import { TryCatch } from "../../utils/try-catch";

export const RemoveMemberInChatController = TryCatch(async (req, res) => {
	const result = await removeGroupMemberService({
		chatId: req.body.chatId,
		memberId: req.body.memberId,
		user: req.user.id,
	});

	SendSuccessResponse(res, {
		message: "Member removed!",
		data: result,
		status: 201,
	});
});
