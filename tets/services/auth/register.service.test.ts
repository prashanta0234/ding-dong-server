import { UserModel } from "../../../src/models/user.model";
import { JWT_SECRET } from "../../../src/utils/envs";
import { ErrorMaker } from "../../../src/utils/error-maker";
// import { RegisterSchemaType } from "../../utils/schemas/auth/register.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RegisterService from "../../../src/services/auth/register.service";

jest.mock("../../../src/models/user.model");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../../src/utils/error-maker");

describe("RegisterService", () => {
	const mockUser = {
		email: "test@example.com",
		password: "hashedpassword",
		firstName: "John",
		lastName: "Doe",
		_id: "someuserid",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should throw an error if the passwords do not match", async () => {
		(ErrorMaker as jest.Mock).mockImplementation(
			() => new Error("Password not matched")
		);

		await expect(
			RegisterService({
				email: "test@example.com",
				password: "password",
				confirmPassword: "differentpassword",
				firstName: "John",
				lastName: "Doe",
				phone: "",
				gender: "female",
			})
		).rejects.toThrow("Password not matched");
	});

	it("should throw an error if the user already exists", async () => {
		(UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
		(ErrorMaker as jest.Mock).mockImplementation(
			() => new Error("User already exists")
		);

		await expect(
			RegisterService({
				email: "test@example.com",
				password: "password",
				confirmPassword: "password",
				firstName: "John",
				lastName: "Doe",
				phone: "",
				gender: "female",
			})
		).rejects.toThrow("User already exists");

		expect(UserModel.findOne).toHaveBeenCalledWith({
			email: "test@example.com",
		});
	});

	it("should create a new user and return a token", async () => {
		(UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);
		(UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);
		(bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
		(UserModel.create as jest.Mock).mockResolvedValue({
			...mockUser,
			userName: "test1",
		});
		(jwt.sign as jest.Mock).mockReturnValue("mocktoken");

		const token = await RegisterService({
			email: "test@example.com",
			password: "password",
			confirmPassword: "password",
			firstName: "John",
			lastName: "Doe",
			phone: "",
			gender: "female",
		});

		expect(UserModel.findOne).toHaveBeenCalledTimes(2);
		expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
		expect(UserModel.create).toHaveBeenCalledWith(
			expect.objectContaining({
				email: "test@example.com",
				firstName: "John",
				lastName: "Doe",
				userName: "test1",
				password: "hashedpassword",
				avatar: {
					publicId: "public Id",
					url: "public",
				},
			})
		);
		expect(jwt.sign).toHaveBeenCalledWith(
			{
				name: "John Doe",
				userName: "test1",
				id: mockUser._id,
			},
			JWT_SECRET
		);
		expect(token).toBe("mocktoken");
	});
});
