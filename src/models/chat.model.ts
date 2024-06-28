import mongoose, { Schema, Types, model, models } from "mongoose";

const chatSchema = new Schema(
	{
		name: { type: String, required: true },
		creator: { type: Types.ObjectId, ref: "User" },
		members: [{ type: Types.ObjectId, required: true, ref: "User" }],
		avatar: {
			publicId: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
		isGroup: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export const ChatModel =
	mongoose.models.Chat || mongoose.model("Chat", chatSchema);
