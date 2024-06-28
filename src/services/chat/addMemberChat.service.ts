import { ChatModel } from "../../models/chat.model";
import { ErrorMaker } from "../../utils/error-maker";

interface AddMemberProps {
	chatId: string;
	memberId: string;
}

export const AddMemberChatService = async (data: AddMemberProps) => {
	const getChat = await ChatModel.findOne({
		_id: data.chatId,
	});

	if (!getChat) {
		throw ErrorMaker("Not found!", "Chat not found", 404);
	}

	if (data.memberId === getChat?.creator) {
		throw ErrorMaker(
			"Can`t add",
			"You can`t add Because you already in the chat.",
			400
		);
	}

	if (getChat?.members.includes(data.memberId)) {
		throw ErrorMaker(
			"Can`t add",
			"You can`t add Because user already in the chat.",
			400
		);
	}

	getChat.members.push(data.memberId);
	getChat.save();
};
