"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../models/entities/user");
const db_1 = __importDefault(require("../config/db"));
class AuthMiddleware {
    static setup() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                // Verify the JWT token
                const secretKey = process.env.JWT_SECRET || 'secret-key-key-comes-here';
                const decoded = jwt.verify(token, secretKey);
                // Fetch the user using the decoded information
                const user = yield this.usersRepo.findOne({ where: { userId: decoded.userId } });
                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                // Attach the user to the request for further use in controllers
                // req.user = user;
                res.locals.user = user;
                // Continue to the route handler
                next();
                // next({ user })
            }
            catch (error) {
                console.error(error);
                if (error.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token expired' });
                }
                return res.status(401).json({ message: 'Unauthorized' });
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
AuthMiddleware.usersRepo = db_1.default.getRepository(user_1.User);
