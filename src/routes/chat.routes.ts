import { Router } from "express";
import { CreateGroupChatController } from "../controllers/chat/createGroup.controller";
import { GetChatController } from "../controllers/chat/getChats.controller";
import { GetGroupChatController } from "../controllers/chat/getGroupChats.controller";
import { AddMemberInChatController } from "../controllers/chat/addMember.controller";

export const ChatRoute = Router();

ChatRoute.post("/group", CreateGroupChatController);
ChatRoute.get("/chats", GetChatController);
ChatRoute.get("/group", GetGroupChatController);
ChatRoute.post("/add-member", AddMemberInChatController);
