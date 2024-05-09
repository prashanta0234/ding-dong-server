import { Schema, Types, model, models } from "mongoose";

const chatSchema = new Schema(
	{
		name: { type: String, required: true },
		sender: { type: Types.ObjectId, ref: "User" },
		chat: { type: Types.ObjectId, ref: "Chat" },
		members: [{ type: Types.ObjectId, required: true }],
		attachment: [
			{
				publicId: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
			},
		],
		content: String,
	},
	{
		timestamps: true,
	}
);

export const MessageModel = models.Messages || model("Messages", chatSchema);
