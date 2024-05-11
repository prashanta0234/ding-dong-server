"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
const isImage = (file) => {
    var _a;
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = (_a = file.originalname.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    return fileExtension ? allowedExtensions.includes(fileExtension) : false;
};
exports.registerSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6),
    confirmPassword: zod_1.z.string().min(6),
    phone: zod_1.z.string(),
    gender: zod_1.z.enum(["female", "male"]),
    // avatar: z
    // 	.any()
    // 	.refine((files) => files?.length >= 1, { message: "Image is required." })
    // 	.refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
    // 		message: ".jpg, .jpeg, .png and .webp files are accepted.",
    // 	})
    // 	.refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
    // 		message: `Max file size is 5MB.`,
    // 	}),
});
