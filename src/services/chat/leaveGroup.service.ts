import { ChatModel } from "../../models/chat.model";

interface leaveGroupProps {
	userId: string;
	chatId: string;
}

export const LeaveGroupService = async (data: leaveGroupProps) => {
	const chat = await ChatModel.findOne({
		_id: data.chatId,
	}).select({
		_id: 0,
		createdAt: 0,
		__v: 0,
	});

	if (chat.creator == data.userId) {
		await ChatModel.deleteOne({
			_id: data.chatId,
		});
	} else {
		await ChatModel.updateOne(
			{
				_id: data.chatId,
			},
			{ $pull: { members: data.userId } }
		);
	}
	return "Leave successfully!";
};
