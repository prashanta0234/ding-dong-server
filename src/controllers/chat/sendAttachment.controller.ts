import { removeGroupMemberService } from "../../services/chat/removeGroupMember.service";
import { SendAttachmentService } from "../../services/chat/sendAttachment.service";
import { SendSuccessResponse } from "../../utils/responseHelper";
import { TryCatch } from "../../utils/try-catch";

export const SendAttachmentController = TryCatch(async (req, res) => {
	const result = await SendAttachmentService({
		chatId: req.body.chatId,
		files: (req.files as Express.Multer.File[]) || [],
		user: {
			userId: req.user.id,
			name: req.user.name,
		},
		req,
	});

	SendSuccessResponse(res, {
		message: "Member removed!",
		data: result,
		status: 201,
	});
});
