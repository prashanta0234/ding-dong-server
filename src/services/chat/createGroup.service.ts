import { Request } from "express";
import { ChatModel } from "../../models/chat.model";
import { ErrorMaker } from "../../utils/error-maker";
import { EmitEvent } from "../../utils/emit-event";
import { EventType } from "../../constants/event-type";

interface CreateGroupProps {
	name: string;
	members: string[];
}

export const CreateGroupService = async (
	data: CreateGroupProps,
	user: string,
	req: Request
) => {
	if (data.members.length < 2) {
		throw ErrorMaker("Less user.", "Group member must be 3 or more", 400);
	}

	const allMembers = [...data.members, user];

	console.log(allMembers);

	const avatar = {
		url: "demo",
		publicId: "demo public id",
	};
	await ChatModel.create({
		name: data.name,
		isGroup: true,
		members: allMembers,
		creator: user,
		avatar,
	});

	EmitEvent(req, EventType.ALERT, allMembers, "Chat is created");
	EmitEvent(req, EventType.REFETCH_CHAT, data.members);
};
