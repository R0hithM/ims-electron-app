"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_error_1 = require("../models/api-error");
const typedi_1 = require("typedi");
const validation_1 = require("../middleware/validation");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const registerUser_1 = require("../models/joi-schemas/registerUser");
const loginUser_1 = require("../models/joi-schemas/loginUser");
const authRouter = express_1.default.Router();
const authController = typedi_1.Container.get(auth_controller_1.default);
authRouter.post("/register", validation_1.Validation.run(registerUser_1.RegisterUser.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registeredUser = yield authController.registerUser(req.body);
        res.status(201).json(registeredUser);
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("Auth.registerUser", e === null || e === void 0 ? void 0 : e.message));
    }
}));
authRouter.post("/login", validation_1.Validation.run(loginUser_1.LoginUser.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield authController.loginUser(req.body);
        if (token) {
            res.status(200).send({ message: 'Login successful', token });
        }
        else {
            res.status(401).send({ error: 'Incorrect email or password' });
        }
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("Auth.loginUser", e === null || e === void 0 ? void 0 : e.message));
    }
}));
authRouter.post("/change-user-password", validation_1.Validation.run(loginUser_1.LoginUser.schema(), "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield authController.changeUserPassword(req.body);
        if (result) {
            res.status(200).send({ message: 'Password changed successfully' });
        }
        else {
            res.status(401).send({ error: 'No user found' });
        }
    }
    catch (e) {
        console.error(e === null || e === void 0 ? void 0 : e.message);
        next(new api_error_1.ApiError("Auth.changeUserPassword", e === null || e === void 0 ? void 0 : e.message));
    }
}));
exports.default = authRouter;
