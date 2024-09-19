"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for loginUser route
 */
class LoginUser {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for loginUser route
     */
    static schema() {
        return joi_1.default.object().keys({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(6).required(),
        }).unknown(false);
    }
}
exports.LoginUser = LoginUser;
