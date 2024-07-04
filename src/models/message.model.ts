import mongoose, { Schema, Types, model, models } from "mongoose";

const messageSchema = new Schema(
	{
		sender: { type: Types.ObjectId, ref: "User" },
		chatId: { type: Types.ObjectId, ref: "Chat" },
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

export const MessageModel =
	mongoose.models.Messages || mongoose.model("Messages", messageSchema);
