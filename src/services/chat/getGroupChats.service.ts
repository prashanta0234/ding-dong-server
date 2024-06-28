import { ChatModel } from "../../models/chat.model";

export const GetGroupChatsService = async (user: string) => {
	const chats = await ChatModel.find({ members: user, isGroup: true }).select({
		_id: 0,
		createdAt: 0,
		__v: 0,
	});
	return chats;
};
