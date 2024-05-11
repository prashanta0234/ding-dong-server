import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

const isImage = (file: Express.Multer.File): boolean => {
	const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
	const fileExtension = file.originalname.split(".").pop()?.toLowerCase();
	return fileExtension ? allowedExtensions.includes(fileExtension) : false;
};

export const registerSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
	phone: z.string(),
	gender: z.enum(["female", "male"]),
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

export type RegisterSchemaType = z.infer<typeof registerSchema>;
