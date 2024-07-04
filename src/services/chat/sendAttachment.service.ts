import { Request } from "express";
import { ChatModel } from "../../models/chat.model";
import { EmitEvent } from "../../utils/emit-event";
import { ErrorMaker } from "../../utils/error-maker";
import { EventType } from "../../constants/event-type";
import { MessageModel } from "../../models/message.model";

interface SendAttachmentProps {
	chatId: string;
	files: Express.Multer.File[];
	user: {
		userId: string;
		name: string;
	};
	req: Request;
}

export const SendAttachmentService = async (data: SendAttachmentProps) => {
	console.log(data.files);
	const chat = await ChatModel.findOne({
		_id: data.chatId,
	});

	if (!chat) {
		throw ErrorMaker("Not found", "Chat not found.", 404);
	}

	if (data.files.length < 1) {
		throw ErrorMaker("No attachment", "Please select attachment.", 400);
	}

	const attch: any[] = [];
	const messageForRealTime = {
		content: "",
		sender: {
			userId: data.user.userId,
			name: data.user.name,
		},
		attachment: data.files,
		chatId: data.chatId,
	};
	const messageForDatabase = {
		content: "",
		sender: data.user.userId,
		attachment: attch,
		chatId: data.chatId,
		members: chat.members,
	};

	const message = await MessageModel.create(messageForDatabase);

	EmitEvent(
		data.req,
		EventType.NEW_ATTACHMENT,
		chat.members,
		messageForRealTime
	);
	EmitEvent(data.req, EventType.NEW_MESSAGE_ALERT, chat.members, data.chatId);

	return message;
};
