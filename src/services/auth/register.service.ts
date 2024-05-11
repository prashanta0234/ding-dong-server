import { Response } from "express";
import { UserModel } from "../../models/user.model";
import { JWT_SECRET } from "../../utils/envs";
import { SendErrorResponse } from "../../utils/responseHelper";
import { RegisterSchemaType } from "../../utils/schemas/auth/register.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ErrorMaker } from "../../utils/error-maker";

const RegisterService = async (data: RegisterSchemaType) => {
	if (data.password !== data.confirmPassword) {
		throw ErrorMaker("Bad request", "Password not matched", 400);
	}
	const isExists = await UserModel.findOne({ email: data.email });
	if (isExists) {
		throw ErrorMaker("Bad request", "User already Exists", 400);
	}
	const avatar = {
		publicId: "public Id",
		url: "public",
	};
	const username = data.email.split("@")[0];
	let uniqueUsername = username;
	let counter = 1;

	while (true) {
		const candidateUsername = `${username}${counter}`;
		const existingCandidate = await UserModel.findOne({
			username: candidateUsername,
		});

		if (!existingCandidate) {
			uniqueUsername = candidateUsername;
			break;
		}

		counter++;
	}
	const hashedPass = bcrypt.hash(data.password, 10);

	const result = UserModel.create({
		...data,
		avatar,
		userName: uniqueUsername,
	});
	console.log(result);

	const name = data.firstName + " " + data.lastName;
	const payload = {
		name,
		userName: uniqueUsername,
	};
	const token = jwt.sign(payload, JWT_SECRET!);

	return token;
};

export default RegisterService;
