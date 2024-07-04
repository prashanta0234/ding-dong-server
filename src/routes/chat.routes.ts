import { Router } from "express";
import { CreateGroupChatController } from "../controllers/chat/createGroup.controller";
import { GetChatController } from "../controllers/chat/getChats.controller";
import { GetGroupChatController } from "../controllers/chat/getGroupChats.controller";
import { AddMemberInChatController } from "../controllers/chat/addMember.controller";
import { RemoveMemberInChatController } from "../controllers/chat/removeMember.controller";
import { LeaveGroupController } from "../controllers/chat/leaveGroup.controller";

export const ChatRoute = Router();

ChatRoute.post("/group", CreateGroupChatController);
ChatRoute.get("/chats", GetChatController);
ChatRoute.get("/group", GetGroupChatController);
ChatRoute.post("/group/add-member", AddMemberInChatController);
ChatRoute.delete("/group/remove-member", RemoveMemberInChatController);
ChatRoute.delete("/group/leave-group", LeaveGroupController);
