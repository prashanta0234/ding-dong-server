import { Request } from "express";
import { ChatModel } from "../../models/chat.model";
import { EmitEvent } from "../../utils/emit-event";
import { EventType } from "../../constants/event-type";

interface leaveGroupProps {
	userId: string;
	chatId: string;
}

export const LeaveGroupService = async (
	data: leaveGroupProps,
	req: Request
) => {
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
	const restMembers = chat.members.filter((mem: string) => mem != data.userId);
	EmitEvent(req, EventType.ALERT, restMembers, "A member leave the group");
	return "Leave successfully!";
};
