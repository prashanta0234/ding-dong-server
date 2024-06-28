import { ChatModel } from "../../models/chat.model";

export const GetChatsService = async (user: string) => {
	const chats = await ChatModel.find({ members: user })
		.select({
			_id: 0,
			createdAt: 0,
			__v: 0,
		})
		.populate("members", "firstName lastName avatar");

	return chats;
};
