import mongoose from "mongoose";
import { Schema, Types, model, models } from "mongoose";

enum statusEnum {
	"pending",
	"accepted",
	"rejected",
}

const requestSchema = new Schema(
	{
		status: { type: String, enum: statusEnum, default: statusEnum.pending },
		sender: { type: Types.ObjectId, ref: "User", require: true },
		receiver: { type: Types.ObjectId, ref: "User", require: true },
	},
	{
		timestamps: true,
	}
);

export const MessageModel =
	mongoose.models.Request || mongoose.model("Request", requestSchema);
