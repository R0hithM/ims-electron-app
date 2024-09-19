"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const api_error_1 = require("../models/api-error");
const uploadRouter = express_1.default.Router();
const upload = (0, multer_1.default)({
    dest: "uploads/",
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            cb(new Error("Only image files are allowed"));
        }
        else {
            cb(null, true);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB (in bytes)
    },
});
function validateType(req, res, next) {
    try {
        const validTypes = ["product", "category", "categoryType", "tag", "items", "invoices", "organizations"];
        const { imageType } = req.params;
        if (!validTypes.includes(imageType)) {
            return next(new api_error_1.ApiError("upload", "Invalid upload type"));
        }
        next();
    }
    catch (error) {
        console.error(error.message);
        next(new api_error_1.ApiError("upload", error.message));
    }
}
uploadRouter.post("/:imageType", validateType, upload.single("image"), (req, res, next) => {
    try {
        if (!req.file) {
            return next(new api_error_1.ApiError("upload", "No file was uploaded"));
        }
        const { imageType } = req.params;
        const uuid = (0, uuid_1.v4)();
        const ext = req.file.originalname.substring(req.file.originalname.lastIndexOf("."));
        const filename = `${uuid}${ext}`;
        const uploadPath = `uploads/${imageType}`;
        const filePath = `${uploadPath}/${filename}`;
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        }
        fs_1.default.renameSync(req.file.path, filePath);
        res.status(200).json({ filePath });
    }
    catch (error) {
        console.error(error.message);
        next(new api_error_1.ApiError("upload", error.message));
    }
});
uploadRouter.get("/:imageType/:filename", (req, res, next) => {
    try {
        const { imageType, filename } = req.params;
        const imagePath = `uploads/${imageType}/${filename}`;
        if (!fs_1.default.existsSync(imagePath)) {
            return next(new api_error_1.ApiError("upload", "File not found"));
        }
        // Stream the image file to the response
        const stream = fs_1.default.createReadStream(imagePath);
        stream.pipe(res);
    }
    catch (error) {
        console.error(error.message);
        next(new api_error_1.ApiError("getFile", error.message));
    }
});
exports.default = uploadRouter;
