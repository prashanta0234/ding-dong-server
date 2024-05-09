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

export const MessageModel = models.Request || model("Request", requestSchema);
