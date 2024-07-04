import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../../../src/models/user.model";
import { ErrorMaker } from "../../../src/utils/error-maker";
import { LoginService } from "../../../src/services/auth/login.service";
import { JWT_SECRET } from "../../../src/utils/envs";

// Mock dependencies
jest.mock("../../../src/models/user.model");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../../../src/utils/error-maker");

describe("LoginService", () => {
	const mockUser = {
		email: "test@example.com",
		password: "hashedpassword",
		firstName: "John",
		lastName: "Doe",
		userName: "johndoe",
		_id: "someuserid",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should throw an error if the user is not found", async () => {
		(UserModel.findOne as jest.Mock).mockResolvedValue(null);
		(ErrorMaker as jest.Mock).mockImplementation(
			() => new Error("User doesn`t exists")
		);

		await expect(
			LoginService({ email: "test@example.com", password: "password" })
		).rejects.toThrow("User doesn`t exists");

		expect(UserModel.findOne).toHaveBeenCalledWith({
			email: "test@example.com",
		});
	});

	it("should throw an error if the password is incorrect", async () => {
		(UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
		(bcrypt.compare as jest.Mock).mockResolvedValue(false);
		(ErrorMaker as jest.Mock).mockImplementation(
			() => new Error("Password not matched!")
		);

		await expect(
			LoginService({ email: "test@example.com", password: "wrongpassword" })
		).rejects.toThrow("Password not matched!");

		expect(UserModel.findOne).toHaveBeenCalledWith({
			email: "test@example.com",
		});
		expect(bcrypt.compare).toHaveBeenCalledWith(
			"wrongpassword",
			mockUser.password
		);
	});

	it("should return a token if the credentials are correct", async () => {
		(UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
		(bcrypt.compare as jest.Mock).mockResolvedValue(true);
		(jwt.sign as jest.Mock).mockReturnValue("mocktoken");

		const token = await LoginService({
			email: "test@example.com",
			password: "password",
		});

		expect(UserModel.findOne).toHaveBeenCalledWith({
			email: "test@example.com",
		});
		expect(bcrypt.compare).toHaveBeenCalledWith("password", mockUser.password);
		expect(jwt.sign).toHaveBeenCalledWith(
			{
				name: "John Doe",
				userName: mockUser.userName,
				id: mockUser._id,
			},
			JWT_SECRET
		);
		expect(token).toBe("mocktoken");
	});
});
