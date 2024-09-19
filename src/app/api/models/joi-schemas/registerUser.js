"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @description Joi Schema for registerUser route
 */
class RegisterUser {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for registerUser route
     */
    static schema() {
        return joi_1.default.object().keys({
            username: joi_1.default.string().required(),
            password: joi_1.default.string().min(6).required(),
            email: joi_1.default.string().email().required(),
            fullName: joi_1.default.string().required(),
            roleId: joi_1.default.number().required(),
            groupId: joi_1.default.number().required(),
            organizationId: joi_1.default.string().required(),
        }).unknown(false);
    }
}
exports.RegisterUser = RegisterUser;
