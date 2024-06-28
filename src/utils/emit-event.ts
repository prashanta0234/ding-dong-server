import { Request } from "express";
import { EventType } from "../constants/event-type";
import { TryCatch } from "./try-catch";

export const EmitEvent = async (
	req: Request,
	event: EventType,
	users: string[],
	data?: any
) => {
	console.log("emiting");
};
