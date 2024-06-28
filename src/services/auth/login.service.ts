import { UserModel } from "../../models/user.model";
import { JWT_SECRET } from "../../utils/envs";
import { ErrorMaker } from "../../utils/error-maker";
import { LoginSchemaType } from "../../utils/schemas/auth/login.schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const LoginService = async (data: LoginSchemaType) => {
	const user = await UserModel.findOne({ email: data.email });

	if (!user) {
		throw ErrorMaker("Not found", "User doesn`t exists", 404);
	}

	const pass = await bcrypt.compare(data.password, user?.password);
	if (!pass) {
		throw ErrorMaker("Wrong password", "Password not matched!", 403);
	}

	const name = user.firstName + " " + user.lastName;
	const payload = {
		name,
		userName: user.userName,
		id: user._id,
	};

	const token = jwt.sign(payload, JWT_SECRET!);
	return token;
};
