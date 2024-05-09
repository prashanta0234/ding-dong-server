import mongoose, { Schema, models } from "mongoose";

enum Gender {
	"female",
	"male",
}

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	userName: { type: String, required: true },
	phone: { type: String, required: true },
	password: { type: String, required: true },
	gender: { type: String, enum: Gender, required: true },
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
});

export const UserModel = models.User || mongoose.model("User", userSchema);
