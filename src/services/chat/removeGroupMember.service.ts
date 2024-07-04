import { ChatModel } from "../../models/chat.model";
import { ErrorMaker } from "../../utils/error-maker";

interface removeChatProps {
	user: string;
	chatId: string;
	memberId: string;
}

export const removeGroupMemberService = async (data: removeChatProps) => {
	const chats = await ChatModel.findOne({
		_id: data.chatId,
	});

	if (!chats?.members.includes(data.memberId)) {
		throw ErrorMaker(
			"Member not found",
			"Given user is not member of this group",
			404
		);
	}

	if (data.user != chats.creator) {
		throw ErrorMaker(
			"Not allowed",
			"You`r not admin. Only admin can remove members.",
			405
		);
	}
	await ChatModel.updateOne(
		{
			_id: data.chatId,
		},
		{ $pull: { members: data.memberId } }
	);
	const successData = await ChatModel.findOne({
		_id: data.chatId,
	}).select({
		_id: 0,
		createdAt: 0,
		__v: 0,
	});
	return successData;
};
