import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../utils/try-catch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/envs";

type jwtPayloadT = {
	userName: string;
	name: string;
	iat: number;
};

export const IsAuthenticated = TryCatch(async (req, __, next) => {
	const token = req.cookies["user-token"];
	// console.log(cookie);
	const user = jwt.verify(token, JWT_SECRET!) as JwtPayload;
	console.log(req);
	req.user = user.userName;
	next();
});
